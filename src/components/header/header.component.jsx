import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CartIcon from '../cart-icon/cart-icon.component.jsx';
import CartDropdown from '../cart-dropdown/cart-dropdown.component.jsx';
import { selectCartHidden } from '../../redux/cart/cart.selectors.js';
import { selectCurrentUser } from '../../redux/user/user.selectors.js';
import { signOutStart } from '../../redux/user/user.actions';
import { clearCart } from '../../redux/cart/cart.actions.js';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import { 
  HeaderContainer, 
  LogoContainer, 
  OptionsContainer, 
  OptionLink 
} from './header.styles';


const Header = ({ currentUser, hidden, dispatch }) => (
  <HeaderContainer>
    <LogoContainer to='/'>
      <Logo className='logo' />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to='/shop'>SHOP</OptionLink>
      <OptionLink to='/'>CONTACT</OptionLink>
      {currentUser ? (
        <OptionLink
          as='div'
          onClick={() => 
            {
              dispatch(clearCart());
              dispatch(signOutStart());
            }
          }
          to='/'
        >
          SIGN OUT 
          <span> ( { currentUser.displayName} ) </span>
        </OptionLink>
      ) : (
        <OptionLink to='/signin'>
          SIGN IN 
        </OptionLink>
      )}
      <CartIcon />
    </OptionsContainer>
    {hidden ? null : <CartDropdown />}
  </HeaderContainer>
);



const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);