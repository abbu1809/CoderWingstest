const express = require('express');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Sample product catalog
const products = [
  { id: '1', name: 'Wireless Headphones', price: 2999, category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', rating: 4.5, description: 'Premium wireless headphones with noise cancellation.' },
  { id: '2', name: 'Running Shoes', price: 3499, category: 'Footwear', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', rating: 4.3, description: 'Lightweight and comfortable running shoes.' },
  { id: '3', name: 'Smart Watch', price: 8999, category: 'Electronics', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', rating: 4.7, description: 'Feature-packed smartwatch with health tracking.' },
  { id: '4', name: 'Leather Backpack', price: 1999, category: 'Bags', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', rating: 4.2, description: 'Stylish leather backpack for everyday use.' },
  { id: '5', name: 'Sunglasses', price: 1299, category: 'Accessories', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400', rating: 4.4, description: 'UV-protected polarized sunglasses.' },
  { id: '6', name: 'Coffee Maker', price: 4499, category: 'Kitchen', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400', rating: 4.6, description: 'Brew perfect coffee every morning.' },
  { id: '7', name: 'Yoga Mat', price: 799, category: 'Fitness', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400', rating: 4.1, description: 'Non-slip eco-friendly yoga mat.' },
  { id: '8', name: 'Desk Lamp', price: 1499, category: 'Home', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400', rating: 4.0, description: 'Adjustable LED desk lamp with eye-care technology.' },
];

// GET /api/products — Fetch all products (public)
router.get('/', (req, res) => {
  const { category, search } = req.query;
  let result = [...products];

  if (category) {
    result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  }

  res.json({ products: result, total: result.length });
});

// GET /api/products/:id — Fetch single product (public)
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found.' });
  }
  res.json(product);
});

module.exports = router;
