import React, { useState, useEffect } from 'react';
import {
  ShoppingCart, User, Plus, Trash2, Phone,
  Home, FileText, Download, LogOut, Search
} from 'lucide-react';
import { motion } from 'framer-motion';

const RynjahComponent = () => {
  const [view, setView] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // --- PERSISTENT DATA (Saved in Browser) ---
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('rynjah_products');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: '8085 Microprocessor Kit', price: 2500, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400' },
      { id: 2, name: 'Arduino Uno R3', price: 650, image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400' }
    ];
  });

  const [myProjects, setMyProjects] = useState(() => {
    const saved = localStorage.getItem('rynjah_projects');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        title: "8085 Microprocessor Setup",
        description: "Interfacing the 8255 PPI with the 8085 kit.",
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400", 
        instructions: "1. Connect kit. 2. Write Hex codes. 3. Execute."
      }
    ];
  });

  const ADMIN_EMAIL = "esterlangrynjah@gmail.com";
  const ADMIN_PASS = "Admin@123";
  const WHATSAPP = "916009828446";

  useEffect(() => {
    localStorage.setItem('rynjah_products', JSON.stringify(products));
    localStorage.setItem('rynjah_projects', JSON.stringify(myProjects));
  }, [products, myProjects]);

  // --- CORE LOGIC ---
  const handleAuth = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      setView('home');
      alert("Logged out successfully!");
    } else {
      const email = prompt("Enter Admin Email:");
      const pass = prompt("Enter Password:");
      if (email === ADMIN_EMAIL && pass === ADMIN_PASS) {
        setIsLoggedIn(true);
        alert("Access Granted: Admin Mode Active");
      } else {
        alert("Invalid credentials.");
      }
    }
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(product.name + " added to cart!");
  };

  const checkout = () => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const itemNames = cart.map(i => i.name).join(', ');
    const message = "Order from RynjahComponent:%0AItems: " + itemNames + "%0ATotal: ₹" + total;
    window.open("https://wa.me/" + WHATSAPP + "?text=" + message, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      {/* NAVIGATION BAR */}
      <nav className="border-b border-slate-800 p-4 sticky top-0 bg-slate-900/80 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent cursor-pointer" onClick={() => setView('home')}>
            RynjahComponent
          </h1>
          <div className="flex gap-6 items-center">
            <button onClick={() => setView('home')} className="hover:text-blue-400 transition-colors">Home</button>
            <button onClick={() => setView('store')} className="hover:text-blue-400 transition-colors">Store</button>
            <button onClick={() => setView('projects')} className="hover:text-blue-400 transition-colors">Lab</button>
            <button onClick={() => setView('cart')} className="relative hover:text-blue-400 transition-colors">
              <ShoppingCart size={22} />
              {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-blue-500 text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{cart.length}</span>}
            </button>
            <button onClick={handleAuth} className={isLoggedIn ? "text-emerald-400" : "text-slate-400 hover:text-white"}>
              {isLoggedIn ? <LogOut size={22}/> : <User size={22}/>}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6">
        
        {/* VIEW: STORE (Components) */}
        {view === 'store' && (
          <div className="space-y-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-3 text-slate-500" size={20} />
              <input 
                type="text" placeholder="Search components..." 
                className="w-full bg-slate-800 border border-slate-700 p-3 pl-12 rounded-xl focus:border-blue-500 outline-none"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {isLoggedIn && (
              <div className="bg-slate-800 p-6 rounded-xl border border-emerald-500/30 max-w-2xl mx-auto shadow-xl">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Plus size={18} className="text-emerald-400"/> Admin: Add Part</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input id="s-name" placeholder="Name" className="bg-slate-900 p-2 rounded border border-slate-700" />
                  <input id="s-price" type="number" placeholder="Price" className="bg-slate-900 p-2 rounded border border-slate-700" />
                  <input id="s-img" placeholder="Image URL" className="bg-slate-900 p-2 rounded border border-slate-700" />
                  <button 
                    onClick={() => {
                      const n = document.getElementById('s-name').value;
                      const p = document.getElementById('s-price').value;
                      const i = document.getElementById('s-img').value;
                      if(n && p) {
                        setProducts([{ id: Date.now(), name: n, price: Number(p), image: i || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400' }, ...products]);
                        alert("Added to Store!");
                      }
                    }}
                    className="md:col-span-3 bg-emerald-600 hover:bg-emerald-500 p-2 rounded font-bold transition-all"
                  >Upload Component</button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map(product => (
                <div key={product.id} className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 p-4 hover:border-blue-500 transition-all group">
                  <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform" />
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{product.name}</h3>
                    {isLoggedIn && <button onClick={() => setProducts(products.filter(p => p.id !== product.id))} className="text-red-500 hover:bg-red-500/10 p-1 rounded"><Trash2 size={16}/></button>}
                  </div>
                  <p className="text-blue-400 font-mono text-lg mb-4">₹{product.price}</p>
                  <button onClick={() => addToCart(product)} className="w-full bg-blue-600 hover:bg-blue-500 py-2 rounded-lg font-bold transition-colors">Add to Cart</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW: PROJECT LAB (Beautiful Grid Version) */}
        {view === 'projects' && (
          <div className="max-w-6xl mx-auto space-y-10">
            <header className="text-center space-y-2">
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Innovation Lab</h2>
              <p className="text-slate-400">Documentation & Technical Guides</p>
            </header>

            <div className="relative max-w-md mx-auto mb-10">
              <Search className="absolute left-4 top-3 text-slate-500" size={20} />
              <input 
                type="text" placeholder="Search labs..." 
                className="w-full bg-slate-800 border border-slate-700 p-3 pl-12 rounded-xl focus:border-blue-500 outline-none"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {isLoggedIn && (
              <div className="bg-slate-800/50 p-6 rounded-3xl border border-blue-500/20 max-w-2xl mx-auto mb-10 shadow-2xl">
                <h3 className="text-lg font-bold mb-4 text-blue-400 flex items-center gap-2"><Plus size={20}/> Post New Lab</h3>
                <div className="space-y-3">
                  <input id="pj-title" placeholder="Lab Title" className="w-full bg-slate-900 p-3 rounded-xl border border-slate-700" />
                  <textarea id="pj-desc" placeholder="Brief Summary" className="w-full bg-slate-900 p-3 rounded-xl border border-slate-700 h-20" />
                  <input id="pj-img" placeholder="Image URL" className="w-full bg-slate-900 p-3 rounded-xl border border-slate-700" />
                  <textarea id="pj-inst" placeholder="Technical Steps / Hex Tables" className="w-full bg-slate-900 p-3 rounded-xl border border-slate-700 h-24" />
                  <button 
                    onClick={() => {
                      const t = document.getElementById('pj-title').value;
                      const d = document.getElementById('pj-desc').value;
                      const i = document.getElementById('pj-img').value;
                      const s = document.getElementById('pj-inst').value;
                      if(t && d) {
                        setMyProjects([{ id: Date.now(), title: t, description: d, imageUrl: i, instructions: s }, ...myProjects]);
                        alert("Project Live!");
                      }
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-500 p-3 rounded-xl font-bold transition-all"
                  >Publish to Lab</button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {myProjects
                .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((project) => (
                <div key={project.id} className="bg-slate-800/40 border border-slate-700 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all flex flex-col h-full shadow-lg">
                  <div className="relative h-52 bg-slate-900">
                    <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover opacity-80" />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <a href={project.imageUrl} target="_blank" rel="noreferrer" className="bg-black/40 p-2 rounded-full text-white hover:bg-blue-600 transition-colors"><Download size={18} /></a>
                      {isLoggedIn && <button onClick={() => setMyProjects(myProjects.filter(p => p.id !== project.id))} className="bg-black/40 p-2 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all"><Trash2 size={18}/></button>}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed">{project.description}</p>
                    <div className="mt-auto bg-slate-900/80 p-4 rounded-2xl border-l-2 border-blue-500">
                      <p className="text-[10px] font-black uppercase text-blue-400 mb-1 tracking-widest">Logic Detail</p>
                      <p className="text-xs text-slate-500 font-mono line-clamp-2 italic">{project.instructions}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW: HOME */}
        {view === 'home' && (
          <div className="py-24 text-center space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-6xl font-black bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent mb-4">ENGINEERING HUB</h2>
              <p className="text-slate-400 text-xl max-w-2xl mx-auto">Get the parts. Learn the logic. Build the future.</p>
            </motion.div>
            <div className="flex justify-center gap-4">
              <button onClick={() => setView('store')} className="bg-blue-600 hover:bg-blue-500 px-10 py-4 rounded-full font-bold text-lg shadow-lg shadow-blue-500/20 transition-all">Shop Store</button>
              <button onClick={() => setView('projects')} className="bg-slate-800 hover:bg-slate-700 px-10 py-4 rounded-full font-bold text-lg border border-slate-700 transition-all">Explore Lab</button>
            </div>
          </div>
        )}

        {/* VIEW: CART */}
        {view === 'cart' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-2"><ShoppingCart className="text-blue-400" /> My Cart</h2>
            {cart.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-slate-700 rounded-3xl">
                <p className="text-slate-500">Your cart is currently empty.</p>
                <button onClick={() => setView('store')} className="mt-4 text-blue-400 font-bold">Go Shopping →</button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-slate-800 p-4 rounded-2xl border border-slate-700">
                    <div>
                      <h4 className="font-bold">{item.name}</h4>
                      <p className="text-blue-400 font-mono">₹{item.price}</p>
                    </div>
                    <button onClick={() => setCart(cart.filter((_, i) => i !== idx))} className="text-red-400 hover:bg-red-400/10 p-2 rounded-lg transition-colors"><Trash2 size={20}/></button>
                  </div>
                ))}
                <div className="pt-8 border-t border-slate-800 mt-10">
                  <div className="flex justify-between text-2xl font-bold mb-6">
                    <span>Grand Total:</span>
                    <span className="text-emerald-400">₹{cart.reduce((s, i) => s + i.price, 0)}</span>
                  </div>
                  <button onClick={checkout} className="w-full bg-green-600 hover:bg-green-500 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-green-500/10 transition-all">
                    <Phone size={20}/> Checkout on WhatsApp
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default RynjahComponent;
