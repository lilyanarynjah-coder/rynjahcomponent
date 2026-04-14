import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  User,
  LayoutDashboard,
  LogOut,
  Package,
  Search,
  Phone,
} from "lucide-react";

export default function RynjahComponent() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [projects, setProjects] = useState([]);
  const [components, setComponents] = useState([]);
  const [search, setSearch] = useState("");

  const UPI_ID = "esterlangrynjah-1@oksbi";
  const WHATSAPP = "916033169326";

  useEffect(() => {
    setProjects(JSON.parse(localStorage.getItem("projects") || "[]"));
    setComponents(JSON.parse(localStorage.getItem("components") || "[]"));
    setOrders(JSON.parse(localStorage.getItem("orders") || "[]"));
  }, []);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("components", JSON.stringify(components));
  }, [components]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const login = () => {
    const u = prompt("Email");
    const p = prompt("Password");
    if (u === "esterlangrynjah@gmail.com" && p === "Admin@123") {
      setUser({ admin: true });
      setPage("admin");
    }
  };

  const logout = () => setUser(null);

  const addToCart = (item) => setCart([...cart, item]);

  const checkout = () => {
    const name = prompt("Name");
    const phone = prompt("Phone");

    const total = cart.reduce((a, b) => a + Number(b.price), 0);

    const order = {
      id: Date.now(),
      items: cart,
      name,
      phone,
      total,
      status: "Pending",
    };

    setOrders([...orders, order]);
    setCart([]);

    const msg = `New Order%0AName:${name}%0APhone:${phone}%0ATotal:${total}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`);

    window.open(
      `upi://pay?pa=${UPI_ID}&pn=RynjahComponent&am=${total}&cu=INR`
    );
  };

  const filtered = components.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="flex justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 w-8 h-8 rounded-lg" />
          <h1 className="text-xl font-bold">RynjahComponent</h1>
        </div>

        <div className="flex gap-4">
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("projects")}>Projects</button>
          <button onClick={() => setPage("store")}>Store</button>
          <button onClick={() => setPage("cart")}>
            <ShoppingCart /> ({cart.length})
          </button>

          {user ? (
            <>
              <button onClick={() => setPage("admin")}>
                <LayoutDashboard />
              </button>
              <button onClick={logout}>
                <LogOut />
              </button>
            </>
          ) : (
            <button onClick={login}>
              <User />
            </button>
          )}
        </div>
      </header>

      {page === "home" && (
        <div className="p-10">
          <h2 className="text-4xl font-bold">ECE Projects & Components</h2>
          <p className="text-gray-400">Professional electronics store</p>
        </div>
      )}

      {page === "store" && (
        <div className="p-8">
          <div className="flex gap-2 mb-4">
            <Search />
            <input
              className="bg-black border p-2"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {filtered.map((c) => (
              <div key={c.id} className="border p-4 rounded-xl">
                {c.image && (
                  <img src={c.image} className="h-32 w-full object-cover" />
                )}
                <h3>{c.name}</h3>
                <p>₹{c.price}</p>
                <p className="text-sm">Stock: {c.stock}</p>

                <button
                  onClick={() => addToCart(c)}
                  className="bg-blue-600 px-3 py-1 mt-2 rounded"
                >
                  Add to cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {page === "cart" && (
        <div className="p-8">
          {cart.map((c, i) => (
            <div key={i}>
              {c.name} - ₹{c.price}
            </div>
          ))}

          <button
            onClick={checkout}
            className="bg-green-600 px-4 py-2 mt-4 rounded"
          >
            Pay with UPI & WhatsApp
          </button>
        </div>
      )}

      {page === "admin" && user && (
        <div className="p-8">
          <h2>Orders</h2>
          {orders.map((o) => (
            <div key={o.id} className="border-b py-2">
              {o.name} - ₹{o.total} - {o.status}
            </div>
          ))}
        </div>
      )}

      <a
        href={`https://wa.me/${WHATSAPP}`}
        className="fixed bottom-5 right-5 bg-green-600 p-4 rounded-full"
      >
        <Phone />
      </a>
    </div>
  );
}
