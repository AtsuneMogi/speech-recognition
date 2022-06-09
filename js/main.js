SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const speech = new SpeechRecognition();
speech.lang = "en-US";
speech.interimResults = true;
speech.continuous = true;

const select = document.getElementById("select");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const main = document.getElementById("main");
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


speech.onresult = (e) => {
    var autotext = e.results[0][0].transcript;
    content.textContent = autotext;
};


function startSpeeching() {
    speech.start();
    main.textContent = "Say Something.";
    start.setAttribute("disabled", true);
    stop.removeAttribute("disabled");
	start.style.background = gray;
    stop.style.background = red;
}


function stopSpeeching() {
    speech.stop();
    main.textContent = 'Press "Start".';
    content.textContent = "";
    start.removeAttribute("disabled");
    stop.setAttribute("disabled", true);
    start.style.background = green;
    stop.style.background = gray;
}
