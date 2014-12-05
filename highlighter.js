function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

var hasLocalStorage = supports_html5_storage();

if (!hasLocalStorage) alert("Your browser does not support local storage. STOP USING DAT SHIT. This plugin will not be able to save your data. I could use a polyfill, but I prefer forcing you to use a fucking decent browser. It's also less work for me, so WIN WIN for everyone. Bye!");

var savedData = localStorage.getItem("tron3Dhighlight");
var highlight = {};

var selfColor = "blue";
var friendColor = "green";
var enemyColor = "red";

function saveData () {
	chrome.storage.sync.set({'highlight': highlight}, function() {});
}

function render () {
	var tds = document.getElementsByTagName('td');
	for (var i = 0; i < tds.length; ++i) {
		var td = tds[i];
		var tc;
		if (td.textContent != undefined && td.textContent.indexOf("@") != -1) {
			tc = td.textContent.split("@")[0];
		}
		var color = highlight[td.title || tc];
		td.style.border = "3px solid "+color;
	}
}

function setUserColor (user, color) {
	if (user == "" || user == undefined) return alert("Not a valid username.");
	highlight[user] = color;
	saveData();
	render();
}

var rondaTitle = document.getElementsByTagName('h2')[0];
//if (rondaTitle) rondaTitle.textContent += " - OLA K ASE";

var sideMenu = document.getElementsByClassName('caixa_menu')[0];

var tronTitle = document.createElement("h2");
tronTitle.textContent = "TRON3D EDA HIGHLIGHTER";
tronTitle.style.backgroundColor = "#222222";
tronTitle.style.color = "white";
tronTitle.style.fontSize = "14px";
tronTitle.style.padding = "10px";

//Change username
var selfButton = document.createElement("div");
selfButton.style.cursor = "pointer";
selfButton.style.backgroundColor = "#66CCFF";

var selfIcon = document.createElement("img");
selfIcon.src = "http://www.concrete5.org/files/2913/2868/4224/myself_icon.png";
selfIcon.style.width = "20px";
selfIcon.style.height = "20px";
selfIcon.style.float = "left";
selfButton.appendChild(selfIcon);

var selfText = document.createElement("p");
selfText.textContent = "Change local username";
selfText.style.paddingLeft = "25px";
selfButton.appendChild(selfText);

//Add friend
var addFriendButton = document.createElement("div");
addFriendButton.style.cursor = "pointer";
addFriendButton.style.backgroundColor = "#99FF99";

var addFriendIcon = document.createElement("img");
addFriendIcon.src = "http://icons.iconarchive.com/icons/deleket/soft-scraps/256/Button-Add-icon.png";
addFriendIcon.style.width = "20px";
addFriendIcon.style.height = "20px";
addFriendIcon.style.float = "left";
addFriendButton.appendChild(addFriendIcon);

var addFriendText = document.createElement("p");
addFriendText.textContent = "Add Friend";
addFriendText.style.paddingLeft = "25px";
addFriendButton.appendChild(addFriendText);

//Add enemy
var addEnemyButton = document.createElement("div");
addEnemyButton.style.cursor = "pointer";
addEnemyButton.style.backgroundColor = "#FF9999";

var addEnemyIcon = document.createElement("img");
addEnemyIcon.src = "http://images4.wikia.nocookie.net/__cb20110828234020/empiresandallies/images/1/1f/Soldiers_Enemy-icon.png";
addEnemyIcon.style.width = "20px";
addEnemyIcon.style.height = "20px";
addEnemyIcon.style.float = "left";
addEnemyButton.appendChild(addEnemyIcon);

var addEnemyText = document.createElement("p");
addEnemyText.textContent = "Add Enemy";
addEnemyText.style.paddingLeft = "25px";
addEnemyButton.appendChild(addEnemyText);

sideMenu.appendChild(tronTitle);
sideMenu.appendChild(selfButton);
sideMenu.appendChild(addFriendButton);
sideMenu.appendChild(addEnemyButton);

selfButton.addEventListener('click', function () {
	var username = prompt("Write the OWN username! e.g. my.super.name");
	setUserColor(username, selfColor);
});

addFriendButton.addEventListener('click', function () {
	var username = prompt("Write the username of your friend! e.g. david.da.silva");
	setUserColor(username, friendColor);
});

addEnemyButton.addEventListener('click', function () {
	var username = prompt("Write the username of your enemy! e.g. miquel.llobet.sanchez");
	setUserColor(username, enemyColor);
});

render();

chrome.storage.sync.get("highlight", function (data) {
	if (typeof data !== "undefined" && typeof data.highlight !== "undefined") highlight = data.highlight;
	render();
});
