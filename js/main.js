const message = document.getElementById("message");
const content = document.getElementById("content");

function main() {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var speech = new SpeechRecognition();
    speech.lang = document.getElementById("languages").value;
    speech.interimResults = true;
    speech.continuous = true;
    document.getElementById("languages").onchange = function() {
        main();
    }

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
    message.textContent = "Say Something.";
    speech.start();
}
