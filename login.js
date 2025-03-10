import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDVmfOR3fKQKhgvsSSL0zsnzbRL-85LRNE",
    authDomain: "dryrun-7fed4.firebaseapp.com",
    projectId: "dryrun-7fed4",
    storageBucket: "dryrun-7fed4.firebasestorage.app",
    messagingSenderId: "661169706157",
    appId: "1:661169706157:web:000c438bc9f7b217016224"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

var login = document.getElementById("loginbtn");
login.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission
    var email = document.getElementById("uname").value;
    var password = document.getElementById("pword").value;

    // Create a new user with email and password
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        var user = userCredential.user;
        if (user.emailVerified) {
            window.location.href = "index.html";
        } else {
            window.location.href = "login.html";
            alert("Email is not verified. Please verify your email address.");
        }
    })
    .catch((error) => {
        alert("Error signing in: " + error.message);
    });
});

var google = document.getElementById("googlebtn");
google.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission
    signInWithPopup(auth, provider)
        .then((result) => {
            var credential = GoogleAuthProvider.credentialFromResult(result);
            var token = credential.accessToken;
            var user = result.user;
            window.location.href = "index.html";
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = GoogleAuthProvider.credentialFromError(error);
            alert("Error signing in with Google: " + errorMessage);
        });
});
