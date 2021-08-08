import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAsEsam-Iz_W-atbvUXmD7hE60z4YW-QAg",
  authDomain: "crwn-db-86d6b.firebaseapp.com",
  projectId: "crwn-db-86d6b",
  storageBucket: "crwn-db-86d6b.appspot.com",
  messagingSenderId: "618031491010",
  appId: "1:618031491010:web:010dad3ce4a91e5593185b",
  measurementId: "G-7W3BBT43GV"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // console.log(firestore.doc('users/1234554321'));
  // const userRef = firestore.doc('users/1234554321');
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();
  console.log(snapShot);

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }  catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};



firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;