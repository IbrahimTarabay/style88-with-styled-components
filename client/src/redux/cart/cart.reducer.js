import CartActionTypes from './cart.types';
import {addItemToCart,removeItemFromCart} from './cart.utils';

const INITIAL_STATE = {
  hidden: true,
  cartItems: []
};

const cartReducer = (state=INITIAL_STATE,action) =>{
  switch(action.type){
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return{
        ...state,
        hidden: !state.hidden
      };/*we don't need to use action.payload we just want to toggle hidden values*/
    case CartActionTypes.ADD_ITEM:
       return {
         ...state,
         /*hidden: false,/*to make cart visible when adding items*/
         cartItems: addItemToCart(state.cartItems,action.payload)
       }
    case CartActionTypes.REMOVE_ITEM:
        return{
          ...state,
          cartItems: removeItemFromCart(state.cartItems,action.payload)
        }   
    case CartActionTypes.CLEAR_ITEM_FROM_CART:
      return{
        ...state,
        cartItems: state.cartItems.filter(cartItem => 
          cartItem.id !== action.payload.id
        )
      } 
    case CartActionTypes.CLEAR_CART:
      return {
        ...state,
        cartItems: []
      };
    case CartActionTypes.SET_CART_FROM_FIREBASE:
      return{
        ...state,
        cartItems: action.payload
      };  
    default:
      return state;
  }
};

export default cartReducer;