var dgram = require('dgram'),
	Writable = require('stream').Writable;
	

module.exports = function(port, address, readableStream){
	var socket = dgram.createSocket('udp4');

	var ws = new Writable({ objectMode: true });
	ws._write = function (chunk, enc, next) {
		var str = JSON.stringify(chunk);
    	socket.send(str, 0, str.length, port, address);
    	next();
	};

	readableStream.pipe(ws);
}