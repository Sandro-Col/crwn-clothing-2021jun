import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.componet';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions.js';
import { clearCart } from '../../redux/cart/cart.actions.js'

import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems, history, cartTotal, dispatch }) => (
  <div className='cart-dropdown'>
    <div className='cart-items'>
      {cartItems.length ? (
        cartItems.map(cartItem => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <spam className='empty-message'> Your cart is empty </spam>
      )}
    </div>
    <div>
        <span> Total: ${cartTotal}</span>
    </div>
    <CustomButton onClick={() => {
      history.push('/checkout');
      dispatch(toggleCartHidden());
    }}> GO TO CHECKOUT </CustomButton>
    <CustomButton clearcart onClick={() => {
      dispatch(clearCart());
      dispatch(toggleCartHidden());
    }}> CLEAR CART </CustomButton>
  </div>
);

const mapStateToProps = createStructuredSelector({
 cartItems: selectCartItems,
 cartTotal: selectCartTotal
});

// const mapDispatchToProps = dispatch => ({
//   clearCart: () => dispatch(clearCart())
// });

export default withRouter(connect(mapStateToProps)(CartDropdown));