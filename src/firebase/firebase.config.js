// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDrN8nJILDLp4VGJPvbuy83HgQyQDBKe7A",
    authDomain: "user-email-password-auth-c64df.firebaseapp.com",
    projectId: "user-email-password-auth-c64df",
    storageBucket: "user-email-password-auth-c64df.appspot.com",
    messagingSenderId: "796305494931",
    appId: "1:796305494931:web:7ac54ed7a866648de6ce66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default auth;