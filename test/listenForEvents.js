var dgram = require('dgram');

var socky = dgram.createSocket('udp4');

socky.bind('3569');

socky.on('message', function(msg, rinfo){
	console.log(msg.toString());
});