import React from 'react';

function CartItem({ item, updateQuantity, deleteItem }) {
  return (
    <div className="d-flex justify-content-between align-items-center border p-2 mb-2">
      <span>{item.title} (x{item.quantity})</span>
      <div>
        <button className="btn btn-sm btn-secondary" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
        <button className="btn btn-sm btn-secondary mx-2" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
        <button className="btn btn-sm btn-danger" onClick={() => deleteItem(item.id)}>Remove</button>
      </div>
    </div>
  );
}

export default CartItem;
