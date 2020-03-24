import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
 
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';
 
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
 /*This is a new special syntax when importing SVG in React.
 The ReactComponent import name is special and tells Create React App
 that you want a React component that renders an SVG, rather than its filename.*/
import './cart-icon.scss';

const CartIcon = ({toggleCartHidden,itemCount}) =>(
  <div className='cart-icon' onClick={toggleCartHidden}>
    <ShoppingIcon className='shopping-icon' />
    <span className='item-count'>{itemCount}</span>
  </div>
);

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount
})

const mapDispatchToProps = dispatch =>({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

export default connect(mapStateToProps,mapDispatchToProps)(CartIcon);