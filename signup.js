import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, updateProfile, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

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

var signup = document.getElementById("signupbtn");
signup.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var fullName = `${fname} ${lname}`; // Combine first and last names
    var cpassword = document.getElementById("cpword").value;
    var email = document.getElementById("uname").value;
    var password = document.getElementById("pword").value;

    if (cpassword !== password) {
        alert("Passwords do not match");
    } else {
        // Create a new user with email and password
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                var user = userCredential.user;
                // Update the user's profile with the full name
                updateProfile(user, {
                    displayName: fullName, appName: "POKEDEX"
                }).then(() => {
                    // Send email verification
                    sendEmailVerification(auth.currentUser)
                        .then(() => {
                            alert("Email Verification sent to your email address. Please verify your email address to login.");
                            window.location.href = "login.html";
                        }).catch((error) => {
                            alert("Error sending email verification: " + error.message);
                        });
                }).catch((error) => {
                    alert("Error updating profile: " + error.message);
                });
            })
            .catch((error) => {
                alert("Error creating user: " + error.message);
            });
    }
});