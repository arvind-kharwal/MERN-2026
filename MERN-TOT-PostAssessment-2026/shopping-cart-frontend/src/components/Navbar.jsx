import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">Shop</Link>
        <Link to="/cart" className="btn btn-light">Cart</Link>
      </div>
    </nav>
  );
}
