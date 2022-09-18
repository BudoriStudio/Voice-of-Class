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
var divVocContent = document.getElementById("divVocContent")
var divLoading = document.getElementById("divLoading")
var ulVocContent = document.getElementById("ulVocContent")
var data;
var reversedKeys;
let removeToast;

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
    } else {
        window.location.href = '../login.html';
    }
});

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

var voc = firebase.database().ref('voc/');
voc.on('value', (snapshot) => {
    divVocContent.setAttribute("style", "display: none;")
    divLoading.setAttribute("style", "display: block;")
    data = snapshot.val();
    reversedKeys = Object.keys(data).reverse();
    showVOC(data, reversedKeys);
});

function showVOC(data, reversedKeys) {
    while (ulVocContent.firstChild) {
        ulVocContent.removeChild(ulVocContent.firstChild);
    }
    reversedKeys.forEach(function (key) {
        var liVoc = document.createElement("li")
        liVoc.setAttribute("class", "list-group-item")
        liVoc.setAttribute("id", key)
        var inputCheckbox = document.createElement("input")
        inputCheckbox.setAttribute("class", "form-check-input me-1")
        inputCheckbox.setAttribute("type", "checkbox")
        inputCheckbox.setAttribute("value", key)
        inputCheckbox.setAttribute("id", key + "checkbox")
        if (data[key]["hidden"] == true) {
            inputCheckbox.checked = true;
            liVoc.setAttribute("style", "display: none;")
        }
        var labelVocText = document.createElement("label")
        labelVocText.setAttribute("class", "form-check-label")
        labelVocText.setAttribute("for", key + "checkbox")
        labelVocText.innerText = data[key]["text"]
        ulVocContent.appendChild(liVoc)
        liVoc.appendChild(inputCheckbox)
        liVoc.appendChild(labelVocText)
        divLoading.setAttribute("style", "display: none;")
        divVocContent.setAttribute("style", "display: block;")
    })
}

document.getElementById("buttonHideCheck").onclick = function () {
    var divVocContent = document.getElementById("divVocContent")
    var divLoading = document.getElementById("divLoading")
    var ulVocContent = document.getElementById("ulVocContent")
    divVocContent.setAttribute("style", "display: none;")
    divLoading.setAttribute("style", "display: block;")
    var chkList = document.querySelectorAll("input[type=checkbox]");
    chkList.forEach(function (ch) {
        if (ch.checked == true) {
            document.getElementById(ch.value).setAttribute("style", "display: none;")
            firebase.database().ref('voc/' + ch.value).update({
                hidden: true
            });
        } else {
            firebase.database().ref('voc/' + ch.value).update({
                hidden: false
            });
        }
    });
    divLoading.setAttribute("style", "display: none;")
    divVocContent.setAttribute("style", "display: block;")
}

document.getElementById("buttonShowHidden").onclick = function () {
    var divVocContent = document.getElementById("divVocContent")
    var divLoading = document.getElementById("divLoading")
    var ulVocContent = document.getElementById("ulVocContent")
    divVocContent.setAttribute("style", "display: none;")
    divLoading.setAttribute("style", "display: block;")
    while (ulVocContent.firstChild) {
        ulVocContent.removeChild(ulVocContent.firstChild);
    }
    reversedKeys.forEach(function (key) {
        console.log(data[key]["hidden"]);
        var liVoc = document.createElement("li")
        liVoc.setAttribute("class", "list-group-item")
        liVoc.setAttribute("id", key)
        var inputCheckbox = document.createElement("input")
        inputCheckbox.setAttribute("class", "form-check-input me-1")
        inputCheckbox.setAttribute("type", "checkbox")
        inputCheckbox.setAttribute("value", key)
        inputCheckbox.setAttribute("id", key + "checkbox")
        if (data[key]["hidden"] == true) {
            inputCheckbox.checked = true;
        }
        var labelVocText = document.createElement("label")
        labelVocText.setAttribute("class", "form-check-label")
        labelVocText.setAttribute("for", key + "checkbox")
        labelVocText.innerText = data[key]["text"]
        ulVocContent.appendChild(liVoc)
        liVoc.appendChild(inputCheckbox)
        liVoc.appendChild(labelVocText)
        divLoading.setAttribute("style", "display: none;")
        divVocContent.setAttribute("style", "display: block;")
    })
}