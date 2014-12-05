var io = require('socket.io').listen(8000);
io.set('log level', 1);

function safe_tags(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') ;
}

var colors = ["#02B09C","#018AB0","#B00115","#75D451","#B051D3","#7D9742", "#424597","#BF6E4D"];

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