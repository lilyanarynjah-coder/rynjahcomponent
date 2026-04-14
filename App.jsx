import React, { useState, useEffect } from 'react';
import {
  ShoppingCart, User, LayoutDashboard, Plus, Trash2, Phone, Package,
  Home, Image as ImageIcon, FileText, Download, LogOut, Search
} from 'lucide-react';
import { motion } from 'framer-motion';

const RynjahComponent = () => {
  const [view, setView] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // 1. DYNAMIC STORE DATA (Saves to Browser Memory)
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('rynjah_products');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: '8085 Microprocessor Kit', price: 2500, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400' },
      { id: 2, name: 'Arduino Uno R3', price: 650, image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400' }
    ];
  });

  // 2. PROJECT LAB DATA (Saves to Browser Memory)
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

  // Data Persistence Logic
  useEffect(() => {
    localStorage.setItem('rynjah_products', JSON.stringify(products));
    localStorage.setItem('rynjah_projects', JSON.stringify(myProjects));
  }, [products, myProjects]);

  // LOGIN & AUTHENTICATION
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
    alert(`${product.name} added to cart!`);
  };

  const checkout = () => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const itemNames = cart.map(i => i.name).join(', ');
    const message = `Order from RynjahComponent:%0AItems: ${itemNames}%0ATotal: ₹${total}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${message}`, '_blank');
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
            <button onClick={() => setView('home')} className={`hover:text-blue-400 ${view === 'home' ? 'text-blue-400' : ''}`}>Home</button>
            <button onClick={() => setView('store')} className={`hover:text-blue-400 ${view === 'store' ? 'text-blue-400' : ''}`}>Store</button>
            <button onClick={() => setView('projects')} className={`hover:text-blue-400 ${view === 'projects' ? 'text-blue-400' : ''}`}>Lab</button>
            <button onClick={() => setView('cart')} className="relative hover:text-blue-400">
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
        
        {/* STORE VIEW (SEARCH + UPLOAD + BUY) */}
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
              <div className="bg-slate-800 p-6 rounded-xl border border-emerald-500/30">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Plus size={18} className="text-emerald-400"/> Admin: Upload Component</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input id="s-name" placeholder="Part Name" className="bg-slate-900 p-2 rounded border border-slate-700 text-sm" />
                  <input id="s-price" type="number" placeholder="Price (₹)" className="bg-slate-900 p-2 rounded border border-slate-700 text-sm" />
                  <input id="s-img" placeholder="Image URL" className="bg-slate-900 p-2 rounded border border-slate-700 text-sm" />
                  <button 
                    onClick={() => {
                      const n = document.getElementById('s-name').value;
                      const p = document.getElementById('s-price').value;
                      const i = document.getElementById('s-img').value;
                      if(n && p) {
                        setProducts([{ id: Date.now(), name: n, price: Number(p), image: i || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400' }, ...products]);
                        alert("Product Added!");
                      }
                    }}
                    className="md:col-span-3 bg-emerald-600 hover:bg-emerald-500 p-2 rounded font-bold transition-all"
                  >Add to Store</button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map(product => (
                <div key={product.id} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 p-4 hover:border-blue-500 transition-all group shadow-lg">
                  <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform" />
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold">{product.name}</h3>
                    {isLoggedIn && <button onClick={() => setProducts(products.filter(p => p.id !== product.id))} className="text-red-500 hover:bg-red-500/10 p-1 rounded"><Trash2 size={16}/></button>}
                  </div>
                  <p className="text-blue-400 font-mono mb-4">₹{product.price}</p>
                  <button onClick={() => addToCart(product)} className="w-full bg-blue-600 hover:bg-blue-500 py-2 rounded-lg flex items-center justify-center gap-2 font-bold">
                    <Plus size={18}/> Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROJECT LAB VIEW (UPLOAD + DOWNLOAD + DETAILS) */}
       {/* VIEW: PROJECT LAB (Beautiful Grid Version) */}
        {view === 'projects' && (
          <div className="max-w-6xl mx-auto space-y-10">
            <header className="text-center">
              <h2 className="text-4xl font-black text-white">Innovation Lab</h2>
              <p className="text-slate-400">Step-by-step ECE engineering guides.</p>
            </header>
            <div className="relative max-w-md mx-auto mb-10">
  <Search className="absolute left-4 top-3 text-slate-500" size={20} />
  <input 
    type="text" 
    placeholder="Search project titles or tech..." 
    className="w-full bg-slate-800 border border-slate-700 p-3 pl-12 rounded-xl focus:border-blue-500 outline-none transition-all"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>
            
            {isLoggedIn && (
              <div className="bg-slate-800/50 p-6 rounded-3xl border border-blue-500/20 max-w-2xl mx-auto">
                <h3 className="text-lg font-bold mb-4 text-blue-400">Publish New Project</h3>
                <div className="space-y-3">
                  <input id="pj-title" placeholder="Project Title" className="w-full bg-slate-900 p-3 rounded-xl border border-slate-700" />
                  <textarea id="pj-desc" placeholder="Brief Summary" className="w-full bg-slate-900 p-3 rounded-xl border border-slate-700 h-20" />
                  <input id="pj-img" placeholder="Image URL" className="w-full bg-slate-900 p-3 rounded-xl border border-slate-700" />
                  <textarea id="pj-inst" placeholder="Technical Steps" className="w-full bg-slate-900 p-3 rounded-xl border border-slate-700 h-24" />
                  <button 
                    onClick={() => {
                      const t = document.getElementById('pj-title').value;
                      const d = document.getElementById('pj-desc').value;
                      const i = document.getElementById('pj-img').value;
                      const s = document.getElementById('pj-inst').value;
                      if(t && d) {
                        setMyProjects([{ id: Date.now(), title: t, description: d, imageUrl: i, instructions: s }, ...myProjects]);
                        alert("Project Posted!");
                      }
                    }}
                    className="w-full bg-blue-600 p-3 rounded-xl font-bold"
                  >Post to Lab</button>
                </div>
              </div>
            )}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {myProjects
    .filter(project => 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((project, index) => (
      <div key={project.id} className="bg-slate-800/40 border border-slate-700 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all flex flex-col h-full shadow-xl">
        <div className="relative h-52 bg-slate-900">
          <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover opacity-80" />
          <div className="absolute top-4 right-4 flex gap-2">
            <a href={project.imageUrl} target="_blank" rel="noreferrer" className="bg-black/40 p-2 rounded-full text-white hover:bg-blue-600">
              <Download size={18} />
            </a>
            {isLoggedIn && (
              <button onClick={() => setMyProjects(myProjects.filter(p => p.id !== project.id))} className="bg-black/40 p-2 rounded-full text-white hover:bg-red-500">
                <Trash2 size={18}/>
              </button>
            )}
          </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-slate-400 text-sm mb-6 line-clamp-3">{project.description}</p>
          <div className="mt-auto bg-slate-900/80 p-4 rounded-2xl border-l-2 border-blue-500">
            <p className="text-[10px] font-black uppercase text-blue-400 mb-1">Technical Guide</p>
            <p className="text-xs text-slate-500 font-mono line-clamp-2">{project.instructions}</p>
          </div>
        </div>
      </div>
    ))}
</div>

        {/* HOME VIEW */}
        {view === 'home' && (
          <div className="py-24 text-center space-y-8">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <h2 className="text-6xl font-black mb-4 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">ECE INNOVATION HUB</h2>
              <p className="text-slate-400 text-xl max-w-2xl mx-auto">Access high-quality electronic components and follow step-by-step engineering projects curated for the technical branch.</p>
            </motion.div>
            <div className="flex justify-center gap-4">
              <button onClick={() => setView('store')} className="bg-blue-600 hover:bg-blue-500 px-10 py-4 rounded-full font-bold text-lg shadow-lg shadow-blue-500/20 transition-all">Shop Components</button>
              <button onClick={() => setView('projects')} className="bg-slate-800 hover:bg-slate-700 px-10 py-4 rounded-full font-bold text-lg border border-slate-700 transition-all">Visit Lab</button>
            </div>
          </div>
        )}

        {/* CART VIEW */}
        {view === 'cart' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-2"><ShoppingCart /> Checkout</h2>
            {cart.length === 0 ? <p className="text-slate-400 text-center py-20 border border-dashed border-slate-700 rounded-xl">Your shopping cart is empty.</p> : (
              <div className="space-y-4">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-slate-800 p-4 rounded-xl border border-slate-700">
                    <div>
                      <h4 className="font-bold">{item.name}</h4>
                      <p className="text-blue-400 font-mono">₹{item.price}</p>
                    </div>
                    <button onClick={() => setCart(cart.filter((_, i) => i !== idx))} className="text-red-400 hover:bg-red-400/10 p-2 rounded"><Trash2 size={20}/></button>
                  </div>
                ))}
                <div className="pt-8 border-t border-slate-700">
                  <div className="flex justify-between text-2xl font-bold mb-6">
                    <span>Total Order:</span>
                    <span>₹{cart.reduce((s, i) => s + i.price, 0)}</span>
                  </div>
                  <button onClick={checkout} className="w-full bg-green-600 hover:bg-green-500 py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-lg shadow-lg shadow-green-500/20">
                    <Phone size={20}/> Send Order via WhatsApp
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
