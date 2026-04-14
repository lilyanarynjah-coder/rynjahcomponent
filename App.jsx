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
  FileText           
} from 'lucide-react';
import { motion } from 'framer-motion';

const RynjahComponent = () => {
  const [view, setView] = useState('projects');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('rynjah_products');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: '8085 Microprocessor Kit', price: 2500, category: 'ECE', stock: 5, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400' },
      { id: 2, name: 'Arduino Uno R3', price: 650, category: 'ECE', stock: 12, image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400' }
    ];
  });
 const myProjects = [
  {
    id: 1,
    title: "8085 Microprocessor Setup",
    description: "Interfacing the 8255 with the 8085 kit.",
    imageUrl: "https://i.postimg.cc/example/8085.jpg", 
    instructions: "1. Connect the kit. 2. Enter Hex codes."
  },
  {
    id: 2,
    title: "Blink LED using Arduino",
    description: "Simple circuit to blink an LED every 1 second.",
    imageUrl: "https://i.postimg.cc/example/led.jpg", 
    instructions: "1. Pin 13 to LED. 2. Upload Blink Sketch."
  },
  {
    id: 3,
    title: "Bluetooth Control Car",
    description: "Arduino car controlled via HC-05 and smartphone.",
    imageUrl: "https://i.postimg.cc/example/car.jpg", 
    instructions: "1. Pair Bluetooth. 2. Use Android App to steer."
  },
  {
    id: 4,
    title: "Your New Project Name",
    description: "Describe what your project does here.",
    imageUrl: "https://link-to-your-photo.jpg", 
    instructions: "Step 1... Step 2... Step 3..."
  }
];

  const ADMIN_EMAIL = "esterlangrynjah@gmail.com";
  const ADMIN_PASS = "Admin@123";
  const UPI_ID = "esterlangrynjah-1@oksbi";
  const WHATSAPP = "916009828446";

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
    alert(`${product.name} added to cart!`);
  };
 const addProduct = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const price = Number(e.target.price.value);
    const imageUrl = e.target.imageUrl.value;
    const description = e.target.description.value; 
    
    const newProduct = {
      id: Date.now(),
      name,
      price,
      description,
      category: price > 0 ? 'Store' : 'Project',
      image: imageUrl || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400'
    };
    
    setProducts([...products, newProduct]);
    e.target.reset();
  };

  const checkout = () => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const itemNames = cart.map(i => i.name).join(', ');
    const message = `Order from RynjahComponent:%0AItems: ${itemNames}%0ATotal: ₹${total}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <nav className="border-b border-slate-800 p-4 sticky top-0 bg-slate-900/80 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            RynjahComponent
          </h1>
          <div className="flex gap-6 items-center">
            <button onClick={() => setView('home')} className="hover:text-blue-400 flex items-center gap-1"><Home size={18}/> Home</button>
            <button onClick={() => setView('store')} className="hover:text-blue-400 flex items-center gap-1"><Package size={18}/> Store</button>
            <button 
            onClick={() => setView('projects')} 
            className={`flex items-center gap-2 ${view === 'projects' ? 'text-blue-400' : 'text-slate-400'}`}
          >
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
      {/* This section handles what shows up in the Project Lab */}
{view === 'projects' && (
  <div className="p-6 max-w-4xl mx-auto">
    <h2 className="text-2xl font-bold mb-6 text-white">Engineering Project Feed</h2>
    
    <div className="grid gap-8">
      {myProjects.map((project) => (
        <div key={project.id} className="bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700">
          {/* Image Section */}
          <div className="h-64 bg-slate-900 flex items-center justify-center">
            {project.imageUrl ? (
              <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
            ) : (
              <ImageIcon size={48} className="text-slate-600" />
            )}
          </div>

          {/* Text Section */}
          <div className="p-5">
            <h3 className="text-xl font-semibold text-blue-400">{project.title}</h3>
            <p className="text-slate-300 mt-2">{project.description}</p>
            
            <div className="mt-4 p-3 bg-slate-900 rounded border-l-4 border-blue-500">
              <h4 className="flex items-center text-sm font-bold uppercase text-slate-400">
                <FileText size={14} className="mr-2" /> How to follow:
              </h4>
              <p className="text-sm text-slate-400 mt-1">{project.instructions}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

      <main className="max-w-6xl mx-auto p-6">
        {view === 'home' && (
          <div className="py-20 text-center">
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-extrabold mb-6">ECE Projects & Components</motion.h2>
            <p className="text-slate-400 text-xl mb-8">Professional electronics store for engineering students.</p>
            <button onClick={() => setView('store')} className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full font-bold transition-all">Start Shopping</button>
          </div>
        )}

        {view === 'projects' && (
          <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-white mb-8 text-center underline decoration-blue-500">ECE Project Lab</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {products.filter(p => p.price === 0).map(project => (
                <div key={project.id} className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
                  <img src={project.image} alt={project.name} className="w-full h-64 object-cover border-b border-slate-700" />
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-3">{project.name}</h3>
                    <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-700 mb-4">
                      <h4 className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">Circuit Specs & Components</h4>
                      <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-mono">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs border border-emerald-500/20 font-bold">SCHEMATIC READY</span>
                      <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs border border-blue-500/20">EDUCATIONAL</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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

        {view === 'admin' && isLoggedIn && (
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><LayoutDashboard /> Admin Dashboard</h2>
           <form onSubmit={addProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <input name="name" placeholder="Project or Component Name" className="bg-slate-900 p-3 rounded-lg border border-slate-700 text-white" required />
              <input name="price" type="number" placeholder="Price (₹0 for projects)" className="bg-slate-900 p-3 rounded-lg border border-slate-700 text-white" />
              <input name="imageUrl" placeholder="Image URL (Link to photo)" className="bg-slate-900 p-3 rounded-lg border border-slate-700 text-white" />
              <textarea name="description" placeholder="Project details (e.g. 8085 Assembly logic, sensors used...)" className="bg-slate-900 p-3 rounded-lg border border-slate-700 text-white md:col-span-2" rows="3"></textarea>
              <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 rounded-lg font-bold py-3 md:col-span-2">Post to Website</button>
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
                      <h4 className="font-bold text-white">{item.name}</h4>
                      <p className="text-blue-400 font-mono text-sm">₹{item.price}</p>
                    </div>
                    {/* This is the new Cancel button */}
                    <button 
                      onClick={() => setCart(cart.filter((_, i) => i !== idx))}
                      className="text-red-400 hover:text-red-300 p-2 hover:bg-red-400/10 rounded-lg transition-colors"
                    >
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
                    <p className="text-sm text-blue-300 mb-2 font-bold uppercase tracking-wider">Payment Details</p>
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
