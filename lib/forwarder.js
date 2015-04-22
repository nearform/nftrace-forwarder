var net = require('net'),
	Writable = require('stream').Writable,
	controller = require('nftrace-controller');

module.exports = function(address, port){
	var socket = new net.Socket();
	socket.connect(port, address, function(err){
		if(err){
			console.log('problem connecting to host %s on port %s', address, port);
			throw err;
		}
		console.log('successfully connected to host %s on port %s', address, port);
	});

	var ws = new Writable({ objectMode: true });
	ws._write = function (chunk, enc, next) {
    	socket.write(JSON.stringify(chunk));
    	next();
	};

	controller.getEventStream(ws);
}