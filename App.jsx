import React, { useState, useEffect } from 'react';
import {
  ShoppingCart,
  User,
  LayoutDashboard,
  Plus,
  Trash2,
  Phone,
  Package,
  Home,
  Image as ImageIcon,
  FileText,
  Download           
} from 'lucide-react';
import { motion } from 'framer-motion';

const RynjahComponent = () => {
  const [view, setView] = useState('projects');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  
  // Store Data Management
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('rynjah_products');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: '8085 Microprocessor Kit', price: 2500, category: 'ECE', stock: 5, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400' },
      { id: 2, name: 'Arduino Uno R3', price: 650, category: 'ECE', stock: 12, image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400' }
    ];
  });

  // Project Lab Data Management
  const [myProjects, setMyProjects] = useState(() => {
    const saved = localStorage.getItem('rynjah_projects');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        title: "8085 Microprocessor Setup",
        description: "Interfacing the 8255 with the 8085 kit.",
        imageUrl: "https://i.postimg.cc/example/8085.jpg", 
        instructions: "1. Connect the kit. 2. Enter Hex codes."
      }
    ];
  });

  // Constants
  const ADMIN_EMAIL = "esterlangrynjah@gmail.com";
  const ADMIN_PASS = "Admin@123";
  const UPI_ID = "esterlangrynjah-1@oksbi";
  const WHATSAPP = "916009828446";

  // Persistent Storage Sync
  useEffect(() => {
    localStorage.setItem('rynjah_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('rynjah_projects', JSON.stringify(myProjects));
  }, [myProjects]);

  // Logic Handlers
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
    alert(`${product.name} added to cart!`);
  };

  const checkout = () => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const itemNames = cart.map(i => i.name).join(', ');
    const message = Order from RynjahComponent:%0AItems: ${itemNames}%0ATotal: ₹${total};
    window.open(`https://wa.me/${WHATSAPP}?text=${message}`, '_blank');
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
            <button onClick={() => setView('projects')} className={flex items-center gap-2 ${view === 'projects' ? 'text-blue-400' : 'text-slate-400'}}>
              <LayoutDashboard size={20} />
              <span>Project Lab</span>
            </button>
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

      <main className="max-w-6xl mx-auto p-6">
        
        {/* VIEW: PROJECT LAB */}
        {view === 'projects' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-white">Engineering Project Feed</h2>
            
            {/* ADMIN FORM: Only visible when logged in */}
            {isLoggedIn && (
              <div className="bg-slate-800 p-6 rounded-xl mb-12 border border-blue-500/30 shadow-2xl">
                <h3 className="text-xl font-bold mb-4 text-blue-400">Admin: Post New Project</h3>
                <div className="grid gap-4">
                  <input id="p-title" type="text" placeholder="Project Name" className="bg-slate-900 p-3 rounded text-white border border-slate-700" />
                  <textarea id="p-desc" placeholder="Brief Description" className="bg-slate-900 p-3 rounded text-white border border-slate-700" />
                  <input id="p-img" type="text" placeholder="Image URL (PostImages.org link)" className="bg-slate-900 p-3 rounded text-white border border-slate-700" />
                  <textarea id="p-inst" placeholder="Instructions/Logic" className="bg-slate-900 p-3 rounded text-white border border-slate-700" />
                  <button 
                    onClick={() => {
                      const title = document.getElementById('p-title').value;
                      const desc = document.getElementById('p-desc').value;
                      const img = document.getElementById('p-img').value;
                      const inst = document.getElementById('p-inst').value;
                      if(!title || !desc) return alert("Fill in title and description!");
                      const newProject = { id: Date.now(), title, description: desc, imageUrl: img, instructions: inst };
                      setMyProjects([newProject, ...myProjects]);
                      alert("Project Posted!");
                      document.getElementById('p-title').value = ''; document.getElementById('p-desc').value = '';
                      document.getElementById('p-img').value = ''; document.getElementById('p-inst').value = '';
                    }}
                    className="bg-blue-600 hover:bg-blue-500 p-3 rounded-lg font-bold transition-all"
                  >
                    Post to Lab
                  </button>
                </div>
              </div>
            )}

            {/* PROJECT FEED */}
            <div className="grid gap-10">
              {myProjects.map((project) => (
                <div key={project.id} className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-xl group">
                  <div className="h-72 bg-slate-900 flex items-center justify-center relative">
                    {project.imageUrl ? (
                      <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon size={48} className="text-slate-700" />
                    )}
                    {/* Public Download Button */}
                    {project.imageUrl && (
                      <a href={project.imageUrl} download className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-blue-600 text-white transition-colors">
                        <Download size={20} />
                      </a>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-blue-400">{project.title}</h3>
                      {isLoggedIn && (
                        <button 
                          onClick={() => { if(window.confirm("Delete?")) setMyProjects(myProjects.filter(p => p.id !== project.id)); }}
                          className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg"
                        >
                          <Trash2 size={20} />
                        </button>
                      )}
                    </div>
                    <p className="text-slate-300 leading-relaxed mb-6">{project.description}</p>
                    <div className="bg-slate-900 p-4 rounded-xl border-l-4 border-emerald-500">
                      <h4 className="flex items-center text-xs font-black uppercase text-emerald-500 tracking-widest mb-2">
                        <FileText size={14} className="mr-2" /> Technical Guide
                      </h4>
                      <p className="text-sm text-slate-400 font-mono">{project.instructions}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW: HOME */}
        {view === 'home' && (
          <div className="py-20 text-center">
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-extrabold mb-6">ECE Projects & Components</motion.h2>
            <p className="text-slate-400 text-xl mb-8">Professional electronics store for engineering students.</p>
            <button onClick={() => setView('store')} className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full font-bold transition-all">Start Shopping</button>
          </div>
        )}

        {/* VIEW: STORE */}
        {view === 'store' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map(product => (
              <div key={product.id} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500 transition-colors">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                  <p className="text-blue-400 font-mono mb-4">₹{product.price}</p>
                  <button onClick={() => addToCart(product)} className="w-full bg-slate-700 hover:bg-blue-600 py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <Plus size={18}/> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW: CART */}
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
                      <h4 className="font-bold text-white">{item.name}</h4>
                      <p className="text-blue-400 font-mono text-sm">₹{item.price}</p>
                    </div>
                    <button onClick={() => setCart(cart.filter((_, i) => i !== idx))} className="text-red-400 hover:bg-red-400/10 p-2 rounded-lg">
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
                <div className="border-t border-slate-700 pt-4 mt-8">
                  <div className="flex justify-between text-xl font-bold mb-6">
                    <span>Total:</span>
                    <span>₹{cart.reduce((s, i) => s + i.price, 0)}</span>
                  </div>
                  <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-800 mb-6 text-center">
                    <p className="text-lg font-mono">UPI: {UPI_ID}</p>
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

      <footer className="mt-20 border-t border-slate-800 p-8 text-center text-slate-500 font-mono">
        © 2026 RynjahComponent - Electronics Store
      </footer>
    </div>
  );
};

export default RynjahComponent;
