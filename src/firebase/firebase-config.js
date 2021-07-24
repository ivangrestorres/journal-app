import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAZEcCkCOgzhWoFczVQnPt8HxkE9ntyYL4",
    authDomain: "react-app-cursos-aea38.firebaseapp.com",
    projectId: "react-app-cursos-aea38",
    storageBucket: "react-app-cursos-aea38.appspot.com",
    messagingSenderId: "558535022495",
    appId: "1:558535022495:web:e6e4d5d2010a3955ca8faa",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
