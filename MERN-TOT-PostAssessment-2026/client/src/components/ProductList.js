import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

function ProductList({ addToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(res => setProducts(res.data));
  }, []);

  return (
    <div className="row">
      {products.map(p => (
        <div className="col-md-4 mb-3" key={p.id}>
          <ProductCard product={p} addToCart={addToCart} />
        </div>
      ))}
    </div>
  );
}

export default ProductList;
