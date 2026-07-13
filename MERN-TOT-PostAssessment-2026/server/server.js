import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let cart = [];

// Get all products
app.get('/products', async (req, res) => {
    const { data } = await axios.get('https://dummyjson.com/products');
    res.json(data.products);
});

// Get product by id
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { data } = await axios.get(`https://dummyjson.com/products/${id}`);
    res.json(data);
});

// Search products
app.get('/products/search', async (req, res) => {
    const { q } = req.query;
    const { data } = await axios.get(`https://dummyjson.com/products/search?q=${q}`);
    res.json(data.products);
});

// Add item to cart
app.post('/cart', (req, res) => {
    const item = req.body;
    const existing = cart.find(p => p.id === item.id);
    if (existing) {
    existing.quantity += item.quantity;
    } else {
        cart.push(item);
    }
    res.json(cart);
});

// Show cart
app.get('/cart', (req, res) => {
    res.json(cart);
});

// Update quantity
app.put('/cart/:id', (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    cart = cart.map(item => item.id == id ? { ...item, quantity } : item);
    res.json(cart);
});

// Delete item
app.delete('/cart/:id', (req, res) => {
    const { id } = req.params;
    cart = cart.filter(item => item.id != id);
    res.json(cart);
});

// Delete cart
app.delete('/cart', (req, res) => {
    cart = [];
    res.json(cart);
});

// Cart summary
app.get('/cart/summary', (req, res) => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    res.json({ totalItems, totalPrice });
});

app.listen(5000, () => console.log('Backend running on http://localhost:5000'));
