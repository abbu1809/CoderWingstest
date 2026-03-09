import { createContext, useContext, useState, useEffect } from 'react';
import { cartAPI } from '../api';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const { data } = await cartAPI.getCart();
      setCart(data.cart || []);
    } catch {
      setCart([]);
    }
  };

  useEffect(() => { fetchCart(); }, []);

  const addToCart = async (product) => {
    const { data } = await cartAPI.addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    setCart(data.cart);
  };

  const updateQty = async (productId, qty) => {
    const { data } = await cartAPI.updateItem(productId, qty);
    setCart(data.cart);
  };

  const removeItem = async (productId) => {
    const { data } = await cartAPI.removeItem(productId);
    setCart(data.cart);
  };

  const clearCart = async () => {
    await cartAPI.clearCart();
    setCart([]);
  };

  const itemCount = cart.reduce((s, i) => s + i.quantity, 0);
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, itemCount, total, addToCart, updateQty, removeItem, clearCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
