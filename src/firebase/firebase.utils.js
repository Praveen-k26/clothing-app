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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    console.log('userRef1-->', userRef);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    console.log('userRef2-->', userRef);
    console.log('userRef3-->', userAuth.uid);
    return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;


