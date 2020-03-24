import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import CheckoutItem from '../../components/checkout-item/checkout-item';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button';

import {selectCartItems, selectCartTotal} from '../../redux/cart/cart.selectors';

import {CheckoutPageContainer,CheckoutHeaderContainer,
        HeaderBlockContainer,TotalContainer,WarningContainer}
  from './checkout.styles';

const CheckoutPage = ({cartItems,total}) => (
  <CheckoutPageContainer>
    <CheckoutHeaderContainer>

      <HeaderBlockContainer>
        <span>Product</span>
     </HeaderBlockContainer>

     <HeaderBlockContainer>
        <span>Description</span>
     </HeaderBlockContainer>

     <HeaderBlockContainer>
        <span>Quantity</span>
     </HeaderBlockContainer>

     <HeaderBlockContainer>
        <span>Price</span>
     </HeaderBlockContainer>

     <HeaderBlockContainer>
        <span>Remove</span>
     </HeaderBlockContainer>
    </CheckoutHeaderContainer>
    {
      cartItems.map(cartItem =>
         <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      )
    }{/*we pass quantity here because we want update it every time quantity change
    so we have here in this file selectCartItems that give us the new state everytime quantity change*/}
    <TotalContainer>
      <span>TOTAL: ${total}</span>
    </TotalContainer>
    <WarningContainer>
      *Please use the following test credit card for payments*
      <br />
      4242 4242 4242 4242 - Exp: 08/20 - CVV: 123
    </WarningContainer>
    <StripeCheckoutButton price={total} />
  </CheckoutPageContainer>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal
})

export default connect(mapStateToProps)(CheckoutPage);