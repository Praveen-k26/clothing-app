import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAiNAJtbhAY4oGrGALBFCjvITakKD4YUJg",
    authDomain: "koru-clothing-db.firebaseapp.com",
    databaseURL: "https://koru-clothing-db.firebaseio.com",
    projectId: "koru-clothing-db",
    storageBucket: "koru-clothing-db.appspot.com",
    messagingSenderId: "803888258086",
    appId: "1:803888258086:web:d09a66504b5e4bc534dae7",
    measurementId: "G-KQZR5E05ZQ"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;


