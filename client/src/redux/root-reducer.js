import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
/*to get the actual localStorage object in our window browser
so this is essentially telling redux-persist, I want to use
localStorage as my default storage*/

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

const persistConfig = {
  key: 'root',
/*meaning at what point inside of our reducer object
do we want to start storing everything, we want start from the root*/
  storage,
/*this will say the storage key goes to whatever
the storage object from redux-persist*/
  whitelist: ['cart']
  /*array that have state that we want to cache*/
}

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer
});

export default persistReducer(persistConfig,rootReducer);
/*so our modified version of our route reducer except now with persistence capabilities
thank to persistReducer function from redux-persist*/