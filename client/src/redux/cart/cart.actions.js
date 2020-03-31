import CartActionTypes from './cart.types';

export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN
  /*payload is optional property, we don't need it in this case,
   we don't need to pass payload to cart.reducer*/
});

export const addItem = item => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item
});

export const removeItem = item => ({
  type: CartActionTypes.REMOVE_ITEM,
  payload: item
});

export const clearItemFromCart = item => ({
  type: CartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: item
});

export const clearCart = () => ({
  type: CartActionTypes.CLEAR_CART
});

export const updateCartInFirebase = () => ({
  type: CartActionTypes.UPDATE_CART_IN_FIREBASE
});

export const setCartFromFirebase = cartItems => ({
  type: CartActionTypes.SET_CART_FROM_FIREBASE,
  payload: cartItems
});