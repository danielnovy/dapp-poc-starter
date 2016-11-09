var Promise = require('bluebird');
var Web3    = require('web3');
var solc    = require('solc');
var fs      = require('fs');
var lw      = require('eth-lightwallet');
var users   = require('./users.json');

var CONTRACT_FILE = 'contracts/UserRegistry.sol';
var CONTRACT_NAME = 'UserRegistry';
var RESULT_FILE = 'config/UserRegistry.js';
var WALLET_PASSWORD = 'test';

var deriveKey   = Promise.promisify(lw.keystore.deriveKeyFromPassword);
var writeFile   = Promise.promisify(fs.writeFile);

var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

var readfs  = Promise.promisify(fs.readFile);
var writefs = Promise.promisify(fs.writeFile);
var sendtx  = Promise.promisify(web3.eth.sendTransaction);

var inputs = {};
var results = {};
var addresses = [];
var coinbase;

var pwDerivedKey;

console.log('Compiling contract...');
readfs(CONTRACT_FILE, 'utf8')
.then(function(data) {
    inputs[CONTRACT_NAME + '.sol'] = data;
    return Promise.promisify(web3.eth.getCoinbase)();
})
.then(function(value) {
    coinbase = value;
    return compile();
})
.then(function(data) {
    results.abi = data.contracts[CONTRACT_NAME].interface;
    console.log('Contracts compiled successfully.');
    console.log('=====================================================');
    console.log('Deploying...');
    return deploy(data);
})
.then(function(tx) {
    return getTransactionReceipt(tx);
})
.then(function(receipt) {
    results.address = receipt.contractAddress;
    console.log('Contract deployed at ' + receipt.contractAddress);
    console.log('=====================================================');
    console.log('Saving result file...');
    var content = 
        'var abi = \'' + results.abi.replace(/(\r\n|\n|\r)/gm,"") + '\';\n\n' +
        'var address = \'' + results.address + '\';\n\n' +
        'module.exports = {abi:abi, address:address};\n';
    return writefs(RESULT_FILE, content);
})
.then(function() {
    console.log('Contract data file saved as ' + RESULT_FILE);
    console.log('=====================================================');
    console.log('Generating wallets...');
    var ps = [];
    for (var i = 0; i < users.length; i++) {
        var name = 'user' + i + '-role' + users[i].role + '.json';
        ps.push(generateAndSaveLightWallet(name));
    }
    return Promise.all(ps);
})
.then(function() {
    console.log('Wallets created and saved on the wallets folder.');
    console.log('=====================================================');
    console.log('Funding wallets...');
    var i = addresses.length - 1;
    return promiseWhile(function() {
        return i >= 0;
    }, function() {
        var addr = addresses[i];
        var tx = {
            from: coinbase,
            gas: 21000,
            to: addr,
            value: Math.pow(10, 19)
        }
        Promise.promisify(web3.eth.sendTransaction)(tx)
        .then(function(txHash) {
            return getTransactionReceipt(txHash);
        })
        .then(function(value) {
            return Promise.promisify(web3.eth.getBalance)(addr);
        })
        .then(function(value) {
            //console.log(addr + ' => Balance: ' + (value/Math.pow(10,18)) + ' Ethers');
        });
        i--;
    });
})
.then(function() {
    console.log('Wallets funded.');
    console.log('=====================================================');
    console.log('Adding users to registry...');
    var meta = require('./UserRegistry.js');
    contract = web3.eth.contract(JSON.parse(meta.abi)).at(meta.address);
    var ps = [];
    for (var i = 0; i < users.length; i++) {
      var promise = Promise.promisify(contract.register) (
          '0x'+addresses[i], 
          users[i].name, 
          users[i].role, 
          users[i].photoUrl, 
          {from: coinbase, gas: 500000});
      ps.push(promise);
    }
    return Promise.all(ps);
})
.then(function() {
  console.log('Users added into the registry.');
  return Promise.promisify(contract.users)('0x'+addresses[0]);
})
.then(function(data) {
  console.log(JSON.stringify(data));
})
.catch(function(err) {
    console.log(err);
    throw err;
});

function generateAndSaveLightWallet(name) {
    return new Promise(function(resolve, reject) {
        deriveKey(WALLET_PASSWORD)
        .then(function(pwDerivedKey) {
            seed = lw.keystore.generateRandomSeed();
            keystore = new lw.keystore(seed, pwDerivedKey);
            keystore.generateNewAddress(pwDerivedKey, 1);
            addresses.push(keystore.getAddresses()[0]);
            var serialized = keystore.serialize();
            fs.writeFileSync('./wallets/' + name, serialized);
            resolve();
        });
    });
}

function compile() {
    return new Promise(function(resolve, reject) {
        var data = solc.compile({sources: inputs}, 0);
        if (data.errors != null) {
            reject(data.errors);
            return;
        }
        resolve(data);
    });
}

function promiseWhile(predicate, action) {
    function loop() {
        if (!predicate()) return;
        return Promise.resolve(action()).then(loop);
    }
    return Promise.resolve().then(loop);
}


function deploy(data) {
    var transaction = {
        from: coinbase,
        data: data.contracts[CONTRACT_NAME].bytecode,
        gas: 4000000,
        gasPrice: Math.pow(10, 12)
    };
    return sendtx(transaction);
}

function getTransactionReceipt(hash) {
    var getReceipt = Promise.promisify(web3.eth.getTransactionReceipt);
    return new Promise(function(resolve, reject) {
        var interval = setInterval(function() {
            getReceipt(hash)
            .then(function(receipt) {
                if (receipt != null) {
                    clearInterval(interval);
                    resolve(receipt);
                } else {
                    //console.log('Waiting for the contract to be mined...');
                }
            })
            .catch(function(err) {
                reject(err);
            });
        }, 1000);
    });
}
