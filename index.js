import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";



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

// Monitor the authentication state
onAuthStateChanged(auth, (user) => {
    var greet = document.getElementById("greet");
    var image = document.getElementById("image");
    if (user) {
        if (user.emailVerified) {
            // User is signed in
            greet.textContent = "Welcome, " + (user.displayName || user.email);
            image.src = user.photoURL || "guess.png"; // Fallback image
        } else {
            window.location.href = "login.html";
        }
    } else {
        // No user is signed in
        console.log("No user is logged in.");
        window.location.href = "landingpage.html";
    }
});

var logoutBtn = document.getElementById("logoutbtn");
logoutBtn.addEventListener("click", function () {
    signOut(auth)
        .then(() => {
            console.log("User signed out successfully.");
            // Redirect to landing page or login page
            window.location.href = "landingpage.html";
        })
        .catch((error) => {
            console.error("Error signing out:", error.message);
            alert("Failed to log out. Please try again.");
        });
});