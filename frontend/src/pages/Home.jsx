import { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/Navbar';
import { productAPI } from '../api';
import { useCart } from '../context/CartContext';
import Footer from '../components/footer';

const CATEGORIES = ['All', 'Electronics', 'Footwear', 'Bags', 'Accessories', 'Kitchen', 'Fitness', 'Home'];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [toast, setToast] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    productAPI.getAll()
      .then(({ data }) => setProducts(data.products))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [products, activeCategory, search]);

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product);
      showToast(`"${product.name}" added to cart ✓`);
    } catch {
      showToast('Please login again.', 'error');
    }
  };

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar searchValue={search} onSearch={setSearch} />

     

      {/* Category tabs */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-40 px-8 flex justify-center items-center">
        <div className="flex gap-2 overflow-x-auto py-3 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full border text-sm font-medium whitespace-nowrap transition cursor-pointer ${
                activeCategory === cat
                  ? 'bg-indigo-600 border-indigo-600 text-white'
                  : 'border-gray-200 text-gray-500 hover:border-indigo-400 hover:text-indigo-500 bg-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <main className="max-w-7xl mx-auto px-8 py-10 pb-16">
        <div className="flex items-baseline gap-3 mb-6">
          <h2 className="text-lg font-bold text-gray-900">
            {activeCategory === 'All' ? 'All Products' : activeCategory}
          </h2>
          <span className="text-sm text-gray-400">{filtered.length} items</span>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
            <span className="w-10 h-10 border-3 border-gray-200 border-t-indigo-600 rounded-full animate-spin" />
            <p>Loading products…</p>
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-400">
            <span className="text-5xl">🔍</span>
            <p>No products found.</p>
          </div>
        )}

        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6">
          {filtered.map((p) => (
            <div key={p.id}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              <div className="relative h-48 overflow-hidden bg-gray-50">
                <img
                  src={p.image} alt={p.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => { e.target.src = 'https://placehold.co/400x250?text=No+Image'; }}
                />
                <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  {p.category}
                </span>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-sm font-bold text-gray-900 mb-1">{p.name}</h3>
                <p className="text-xs text-gray-400 leading-relaxed flex-1 mb-4">{p.description}</p>
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <span className="block text-base font-bold text-indigo-600">₹{p.price.toLocaleString('en-IN')}</span>
                    <span className="text-xs text-gray-400">⭐ {p.rating}</span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(p)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition cursor-pointer whitespace-nowrap"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {toast && (
        <div className={`fixed bottom-7 right-7 px-5 py-3 rounded-xl text-white text-sm font-semibold shadow-lg animate-fade-up z-50 ${
          toast.type === 'error' ? 'bg-red-500' : 'bg-emerald-500'
        }`}>
          {toast.msg}
        </div>
      )}
      <Footer/>
    </div>
  );
}

