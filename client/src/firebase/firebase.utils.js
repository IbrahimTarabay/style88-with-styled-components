import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
/*we use firebase services*/ 

const config = {
    apiKey: "AIzaSyAlLVO-hsu4FUXiv3G5YlW3Iqx3_rouKpI",
    authDomain: "style88-db.firebaseapp.com",
    databaseURL: "https://style88-db.firebaseio.com",
    projectId: "style88-db",
    storageBucket: "style88-db.appspot.com",
    messagingSenderId: "716735589057",
    appId: "1:716735589057:web:61fa63117ae248392ec240",
    measurementId: "G-3DB9T40923"
  };/*object created from firebase to customize our application*/ 

  export const createUserProfileDocument = async (userAuth,additionalData) =>{/*userAuth is object return from auth library*/ 
    if(!userAuth) return;/*if user didn't sign in return nothing*/
     const userRef = firestore.doc(`users/${userAuth.uid}`);/*uid which in authentication library,users===collection*/ 
     const snapShot = await userRef.get();/*to get user object(data)*/

     if(!snapShot.exists){/*if user didn't exist in database*/ 
       const {displayName,email} = userAuth;
       const createdAt = new Date();
       
       try{/*create a new user object in Database*/ 
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
  };

  export const getUserCartRef = async userId => {
    firestore.collection('carts').doc('userId');
    const cartsRef = firestore.collection('carts').where('userId','==',userId);
    const snapShot = await cartsRef.get();

    if(snapShot.empty){
      const cartDocRef = firestore.collection('carts').doc(userId);
      await cartDocRef.set({userId,cartItems: []});
      return cartDocRef;
    }else{
      return snapShot.docs[0].ref;
    }
  };

  export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
      const {title,items} = doc.data();

      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items
      }
    });

    return transformedCollection.reduce((accumulator,collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    },{});
  };

  export const getCurrentUser= () =>{
    return new Promise((resolve,reject) =>{
      const unsubscribe = auth.onAuthStateChanged(userAuth =>{
        /*once we get userAuth we can unsubscribe*/
        unsubscribe();
        resolve(userAuth);
      },reject)
    })
  };/*we pass this function to user.saga to help to have persistance session in our app*/

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({prompt: 'select_account'});
  /*we want to always trigger the google pop up when ever we use GoogleAuthProvider*/
  export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
  
  export default firebase;
  /*in case we want the whole library*/ 