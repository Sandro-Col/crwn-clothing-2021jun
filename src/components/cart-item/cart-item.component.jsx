import React from 'react';

import { 
  CartItemContainer, 
  CartItemImage, 
  ItemDetailsContainer
} from './cart-item.styles'

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
  <CartItemContainer>
    <CartItemImage src={imageUrl} alt='item' />
    <ItemDetailsContainer>
      <spam> {name} </spam>
      <spam> {quantity} X ${price} </spam>
    </ItemDetailsContainer>
  </CartItemContainer>
);

export default CartItem;