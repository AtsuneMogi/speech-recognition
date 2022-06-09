let speeching = 0;
SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const speech = new SpeechRecognition();
speech.lang = document.getElementById("languages").value;
speech.interimResults = true;
speech.continuous = true;

const start = document.getElementById("start");
const stop = document.getElementById("stop");
const message = document.getElementById("message");
const content = document.getElementById("content");
const green = "#7FFF00";
const red = "#F08080";
const gray = "#696969";
start.style.background = green;
stop.setAttribute("disabled", true);
stop.style.background = "#666";


function changeLang(select) {
    var lang = select.value;
    speech.lang = lang;
    stopSpeeching();
}

function startSpeeching() {
    start.setAttribute("disabled", true);
    stop.removeAttribute("disabled");
	start.style.background = gray;
    stop.style.background = red;
}


function stopSpeeching() {
    if (content != "" || speaking == 0) {
        message.textcontent = 'Press "Start".';
        start.removeAttribute("disabled");
        stop.setAttribute("disabled", true);
        start.style.background = green;
        stop.style.background = gray;
        speech.stop();
    }
}


function main() {
    message.textContent = "Say Something."
    startSpeeching();
    speech.onsoundstart = function() {
        speech.start();
    };
    speech.onerror = function() {
        if(speeching == 0) {
            main();
        }
    };
    speech.onsoundend = function() {
        main();
    };
    speech.onresult = function(e) {
        var results = e.results;
        for (var i = e.resultIndex; i < results.length; i++) {
            if (results[i].isFinal) {
                content.textContent = results[i][0].transcript;
                main();
            } else {
                content.textContent = results[i][0].transcript;
                speeching = 1;
            }
        }
    }
    speeching = 0;
    speech.start();
}
