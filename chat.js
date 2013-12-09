//everytime you hack your username, a kitten dies :( don't kill kitten pls
var chat_username = document.getElementsByClassName("part_cap")[0].getElementsByTagName("span")[1].textContent;

var chatContainer = document.createElement("div");
chatContainer.style.position = "fixed";
chatContainer.style.top = "0px";
chatContainer.style.right = "0px";
chatContainer.style.height = "100%";
chatContainer.style.width = "200px";
chatContainer.style.fontSize = "14px";
chatContainer.style.paddingRight = "10px";
chatContainer.style.overflowY = "scroll";
chatContainer.style.overflowX = "hidden";
document.body.appendChild(chatContainer);

var chatInput = document.createElement("input");
chatInput.style.width = "200px";
chatInput.style.height = "50px";
chatInput.style.position = "fixed";
chatInput.style.bottom = "0px";
chatInput.style.right = "10px";
chatInput.style.color = "white";
chatInput.style.backgroundColor = "#414D66";
chatInput.style.border = "none";
chatInput.style.padding = "10px";
chatInput.style.textAlign = "right";
chatInput.maxLength = 140;
document.body.appendChild(chatInput);

var lastMessage;

function stringForTimestamp (timestamp) {
	if (timestamp == undefined) return '';
	var date = new Date (timestamp);
	var hours = date.getHours() + "";
	while (hours.length < 2) hours = '0'+hours;
	var minutes = date.getMinutes() + "";
	while (minutes.length < 2) minutes = '0'+minutes;
	return '('+hours+':'+minutes+')';
}

function appendNewChatMessage (msg) {

	var chatMessage = document.createElement("div");
	chatMessage.style.width = "200px";
	chatMessage.style.backgroundColor = "white";
	chatMessage.style.marginTop = "5px";
	chatMessage.style.marginBottom = "5px";
	chatMessage.style.transition = "background-color 0.5s";
	chatMessage.style.opacity = 0.9;

	var messageWrapper = document.createElement("div");
	messageWrapper.style.padding = "10px";
	messageWrapper.style.color = "white";
	messageWrapper.style.textAlign = "right";

	var userSpan = document.createElement("span");
	userSpan.style.fontWeight = "bold";
	userSpan.textContent = msg.username;

	var textSpan = document.createElement("span");
	textSpan.textContent = msg.text;

	if (msg.timestamp) {
		var timestampText = document.createElement("p");
		timestampText.style.float = "left";
		timestampText.textContent = stringForTimestamp(msg.timestamp);
		timestampText.style.fontSize = "10px";
		timestampText.style.margin = "0px";
		messageWrapper.appendChild(timestampText);
	}

	messageWrapper.appendChild(userSpan);
	messageWrapper.appendChild(document.createElement("br"));
	messageWrapper.appendChild(textSpan);
	chatMessage.appendChild(messageWrapper);

	if (!lastMessage) chatContainer.appendChild(chatMessage);
	else chatContainer.insertBefore(chatMessage, lastMessage);

	lastMessage = chatMessage;

	setTimeout(function () {
		var bgcolor = "#111111";
		if (msg.bgcolor) bgcolor = msg.bgcolor;
		chatMessage.style.backgroundColor = bgcolor;
	}, 1);

}

var socket = io.connect('http://ludumpad.com:8000');
socket.on('chatMessage', function (msg) {
	appendNewChatMessage(msg);
});

socket.on('connect', function () {
	appendNewChatMessage({username:"system", text:"connected!"});
});

socket.on('disconnect', function () {
	appendNewChatMessage({username:"system", text:"connection lost!"});
});

function sendChatMessage () {
	console.log("Sending message!");
	var text = chatInput.value;
	if (text == "" || text == undefined) return;
	socket.emit('chatMessage', {username:chat_username, text:text.trim().slice(0, 140)});
	chatInput.value = "";
}

function trySendMessage () {
	if (chat_username == "" || chat_username == undefined) return alert("Please, log in at Jutge.org to use the chat.");
	sendChatMessage();
}

document.addEventListener("keydown", function (evt) {
	if (document.activeElement == chatInput && evt.keyCode == 13 && !evt.shiftKey) trySendMessage();
});