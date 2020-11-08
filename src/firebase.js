// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase";
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBpR_enbuyUkDG8W2doJeBMsPiTarvSRbE",
    authDomain: "elias-instagram-clone.firebaseapp.com",
    databaseURL: "https://elias-instagram-clone.firebaseio.com",
    projectId: "elias-instagram-clone",
    storageBucket: "elias-instagram-clone.appspot.com",
    messagingSenderId: "216261323023",
    appId: "1:216261323023:web:400d1c51554ea54be7b67a",
    measurementId: "G-D6XWJ8Z05F"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage};