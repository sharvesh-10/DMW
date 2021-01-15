import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var config = {
    apiKey: "AIzaSyBd-a6haMrq5S-N5EPkhS_rnI-Hi6RHAJc",
    authDomain: "dmw-backend.firebaseapp.com",
    projectId: "dmw-backend",
    storageBucket: "dmw-backend.appspot.com",
    messagingSenderId: "1068456574902",
    appId: "1:1068456574902:web:204d27c85682a3fe2b8b17",
    measurementId: "G-XD1RP7YENF"
  };
  firebase.initializeApp(config);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, additionalData) =>{
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();
    if(!snapshot.exists){
        const { displayName, email} = userAuth;
        const createdAt = new Date();
        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(error){
            console.log('error creating user',error.message);  
        }
    }
    return userRef; 
}

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt:'select_account' });


export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;