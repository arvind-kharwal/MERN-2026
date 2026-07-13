import { useEffect, useState } from "react";
import API from "../api";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    API.get("/cart").then(res => setCart(res.data));
  }, []);

  const updateQuantity = (id, quantity) => {
    API.put(`/cart/${id}`, { quantity }).then(res => setCart(res.data));
  };

  const deleteItem = (id) => {
    API.delete(`/cart/${id}`).then(res => setCart(res.data));
  };

  const clearCart = () => {
    API.delete("/cart").then(res => setCart(res.data));
  };

  return (
    <div className="container mt-3">
      <h2>Cart</h2>
      {cart.length === 0 ? <p>Cart is empty</p> : (
        <table className="table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <input type="number" value={item.quantity} min="1"
                    onChange={e => updateQuantity(item.id, parseInt(e.target.value))} />
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => deleteItem(item.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="btn btn-warning" onClick={clearCart}>Clear Cart</button>
    </div>
  );
}
