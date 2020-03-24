import {takeLatest,call,put,all} from 'redux-saga/effects';

import {firestore,convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';

import {fetchCollectionsSuccess,fetchCollectionsFailure} from './shop.actions'

import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync(){

  try{
    const collectionRef = firestore.collection('collections');
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(convertCollectionsSnapshotToMap,snapshot);
     /*we can write it const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      but we use call to be able to use yield and again have control at this point back to 
      the saga middleware*/
    yield put(fetchCollectionsSuccess(collectionsMap));
    /*saga don't dispatch actions using dispatch() keyword but it use put*/
  }catch(error){
    yield put(fetchCollectionsFailure(error.message))
  }

 /* the old code in shop.actions with redux-thunk*/
 /*collectionRef
  .get()
  .then(snapshot => {
   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
   dispatch(fetchCollectionsSuccess(collectionsMap));
}).catch(error => dispatch(fetchCollectionsFailure(error.messsage)));*/
}

export function* fetchCollectionsStart(){
  yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync)
  /*the second parameter is another generator function that will run
  in response to takeEvery listener, this is how we able to trigger
  more code to run depending on action type*/

  /*we use takeLatest instead of takeEvery because we want to resolve the last request only*/
}
/*it's going to pause whenever a specific action type that
we want comes in*/
export function* shopSagas(){
  yield all([call(fetchCollectionsStart)]);
}