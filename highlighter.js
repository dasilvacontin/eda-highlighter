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

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
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
var rondaPlaying = 0; // num. ronda en cuya página nos encontramos
if(window.location.href.indexOf("cmd=rondes&ronda=")>=0 && rondaTitle && rondaTitle.textContent.match(/\d+$/)) 
	rondaPlaying = rondaTitle.textContent.match(/\d+$/)[0];
if (rondaTitle) rondaTitle.textContent += " - OLA K ASE";

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

//Add refresh interval
var addRefreshDiv = document.createElement("div");
addRefreshDiv.style.width = "100%";
addRefreshDiv.style.padding = "5px 0px";
addRefreshDiv.style.clear = "both";

var addRefreshText = document.createElement("p");
addRefreshText.style.float='left';
addRefreshText.style.fontSize = "11px";
addRefreshText.style.margin = "0px";
addRefreshText.textContent = "Refresh rate (milliseconds)";
addRefreshDiv.appendChild(addRefreshText);

var addRefreshInput = document.createElement("input");
addRefreshInput.setAttribute('type','number');
addRefreshInput.style.width = "90px";
addRefreshInput.style.height = "20px";
addRefreshInput.style.marginLeft = "4px";
addRefreshInput.setAttribute('class','refreshRate');
addRefreshInput.setAttribute('min','1000');
addRefreshInput.style.border='none';
addRefreshInput.setAttribute('max','10000');
addRefreshInput.setAttribute('value','4000');
addRefreshInput.style.paddingLeft = "5px";
addRefreshDiv.appendChild(addRefreshInput);

//document.getElementsByClassName('caixa_menu')[0].style.height='375px';

var scrollCheckboxDiv = document.createElement("div");
scrollCheckboxDiv.style.padding = "5px 0px";
scrollCheckboxDiv.style.clear = "both";

var scrollText = document.createElement("p");
scrollText.textContent = "AutoScroll: ";
scrollText.style.float = "left";
scrollText.style.fontSize = "11px";
scrollText.style.margin = "0px";
scrollCheckboxDiv.appendChild(scrollText);

var scrollCheckbox = document.createElement("input");
scrollCheckbox.setAttribute("type", "checkbox");
scrollCheckboxDiv.appendChild(scrollCheckbox);

// Add flechitas

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

var arrowDiv;
if(rondaPlaying>0) {
	chrome.storage.sync.get(null, function(items) {
		var actualRound = Object(items)['actualRound'];
	    var prev = Number(rondaPlaying)-1;
		var next = Number(rondaPlaying)+1;
		arrowDiv = document.createElement("div");
		if(prev>=1)
			arrowDiv.innerHTML += "<a style='margin-right:20px;' href='https://tron3d-fib.jutge.org/?cmd=rondes&ronda="+prev+"'><img width='20' src='http://www.musiciansare.com/images/left.png'/></a>";
		if(next<=actualRound)
			arrowDiv.innerHTML +="<a href='https://tron3d-fib.jutge.org/?cmd=rondes&ronda="+next+"'><img width='20' src='http://www.musiciansare.com/images/right.png'/></a>";
		
		var h2title = document.getElementsByClassName("part_pal")[0].getElementsByTagName('h2')[0];
		h2title.style.marginBottom = "10px";
		insertAfter(h2title,arrowDiv);
	});
}

sideMenu.appendChild(tronTitle);
sideMenu.appendChild(selfButton);
sideMenu.appendChild(addFriendButton);
sideMenu.appendChild(addEnemyButton);
sideMenu.appendChild(addRefreshDiv);
sideMenu.appendChild(scrollCheckboxDiv);

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

//Authors
var authorsDiv = document.createElement("div");
authorsDiv.style.marginTop = "50px";
authorsDiv.innerHTML = "EDA-Highlighter created by <a href='https://twitter.com/dasilvacontin' target='_blank'>@dasilvacontin</a> and <a href='https://github.com/mariocav' target='_blank'>@mariocav</a>.";
function appendAuthors () {
	insertAfter(document.getElementsByClassName('part_pal')[0], authorsDiv);
}
appendAuthors();

// Cargar la página x completo x ajax y solo sustituir la parte que nos interesa (class 'part_pal'). El chat sigue ahí.
function reload_matches(roundNumberBeingWatched) {
	if( document.getElementsByClassName("part_pal")[0].innerHTML.indexOf('Eliminem:')<0 // si la ronda está finalizada, no fem res
		&& isNumber(roundNumberBeingWatched) 
		&& roundNumberBeingWatched>0) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "https://tron3d-fib.jutge.org/?cmd=rondes&ronda="+roundNumberBeingWatched, false);
		xhr.onreadystatechange = function() {
		  if (xhr.readyState == 4) {
            var c = xhr.responseText.split("<body >")[1].split("</body>")[0];
			var htmlObject = document.createElement('div');
            htmlObject.innerHTML = c;
			document.getElementsByClassName("part_pal")[0].innerHTML = htmlObject.getElementsByClassName("part_pal")[0].innerHTML;
			render();
			if (scrollCheckbox.checked) {
				var scrollScript = document.createElement("script");
				scrollScript.textContent = "window.scrollTo(0,document.body.scrollHeight)";
				document.body.appendChild(scrollScript);
			}
			insertAfter(document.getElementsByClassName("part_pal")[0].getElementsByTagName('h2')[0],arrowDiv);
		  }
		}
		xhr.send();
		refreshRate = addRefreshInput.value;
		if(isNumber(refreshRate) && refreshRate>=1000 && refreshRate<=10000) {
			setTimeout(function() { reload_matches(rondaPlaying); },refreshRate);
		}else{
			setTimeout(function() { reload_matches(rondaPlaying); },4000);
			addRefreshInput.value = 4000;
		}
	}
}

var refreshRate = document.getElementsByClassName('refreshRate')[0].value;
reload_matches(rondaPlaying);

chrome.storage.sync.get("highlight", function (data) {
	if (typeof data !== "undefined" && typeof data.highlight !== "undefined") highlight = data.highlight;
	render();
});

//Se ve que cuando haces login tiene una class diferente
var leftMenu = document.getElementsByClassName("part_esq2")[0] || document.getElementsByClassName("part_esq1")[0];

setInterval(function () {

	if (document.body.scrollTop > 80) {
		leftMenu.style.position = "fixed";
		leftMenu.style.top = "0px";
	} else {
		leftMenu.style.position = "static";
	}

}, 16);
