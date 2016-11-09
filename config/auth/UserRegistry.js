var abi = '[{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"users","outputs":[{"name":"name","type":"string"},{"name":"role","type":"uint8"},{"name":"photoUrl","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"},{"name":"name","type":"string"},{"name":"role","type":"uint8"},{"name":"photoUrl","type":"string"}],"name":"register","outputs":[],"payable":false,"type":"function"}]';

var address = '0xed6a54c4246dbc13a860afa041750b97ea751c87';

module.exports = {abi:abi, address:address};
