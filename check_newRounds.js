function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

function get_current_roundNumber(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://91.121.2.114/ronda.txt?"+(new Date().getTime()), true);
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
var actualRound = '';

function newRoundNotification() {
    var not = webkitNotifications.createNotification(
      'icon_48.png',
      'New round!',
      'The round #'+actualRound+' has been started.'
    )
    not.show();
}

function saveData () {
    
    chrome.storage.sync.set({'actualRound': actualRound}, function() {});
}

function setRoundNumber() {
    get_current_roundNumber(function (data) {
        if(!actualRound && data>0) {
            actualRound = data;
            saveData();
        }else if(actualRound>0 && data>actualRound) {
            actualRound = data;
            saveData();
            newRoundNotification();
        }
    });
}

setInterval(function() {setRoundNumber();},10000);
