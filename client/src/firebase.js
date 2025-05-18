// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCoujB7OWxDT_zO8hKmZ8mxRWeVxIxyUAg",
  authDomain: "mess-registration-app.firebaseapp.com",
  projectId: "mess-registration-app",
  storageBucket: "mess-registration-app.appspot.com",
  messagingSenderId: "229893176284",
  appId: "1:229893176284:web:8b66be28aeed79aaeded19"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
