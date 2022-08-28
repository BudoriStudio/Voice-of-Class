const firebaseApp = firebase.initializeApp({ 
    apiKey: "AIzaSyCk6Da-DRwneIyUAUaeGYaKP9-c0qszf28",
    authDomain: "voice-of-class.firebaseapp.com",
    databaseURL: "https://voice-of-class-default-rtdb.firebaseio.com",
    projectId: "voice-of-class",
    storageBucket: "voice-of-class.appspot.com",
    messagingSenderId: "45712287223",
    appId: "1:45712287223:web:d37b4fa6acdb195c9d7af2",
    measurementId: "G-78S2LVP4EV"
});
var textareaVoice = document.getElementById("textareaVoice")
var buttonVoice = document.getElementById("buttonVoice")
let removeToast;

function toast(string) {
    const toast = document.getElementById("toast");
  
    toast.classList.contains("reveal") ?
        (clearTimeout(removeToast), removeToast = setTimeout(function () {
            document.getElementById("toast").classList.remove("reveal")
        }, 1500)) :
        removeToast = setTimeout(function () {
            document.getElementById("toast").classList.remove("reveal")
        }, 1500)
    toast.classList.add("reveal"),
        toast.innerText = string
}

function timestamp(){
    var today = new Date();
    console.log(today);
    today.setHours(today.getHours() + 9);
    return today.toISOString();
}

buttonVoice.onclick = function() {
    var stext = document.getElementById("textareaVoice").value
    if (stext == ""){
        toast("내용을 입력해주세요.")
    } else {
        var stime = new Date().getTime()
        console.log(stime);
        console.log("writeVOC: " + stext);
        firebase.database().ref("voc/" + stime + "/").set({
            date: timestamp(),
            text: stext
        })
        document.getElementById("textareaVoice").value = ""
        toast("보냈어요!")
    }
}