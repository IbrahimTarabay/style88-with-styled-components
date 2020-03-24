/*A selector is a function that accepts Redux state as an argument and returns data that is derived from that state. 
Selectors can provide performance optimizations to your application
 and can also help you encapsulate your global state tree. If your application is growing large and unwieldy,
 you may benefit from creating your own selectors or using a library such as Reselect*/

  /*this will make sure that our component
  is not getting rerender when the state changes that's unrelated to it*/
import { createSelector } from 'reselect';

const selectCart = state => state.cart;/*return slice of whole state*/

export const selectCartItems = createSelector(
  [selectCart],
   cart => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
   cartItems =>
   cartItems.reduce((accumalatedQuantity,cartItem) => 
   accumalatedQuantity + cartItem.quantity,0)
);

export const selectCartTotal = createSelector(
  [selectCartItems],
   cartItems =>
    cartItems.reduce(
      (accumalatedQuantity, cartItem) =>
       accumalatedQuantity + cartItem.quantity * cartItem.price,0
    )
);