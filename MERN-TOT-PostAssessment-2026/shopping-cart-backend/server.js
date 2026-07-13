const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let cart = [];

// Get all products
app.get("/products", async (req, res) => {
  const response = await axios.get("https://dummyjson.com/products");
  res.json(response.data.products);
});

// Get product by id
app.get("/products/:id", async (req, res) => {
  const response = await axios.get(`https://dummyjson.com/products/${req.params.id}`);
  res.json(response.data);
});

// Search products
app.get("/products/search", async (req, res) => {
  const { q } = req.query;
  const response = await axios.get(`https://dummyjson.com/products/search?q=${q}`);
  res.json(response.data.products);
});

// Add item to cart
app.post("/cart", (req, res) => {
  const { id, quantity } = req.body;
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ id, quantity });
  }
  res.json(cart);
});

// Show cart
app.get("/cart", (req, res) => {
  res.json(cart);
});

// Update quantity
app.put("/cart/:id", (req, res) => {
  const { quantity } = req.body;
  const item = cart.find(i => i.id == req.params.id);
  if (item) item.quantity = quantity;
  res.json(cart);
});

// Delete item
app.delete("/cart/:id", (req, res) => {
  cart = cart.filter(i => i.id != req.params.id);
  res.json(cart);
});

// Delete cart
app.delete("/cart", (req, res) => {
  cart = [];
  res.json(cart);
});

// Cart summary
app.get("/cart/summary", (req, res) => {
  res.json({
    totalItems: cart.reduce((sum, i) => sum + i.quantity, 0),
    totalUnique: cart.length
  });
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
