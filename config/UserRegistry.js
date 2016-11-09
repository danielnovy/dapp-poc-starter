var abi = '[{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"users","outputs":[{"name":"role","type":"uint8"},{"name":"name","type":"string"},{"name":"photoUrl","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"},{"name":"name","type":"string"},{"name":"role","type":"uint8"},{"name":"photoUrl","type":"string"}],"name":"register","outputs":[],"payable":false,"type":"function"}]';

var address = '0xde4785493d9dd748302a42038cec9c6d6a5e9d20';

module.exports = {abi:abi, address:address};
