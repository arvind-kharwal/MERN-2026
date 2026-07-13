import React, { useState } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    axios.post('http://localhost:5000/cart', { ...product, quantity: 1 })
      .then(res => setCart(res.data));
  };

  return (
    <div className="container mt-4">
      <h1>🛒 Shopping Cart</h1>
      <ProductList addToCart={addToCart} />
      <Cart cart={cart} setCart={setCart} />
    </div>
  );
}

export default App;
