var Web3 = require("web3");
var ProviderEngine = require("web3-provider-engine");
var Web3Subprovider = require("web3-provider-engine/subproviders/web3.js");
var CacheSubprovider = require("web3-provider-engine/subproviders/cache.js");

var engine = new ProviderEngine();
var root_provider;

engine.addProvider(new CacheSubprovider());

// Bootstrap
if (typeof web3 !== 'undefined') {
  // Use the Mist/wallet provider.
  root_provider = new Web3Subprovider(web3.currentProvider);
} else {
  root_provider = new Web3Subprovider(new Web3.providers.HttpProvider("http://localhost:8545"));
}

// Override sendAsync so we always return a clone.
// This prevents bugs where web3, etc. alter the result.
var clone = function(obj) {
  if (obj === undefined) return undefined;
  if (obj == null) return null;
  if (Array.isArray(obj)) {
    var val = [];
    obj.forEach(function(item) {
      val.push(clone(item));
    });
    return val;
  }
  if (typeof obj == "object") {
    var val = {};
    Object.keys(obj).forEach(function(key) {
      val[key] = clone(obj[key]);
    });
    return val;
  }
  return obj;
}

var asyncFn = engine.sendAsync;
engine.sendAsync = function() {
  var args = Array.prototype.slice.call(arguments);
  var callback = args.pop();

  args.push(function(err, result) {
    if (err) return callback(err);

    // clone the result
    callback(null, clone(result));
  });

  asyncFn.apply(engine, args);
};

var web3 = new Web3();
web3.setProvider(engine);

engine.addProvider(root_provider);
engine.start();

module.exports = web3;
