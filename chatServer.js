var io = require('socket.io').listen(8000);
io.set('log level', 1);

function safe_tags(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') ;
}

var colors = ["#822727","#C44B9E","#702F96","#453485","#4565A3","#1E6169","#0C6639","#386B15","#656924","#7D4C19","#5C1B1B","#5C1B54","#351B5C","#1B1D5C","#1B4E5C","#1B5C3E","#2C5C1B","#5C5B1B","#5C2E1B"];
function colorForUsername (username) {
	var sum = 0;
	for (var i = 0; i < username.length; ++i) sum += username.charCodeAt(i);
	var index = sum%(colors.length);
	return colors[index];
}

var msgBuffer = [];
var bufferSize = 100;

io.sockets.on('connection', function (socket) {
	for (var i = 0; i < msgBuffer.length; ++i) socket.emit('chatMessage', msgBuffer[i]);
	socket.on('chatMessage', function (msg) {
		msg.timestamp = +new Date ();
		msg.text = msg.text.slice(0, 140);
		msg.text = safe_tags(msg.text);
		msg.bgcolor = colorForUsername(msg.username);
		io.sockets.emit('chatMessage', msg);
		msgBuffer.push(msg);
		while (msgBuffer.length > bufferSize) msgBuffer.shift();
  	});
});

setInterval(function () {
	console.log((new Date()).toString()+" > buffer size: "+msgBuffer.length);
}, 5000);
