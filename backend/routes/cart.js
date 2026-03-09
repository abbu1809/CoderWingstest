const express = require('express');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();


const carts = {};

// GET /api/cart 
router.get('/', verifyToken, (req, res) => {
  const userId = req.user.id;
  const cart = carts[userId] || [];

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  res.json({ cart, total, itemCount: cart.length });
});

// POST /api/cart 
router.post('/', verifyToken, (req, res) => {
  const userId = req.user.id;
  const { productId, name, price, image, quantity = 1 } = req.body;

  if (!productId || !name || price === undefined) {
    return res.status(400).json({ message: 'productId, name, and price are required.' });
  }

  if (!carts[userId]) {
    carts[userId] = [];
  }

  const existing = carts[userId].find(item => item.productId === productId);

  if (existing) {
    existing.quantity += quantity;
  } else {
    carts[userId].push({ productId, name, price, image, quantity });
  }

  const total = carts[userId].reduce((sum, item) => sum + item.price * item.quantity, 0);
  res.json({ message: 'Item added to cart.', cart: carts[userId], total });
});

// PUT /api/cart/:productId
router.put('/:productId', verifyToken, (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;
  const { quantity } = req.body;

  if (!carts[userId]) {
    return res.status(404).json({ message: 'Cart not found.' });
  }

  const item = carts[userId].find(i => i.productId === productId);
  if (!item) {
    return res.status(404).json({ message: 'Item not found in cart.' });
  }

  if (quantity <= 0) {
    carts[userId] = carts[userId].filter(i => i.productId !== productId);
  } else {
    item.quantity = quantity;
  }

  const total = carts[userId].reduce((sum, item) => sum + item.price * item.quantity, 0);
  res.json({ message: 'Cart updated.', cart: carts[userId], total });
});

// DELETE /api/cart/:productId
router.delete('/:productId', verifyToken, (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  if (!carts[userId]) {
    return res.status(404).json({ message: 'Cart not found.' });
  }

  carts[userId] = carts[userId].filter(i => i.productId !== productId);
  const total = carts[userId].reduce((sum, item) => sum + item.price * item.quantity, 0);

  res.json({ message: 'Item removed from cart.', cart: carts[userId], total });
});

// DELETE /api/cart 
router.delete('/', verifyToken, (req, res) => {
  const userId = req.user.id;
  carts[userId] = [];
  res.json({ message: 'Cart cleared.', cart: [] });
});

module.exports = router;
