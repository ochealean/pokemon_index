import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import ImageKit from "./node_modules/imagekit/index.js";


// Initialize ImageKit
const imagekit = new ImageKit({
    publicKey: "your_public_api_key",
    urlEndpoint: "https://ik.imagekit.io/your_imagekit_id",
    authenticationEndpoint: "https://pokemon-index-hazel.vercel.app/api/auth", // Correct URL
});

// Upload functionality
document.getElementById('uploadbtn').addEventListener('click', () => {
    const fileInput = document.getElementById('file1');
    const file = fileInput.files[0];

    if (file) {
        imagekit.upload(
            {
                file: file,
                fileName: file.name,
                tags: ["example-tag"],
            },
            (err, result) => {
                if (err) {
                    console.error("Upload failed: ", err);
                } else {
                    console.log("Upload successful: ", result);
                    document.getElementById('image').src = result.url;
                }
            }
        );
    } else {
        console.error("No file selected for upload.");
    }
});

// Firebase configuration
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

// Monitor authentication state
onAuthStateChanged(auth, (user) => {
    const greet = document.getElementById("greet");
    const image = document.getElementById("image");
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

// Logout functionality
document.getElementById("logoutbtn").addEventListener("click", () => {
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
