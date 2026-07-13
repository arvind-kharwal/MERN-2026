import React from 'react';

function ProductCard({ product, addToCart }) {
  return (
    <div className="card h-100">
      <img src={product.thumbnail} className="card-img-top" alt={product.title} />
      <div className="card-body d-flex flex-column">
        <h5>{product.title}</h5>
        <p>${product.price}</p>
        <button className="btn btn-primary mt-auto" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
