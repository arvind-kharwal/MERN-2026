import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

function Cart({ cart, setCart }) {
  useEffect(() => {
    axios.get('http://localhost:5000/cart')
      .then(res => setCart(res.data));
  }, [setCart]);

  const updateQuantity = (id, quantity) => {
    axios.put(`http://localhost:5000/cart/${id}`, { quantity })
      .then(res => setCart(res.data));
  };

  const deleteItem = (id) => {
    axios.delete(`http://localhost:5000/cart/${id}`)
      .then(res => setCart(res.data));
  };

  return (
    <div>
      <h2 className="mt-5">Cart</h2>
      {cart.map(item => (
        <CartItem key={item.id} item={item} updateQuantity={updateQuantity} deleteItem={deleteItem} />
      ))}
      <CartSummary />
    </div>
  );
}

export default Cart;
