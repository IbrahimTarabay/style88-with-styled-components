import {takeLatest, put, all, call} from 'redux-saga/effects';

import UserActionTypes from './user.types';

import {
  signInSuccess,signInFailure,
  signOutSuccess,signOutFailure,
  /*signUpSuccess,*/signUpFailure
} from './user.actions';

import {auth,googleProvider,createUserProfileDocument,getCurrentUser} from '../../firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth,additionalData){
   try{ 
   const userRef = yield call(createUserProfileDocument,userAuth,additionalData);
   const userSnapshot = yield userRef.get();
   yield put(signInSuccess({id:userSnapshot.id,...userSnapshot.data()}));
   /*put(), puts things back into our regular Redux flow*/
   /*saga don't dispatch actions using dispatch() keyword but it use put*/
  }catch(error){
    yield put(signInFailure(error));
  }
}

export function* signInWithGoogle(){
  try{
   const {user} = yield auth.signInWithPopup(googleProvider);
   /*we use yield becasue we want to access the vaule that gets returned when the success happens
      with our signIn with popup*/
    yield getSnapshotFromUserAuth(user);
  }catch(error){
    yield put(signInFailure(error));
  }
}

export function* signInWithEmail({payload: {email,password}}){
  /*here we're get our user credentials from sign-in component passing through as action.payload so
    we destructre payload*/
  try{ 
   const {user} = yield auth.signInWithEmailAndPassword(email,password);
   yield getSnapshotFromUserAuth(user);
  }catch(error){
    yield put(signInFailure(error));
    alert('Wrong Credentials');
  }
}

export function* isUserAuthenticated(){
  try{
    const userAuth = yield getCurrentUser();
    if(!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  }catch(error){
    yield put(signInFailure(error));
  }
}/*we use this function to have persistance so if we refresh or closed tab we still signed in*/

export function* signOut(){
  try{
    yield auth.signOut();
    yield put(signOutSuccess())
  }catch(error){
    yield put(signOutFailure(error))
  }
}

export function* signUp({payload:{email,password,displayName}}){
/*here we're get our user credentials from sign-up component passing through as action.payload so
we destructre payload*/
try{
  const {user} = yield auth.createUserWithEmailAndPassword(email,password);
  /*yield put(signUpSuccess({user, additionalData: {displayName}}));*/
  yield getSnapshotFromUserAuth(user,{displayName});
  /*to signIn after you signUp*/
 }catch(error){
   yield put(signUpFailure(error))
 }
}

/*export function* signInAfterSignUp({payload: {user,addionalData}}){
  yield getSnapshotFromUserAuth(user,addionalData);
}*/

export function* onGoogleSignInStart(){
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START,signInWithGoogle);
}

export function* onEmailSignInStart(){
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START,signInWithEmail);
}

export function* onCheckUserSession(){
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION,isUserAuthenticated);
}

export function* onSignOutStart(){
  yield takeLatest(UserActionTypes.SIGN_OUT_START,signOut);
}

export function* onSignUpStart(){
  yield takeLatest(UserActionTypes.SIGN_UP_START,signUp)
}

/*export function* onSignUpSuccess(){
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS,signInAfterSignUp)
}*/

export function* userSagas(){
  yield all(
      [call(onGoogleSignInStart),
       call(onEmailSignInStart),
       call(onCheckUserSession),
       call(onSignOutStart),
       call(onSignUpStart)
       /*call(onSignUpSuccess)*/
    ]);
}