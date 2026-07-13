import { useEffect, useState } from "react";
import API from "../api";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products").then(res => setProducts(res.data));
  }, []);

  const addToCart = (id) => {
    API.post("/cart", { id, quantity: 1 }).then(() => alert("Added to cart"));
  };

  return (
    <div className="container mt-3">
      <h2>Products</h2>
      <div className="row">
        {products.map(p => (
          <div key={p.id} className="col-md-3">
            <div className="card mb-3">
              <img src={p.thumbnail} className="card-img-top" alt={p.title} />
              <div className="card-body">
                <h5>{p.title}</h5>
                <p>${p.price}</p>
                <button className="btn btn-primary" onClick={() => addToCart(p.id)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
