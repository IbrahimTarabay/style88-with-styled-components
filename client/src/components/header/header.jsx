import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CartIcon from '../cart-icon/cart-icon';
import CartDropdown from '../cart-dropdown/cart-dropdown';

import {signOutStart} from '../../redux/user/user.actions';

import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import {HeaderContainer,LogoContainer,OptionsContainer,OptionLink}
 from './header.styles';

import { ReactComponent as Logo } from '../../assets/style88.svg';

const Header = ({currentUser,hidden,signOutStart}) =>(
    <HeaderContainer>
      <LogoContainer to="/">
       <Logo className='logo'/>
      </LogoContainer>
      <OptionsContainer>
          <OptionLink to='/shop'>
              SHOP
          </OptionLink>
          <OptionLink to='/shop'>
              CONTACT
          </OptionLink>
          {
            currentUser ?
            <OptionLink as='div' onClick={signOutStart}>SIGN_OUT</OptionLink>
            :
            <OptionLink to='/signin'>SIGN_IN</OptionLink>
          }
          <CartIcon />
        </OptionsContainer>
        {hidden ? null : <CartDropdown />}
        {/*we move the functionality of the CartDropdown
        outside the header component and put it inside of global redux state*/}
      </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});/*automatically pass the top level state*/

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
});

export default connect(mapStateToProps,mapDispatchToProps)(Header);