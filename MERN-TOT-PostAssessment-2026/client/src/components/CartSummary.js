import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CartSummary() {
  const [summary, setSummary] = useState({ totalItems: 0, totalPrice: 0 });

  useEffect(() => {
    axios.get('http://localhost:5000/cart/summary')
      .then(res => setSummary(res.data));
  }, []);

  return (
    <div className="mt-3 p-3 border bg-light">
      <h4>Cart Summary</h4>
      <p>Total Items: {summary.totalItems}</p>
      <p>Total Price: ${summary.totalPrice}</p>
    </div>
  );
}

export default CartSummary;
