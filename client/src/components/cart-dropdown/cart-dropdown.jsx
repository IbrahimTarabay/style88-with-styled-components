import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CartItem from '../cart-item/cart-item';

import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions.js';

import {CartDropdownContainer,ImgContainer,EmptyMessageContainer,
        Img,CartItemsContainer,CartDropdownButton}
  from './cart-dropdown.styles';

import shopping from '../../assets/shopping.png';

const CartDropdown = ({cartItems,history,dispatch}) =>(
  <CartDropdownContainer>
    <CartItemsContainer>
      {
        cartItems.length ? 
        cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />)
        :
        <ImgContainer>
         <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
         <Img alt="shopping-cart" src={shopping}/> 
        </ImgContainer>
      }
    </CartItemsContainer>
    <CartDropdownButton onClick={() => {
      history.push('/checkout');
      dispatch(toggleCartHidden());
     }}>
      GO TO CHECKOUT
      </CartDropdownButton>
      {/*you can use Link, no problem,the reason we use history is because CustomButton is not Link
        you of course can change the base component of CustomButton to Link*/}
   </CartDropdownContainer>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});
/*with use of selectors if we sign out our cartItems in our cartDropdown as well as our cart cartItemsCount is not changing
because we don't need them to rerender and this help us on performance*/

export default withRouter(connect(mapStateToProps)(CartDropdown));
/*withRouter is high order component that take another component as argument*/
/*with this way our component will have access to the props that we are looking
for which in this case "history"*/

/*connect pass dispatch automatically so we don't need to write mapDispatchToProps 
to use toggleCartHidden, so we can pass dispatch as argument in CartDropdown and now we
have access to toggleCartHidden functionality */