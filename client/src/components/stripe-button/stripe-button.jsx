import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

import axios from 'axios';

import style88 from '../../assets/style88.svg';

const StripeCheckoutButton = ({price}) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_4hTn9S93hiBKpYsxzBJHecbY002bdO9jrW';

  const onToken = token =>{
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token/*token: token*/
      }
      /*this object matches all of the things that we are expecting on our server*/
    }).then(response => {
      alert('Payment successful')
    }).catch(error => {
      alert(
       'There was an issue with your payment. Please make sure you use the provided credit card'
      )
    })
  }

  return(
    <StripeCheckout
       label='Pay Now'
       name='style88' 
       billingAddress
       shippingAddress
       image={style88}
       description={`Your total is $${price}`}
       amount={priceForStripe}
       panelLabel='Pay Now'
       token={onToken}
       stripeKey={publishableKey}
       />
    );
};

export default StripeCheckoutButton;