import firebase from 'firebase'
require('firebase/firestore')

var config = {
    apiKey: "AIzaSyBC-MtjZuhKCCV4zWbhNJ1dHtiOFpLvVUc",
    authDomain: "react-fire-cec58.firebaseapp.com",
    databaseURL: "https://react-fire-cec58.firebaseio.com",
    projectId: "react-fire-cec58",
    storageBucket: "",
    messagingSenderId: "882842138204"
  };
firebase.initializeApp(config);

export const db = firebase.firestore()
export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()