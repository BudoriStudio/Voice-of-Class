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
  var buttonLogin = document.getElementById("buttonLogin")
  let removeToast;
  
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    window.location.href='../admin.html';
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
  
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }).catch((error) => {
    var errorCode = error.code;
    if (errorCode == "auth/user-not-found" || errorCode == "auth/wrong-password") {
      toast("존재하지 않는 계정이거나 비밀번호를 잘못 입력했어요.")
    } else if (errorCode == "auth/invalid-email") {
      toast("이메일 주소를 정확히 입력해주세요.")
    } else if (errorCode != undefined) {
      console.log(errorCode);
      toast("오류가 발생했어요. 다시 시도해주세요.")
    }
  });
  
  function login() {
    var email = document.getElementById("inputId").value + "@" + document.getElementById("inputServer").value
    var password = document.getElementById("inputPassword").value
    if (document.getElementById("inputId").value.replace("/^\s+|\s+$/g;", "") == "" || document.getElementById("inputServer").value.replace("/^\s+|\s+$/g;", "") == "") {
      toast("이메일 주소를 정확히 입력해주세요.")
    } else if (password.replace("/^\s+|\s+$/g;", "") == "") {
      toast("비밀번호를 입력해주세요.")
    } else {
      firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
        console.log(userCredential);
        window.location.href='admin.html';
      }).catch((error) => {
      var errorCode = error.code;
      if (errorCode == "auth/user-not-found" || errorCode == "auth/wrong-password") {
        toast("존재하지 않는 계정이거나 비밀번호를 잘못 입력했어요.")
      } else if (errorCode == "auth/invalid-email") {
        toast("이메일 주소를 정확히 입력해주세요.")
      } else if (errorCode != undefined) {
        console.log(errorCode);
        toast("오류가 발생했어요. 다시 시도해주세요.")
      }
      });
    }
  }
  
  buttonLogin.onclick = function() {
    login()
  }
  
  document.addEventListener("keyup", (e) => {
    if (document.hasFocus() && e.key == "Enter") {
      login()
    }
  })