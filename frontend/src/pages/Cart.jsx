import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, total, updateQty, removeItem, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    await clearCart();
    alert('🎉 Order placed successfully! (Demo)');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-5xl mx-auto px-8 py-10 pb-16">
        <div className="flex items-baseline justify-between mb-8 flex-wrap gap-3">
          <h1 className="text-2xl font-extrabold text-gray-900">My Cart</h1>
          <Link to="/" className="text-sm text-indigo-600 font-semibold hover:underline">← Continue Shopping</Link>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 gap-4 text-gray-400">
            <span className="text-6xl">🛒</span>
            <p className="text-lg font-medium">Your cart is empty</p>
            <Link to="/" className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-6 py-2.5 rounded-lg transition">
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="flex gap-8 items-start flex-col lg:flex-row">
            {/* Items */}
            <div className="flex-1 flex flex-col gap-4">
              {cart.map((item) => (
                <div key={item.productId}
                  className="bg-white border border-gray-100 rounded-2xl p-5 flex gap-4 items-center hover:shadow-md transition"
                >
                  <img
                    src={item.image} alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover bg-gray-50 shrink-0"
                    onError={(e) => { e.target.src = 'https://placehold.co/80x80?text=No+Image'; }}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-gray-900 truncate">{item.name}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">₹{item.price.toLocaleString('en-IN')} each</p>
                  </div>
                  <div className="flex flex-col items-end gap-2.5 shrink-0">
                    <div className="flex items-center gap-3 border border-gray-200 rounded-full px-3 py-1 bg-gray-50">
                      <button onClick={() => updateQty(item.productId, item.quantity - 1)}
                        className="text-indigo-600 font-bold text-lg w-5 h-5 flex items-center justify-center rounded-full hover:bg-indigo-50 transition cursor-pointer">−</button>
                      <span className="text-sm font-bold text-gray-800 min-w-[16px] text-center">{item.quantity}</span>
                      <button onClick={() => updateQty(item.productId, item.quantity + 1)}
                        className="text-indigo-600 font-bold text-lg w-5 h-5 flex items-center justify-center rounded-full hover:bg-indigo-50 transition cursor-pointer">+</button>
                    </div>
                    <p className="text-sm font-bold text-gray-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    <button onClick={() => removeItem(item.productId)}
                      className="text-xs text-red-400 hover:text-red-600 font-medium cursor-pointer bg-transparent border-none transition">
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <button onClick={clearCart}
                className="self-start px-4 py-2 text-sm font-semibold text-gray-400 border border-gray-200 rounded-lg hover:border-red-400 hover:text-red-500 transition cursor-pointer bg-white">
                Clear Cart
              </button>
            </div>

            {/* Summary */}
            <aside className="bg-white border border-gray-100 rounded-2xl p-7 w-full lg:w-80 shrink-0 sticky top-24">
              <h2 className="text-base font-bold text-gray-900 mb-5">Order Summary</h2>

              <div className="flex justify-between text-sm text-gray-500 mb-3">
                <span>Items ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm mb-3">
                <span className="text-gray-500">Delivery</span>
                <span className="text-emerald-500 font-semibold">FREE</span>
              </div>
              <div className="border-t border-gray-100 my-4" />
              <div className="flex justify-between text-base font-bold text-gray-900 mb-6">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>

              <button onClick={handleCheckout}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-lg transition cursor-pointer">
                Proceed to Checkout
              </button>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
