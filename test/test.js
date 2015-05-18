var controller = require('nftrace-controller'),
	forwarder = require('../'),
	through = require('through');

var session = 'forwarder-session';
controller.createSession(session, function(err){
	if(err) throw err;
	controller.enableUserlandEvent(session, '-a', function(err){
		if(err) throw err;
		controller.start(session, function(err){
			if(err) throw err;
			controller.useSession(session, function(err){
				if(err) throw err;
				var stream = through(function write(data) {
    									this.queue(data);
  									},
  									function end () { //optional 
    									this.queue(null)
  									});
				controller.getEventStream(stream);

				forwarder(3569, null, stream);
				console.log('started');
			});
		});
	});
});

setTimeout(function(){
	controller.destroySession(session, function(err){
		if(err) throw err;
		console.log('done!');
	});
}, 10000000);