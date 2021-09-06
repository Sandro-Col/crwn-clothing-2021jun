import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CartItem from '../cart-item/cart-item.component';
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';
import { toggleCartHidden, clearCart } from '../../redux/cart/cart.actions.js';

import { 
  CartDropdownContainer, 
  CartDropdownButton, 
  EmptyMessageContainer, 
  CartItemsContainer 
} from './cart-dropdown.styles'

const CartDropdown = ({ cartItems, history, cartTotal, dispatch }) => (
  <CartDropdownContainer>
    <CartItemsContainer>
      {cartItems.length ? (
        cartItems.map(cartItem => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <EmptyMessageContainer> Your cart is empty </EmptyMessageContainer>
      )}
    </CartItemsContainer>
    <div>
        <span> Total: ${cartTotal}</span>
    </div>
    <CartDropdownButton onClick={() => {
      history.push('/checkout');
      dispatch(toggleCartHidden());
    }}> GO TO CHECKOUT </CartDropdownButton>
    <CartDropdownButton isClearcart onClick={() => {
      dispatch(clearCart());
      dispatch(toggleCartHidden());
    }}> CLEAR CART </CartDropdownButton>
  </CartDropdownContainer>
);

const mapStateToProps = createStructuredSelector({
 cartItems: selectCartItems,
 cartTotal: selectCartTotal
});

export default withRouter(connect(mapStateToProps)(CartDropdown));