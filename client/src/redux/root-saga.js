import {all,call} from 'redux-saga/effects';

import {shopSagas} from './shop/shop.sagas';
import {userSagas} from './user/user.sagas';
import {cartSagas} from './cart/cart.sagas';

export default function* rootSaga(){
  yield all([
    call(shopSagas),
    call(userSagas),
    call(cartSagas)
  ]);
  /*we use all() because we want all sagas to run on different task streams at once*/
}