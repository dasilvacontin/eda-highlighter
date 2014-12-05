function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

function get_current_roundNumber(callback) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://91.121.2.114/ronda.txt", true);
	xhr.onreadystatechange = function() {
	  if (xhr.readyState == 4) {
    	callback(xhr.responseText);
	  }
	}
	xhr.send();
}

var hasLocalStorage = supports_html5_storage();

if (!hasLocalStorage) alert("Your browser does not support local storage. STOP USING DAT SHIT. This plugin will not be able to save your data. I could use a polyfill, but I prefer forcing you to use a fucking decent browser. It's also less work for me, so WIN WIN for everyone. Bye!");

var savedData = localStorage.getItem("tron3Dhighlight");
var highlight = {};

function newRoundNotification() {
    var not = webkitNotifications.createNotification(
      'icon_48.png',
      'New round!',
      'The round #'+highlight['roundNumber']+' has been started.'
    )
    not.show();
    //setTimeout(function(){not.cancel();},10000);
}

function saveData () {
	chrome.storage.sync.set({'highlight': highlight}, function() {});
}

function setRoundNumber() {
	get_current_roundNumber(function (data) {
		if(!highlight['roundNumber'] && data>0) {
			highlight['roundNumber'] = data;
			saveData();
		}else if(highlight['roundNumber']>0 && data>highlight['roundNumber']) {
			highlight['roundNumber'] = data;
			saveData();
			newRoundNotification();
		}
	});
}

setInterval(function() {setRoundNumber();},10000);
