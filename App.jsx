import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  User, 
  LayoutDashboard, 
  Plus, 
  Trash2, 
  ChevronRight, 
  Phone,
  Package,
  Home
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RynjahComponent = () => {
  const [view, setView] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('rynjah_products');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: '8085 Microprocessor Kit', price: 2500, category: 'Microprocessors', stock: 5, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400' },
      { id: 2, name: 'Arduino Uno R3', price: 650, category: 'Microcontrollers', stock: 12, image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400' }
    ];
  });

  // Admin Credentials
  const ADMIN_EMAIL = "esterlangrynjah@gmail.com";
  const ADMIN_PASS = "Admin@123";
  const UPI_ID = "esterlangrynjah@okaxis"; // Replace with your real UPI
  const WHATSAPP = "911234567890"; // Replace with your real number

  useEffect(() => {
    localStorage.setItem('rynjah_products', JSON.stringify(products));
  }, [products]);

  const handleLogin = () => {
    const email = prompt("Enter Admin Email:");
    const pass = prompt("Enter Password:");
    if (email === ADMIN_EMAIL && pass === ADMIN_PASS) {
      setIsLoggedIn(true);
      alert("Welcome back, Admin!");
    } else {
      alert("Invalid credentials.");
    }
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(${product.name} added to cart!);
  };

  const addProduct = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const price = Number(e.target.price.value);
    const newProduct = {
      id: Date.now(),
      name,
      price,
      category: 'General',
      stock: 10,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400'
    };
    setProducts([...products, newProduct]);
    e.target.reset();
  };

  const checkout = () => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const message = Order from RynjahComponent:%0AItems: ${cart.map(i => i.name).join(', ')}%0ATotal: ₹${total};
    window.open(https://wa.me/${WHATSAPP}?text=${message}, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      {/* Navigation */}
      <nav className="border-b border-slate-800 p-4 sticky top-0 bg-slate-900/80 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            RynjahComponent
          </h1>
          <div className="flex gap-6 items-center">
            <button onClick={() => setView('home')} className="hover:text-blue-400 flex items-center gap-1"><Home size={18}/> Home</button>
            <button onClick={() => setView('store')} className="hover:text-blue-400 flex items-center gap-1"><Package size={18}/> Store</button>
            <button onClick={() => setView('cart')} className="relative hover:text-blue-400">
              <ShoppingCart size={22} />
              {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-blue-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">{cart.length}</span>}
            </button>
            {isLoggedIn ? (
              <button onClick={() => setView('admin')} className="text-emerald-400"><LayoutDashboard size={22}/></button>
            ) : (
              <button onClick={handleLogin} className="hover:text-blue-400"><User size={22}/></button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        {view === 'home' && (
          <div className="py-20 text-center">
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-extrabold mb-6">ECE Projects & Components</motion.h2>
            <p className="text-slate-400 text-xl mb-8">Professional electronics store for engineering students.</p>
            <button onClick={() => setView('store')} className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full font-bold transition-all">Start Shopping</button>
          </div>
        )}

        {view === 'store' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map(product => (
              <motion.div key={product.id} layout className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500 transition-colors">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                  <p className="text-blue-400 font-mono mb-4">₹{product.price}</p>
                  <button onClick={() => addToCart(product)} className="w-full bg-slate-700 hover:bg-blue-600 py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <Plus size={18}/> Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {view === 'admin' && isLoggedIn && (
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><LayoutDashboard /> Admin Dashboard</h2>
            <form onSubmit={addProduct} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <input name="name" placeholder="Item Name" className="bg-slate-900 p-3 rounded-lg border border-slate-700" required />
              <input name="price" type="number" placeholder="Price (₹)" className="bg-slate-900 p-3 rounded-lg border border-slate-700" required />
              <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 rounded-lg font-bold">Add Product</button>
            </form>
            <div className="space-y-4">
              {products.map(p => (
                <div key={p.id} className="flex justify-between items-center bg-slate-900 p-4 rounded-lg">
                  <span>{p.name} - ₹{p.price}</span>
                  <button onClick={() => setProducts(products.filter(item => item.id !== p.id))} className="text-red-400 hover:text-red-300"><Trash2 size={18}/></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'cart' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-2"><ShoppingCart /> Your Cart</h2>
            {cart.length === 0 ? (
              <p className="text-slate-400">Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-slate-800 p-4 rounded-xl border border-slate-700">
                    <div>
                      <h4 className="font-bold">{item.name}</h4>
                      <p className="text-blue-400">₹{item.price}</p>
                    </div>
                  </div>
                ))}
                <div className="border-t border-slate-700 pt-4 mt-8">
                  <div className="flex justify-between text-xl font-bold mb-6">
                    <span>Total:</span>
                    <span>₹{cart.reduce((s, i) => s + i.price, 0)}</span>
                  </div>
                  <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-800 mb-6">
                    <p className="text-sm text-blue-300 mb-2 font-bold uppercase tracking-wider">Payment Details</p>
                    <p className="text-lg font-mono">UPI ID: {UPI_ID}</p>
                  </div>
                  <button onClick={checkout} className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-lg">
                    <Phone size={20}/> Order via WhatsApp
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="mt-20 border-t border-slate-800 p-8 text-center text-slate-500">
        <p>© 2026 RynjahComponent - Electronics Store</p>
      </footer>
    </div>
  );
};

export default RynjahComponent;
