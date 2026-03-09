import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar({ searchValue, onSearch }) {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm flex items-center gap-4 px-8 h-16">
      <Link to="/" className="flex items-center gap-2 shrink-0">
        <span className="text-3xl leading-none">🛍️</span>
        <span className="text-xl font-extrabold text-indigo-600 tracking-tight">ShopEase</span>
      </Link>

      {onSearch !== undefined && (
        <div className="relative flex-1 max-w-md flex align-middle justify-center items-centers">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search products…"
            value={searchValue}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-full border border-gray-200 bg-gray-50 text-sm text-gray-800 outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition"
          />
        </div>
      )}

      <div className="flex items-center gap-3 ml-auto">
        {user && (
          <span className="hidden sm:block text-sm text-gray-500 font-medium whitespace-nowrap">
            Hi, {user.name} 👋
          </span>
        )}
        <Link to="/cart" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition relative">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={18} height={18}>
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          Cart
          {itemCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1">
              {itemCount}
            </span>
          )}
        </Link>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-full border border-gray-200 text-sm font-semibold text-gray-500 hover:border-red-400 hover:text-red-500 transition bg-white cursor-pointer"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
