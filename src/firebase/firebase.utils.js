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
  const userDocRef = firestore.doc(`users/${userAuth.uid}`);

  const userSnapShot = await userDocRef.get();

  if (!userSnapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userDocRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userDocRef;
};



firebase.initializeApp(config);

/* export const addCollectionAndDocuments = async (
  collectionKey, 
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    console.log(newDocRef);
    batch.set(newDocRef, obj);
  });
  
  return await batch.commit();

} */

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const {title, items } = doc.data();

    return{
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });

  
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {})
  /*
    We pass our initial object, 
    the initial object goes into the first new element (the first collection), 
    and it sets the first value (in the accumulator) equal to the title (in lowercase).
    So, accumulator was an empty object, now with a property of "hats", that is iqual to hats collection.
    And then it returns that object and it goes into the second object.
    If the second object is "jackets", then it's going to set a new property called "jackets" and then
    iqual the jackets collection.
    So, now we have an object that has a "hats"property equal to the hat collection and 
    a "jackets" property equal to the jackets collection, and then so on and so forth.
  */
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;