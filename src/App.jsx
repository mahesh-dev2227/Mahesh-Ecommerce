import { useState, useEffect, useRef } from "react";
import "./App.css";
import { PRODUCTS, CATEGORIES, SORT_OPTIONS, BADGE_COLORS } from "./utils.js";

function StarRating({ rating }) {
  return (
    <span style={{ color: "#e8b84b", fontSize: "12px", letterSpacing: "1px" }}>
      {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
    </span>
  );
}

function Toast({ message, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, []);
  return (
    <div style={{
      position: "fixed", bottom: "32px", left: "50%", transform: "translateX(-50%)",
      background: "#1a1a1a", color: "#fff", padding: "12px 24px", borderRadius: "100px",
      fontSize: "14px", fontFamily: "'DM Mono', monospace", zIndex: 9999,
      boxShadow: "0 8px 32px rgba(0,0,0,0.3)", animation: "fadeup 0.3s ease",
      whiteSpace: "nowrap"
    }}>
      {message}
    </div>
  );
}

export default function ShopLux() {
  const productsRef = useRef(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Featured");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState(null);
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", address: "", card: "" });
  const [orderDone, setOrderDone] = useState(false);

  const filtered = PRODUCTS
    .filter(p =>
      (category === "All" || p.category === category) &&
      (search === "" || p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      if (sort === "Price: Low to High") return a.price - b.price;
      if (sort === "Price: High to Low") return b.price - a.price;
      if (sort === "Highest Rated") return b.rating - a.rating;
      if (sort === "Most Reviewed") return b.reviews - a.reviews;
      return 0;
    });

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const addToCart = (product) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    setToast(`${product.name} added to cart`);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const updateQty = (id, delta) => setCart(prev =>
    prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
  );
  const toggleWishlist = (id) => setWishlist(prev =>
    prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
  );

  const placeOrder = () => {
    if (!form.name || !form.email || !form.address || !form.card) return;
    setOrderDone(true);
    setCart([]);
    setCheckoutStep(0);
  };

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", minHeight: "100vh", background: "#f8f6f2", color: "#1a1a1a" }}>

      {/* HEADER */}
      <header style={{ background: "#1a1a1a", color: "#f8f6f2", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 20px rgba(0,0,0,0.2)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "22px", fontFamily: "'Playfair Display', serif", fontWeight: 600, letterSpacing: "1px", color: "#e8d5b7" }}>Mahi</span>
          <span style={{ fontSize: "11px", color: "#888", letterSpacing: "3px", marginTop: "2px" }}>STUDIO</span>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <span style={{ position: "absolute", left: "12px", color: "#888", fontSize: "14px" }}>🔍</span>
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              style={{ background: "#2a2a2a", border: "none", borderRadius: "100px", padding: "8px 16px 8px 36px", color: "#f8f6f2", fontSize: "13px", width: "220px", fontFamily: "inherit" }}
            />
          </div>
          <button onClick={() => setWishlist([])} style={{ background: "none", border: "none", color: "#f8f6f2", cursor: "pointer", fontSize: "20px", padding: "4px 8px" }} title="Wishlist">
            ♡ {wishlist.length > 0 && <span style={{ fontSize: "11px", background: "#e8b84b", color: "#1a1a1a", borderRadius: "50%", padding: "1px 5px", marginLeft: "2px" }}>{wishlist.length}</span>}
          </button>
          <button onClick={() => { setCartOpen(true); setOrderDone(false); }} style={{ background: "#e8d5b7", border: "none", borderRadius: "100px", padding: "8px 20px", cursor: "pointer", fontFamily: "inherit", fontWeight: 500, fontSize: "13px", color: "#1a1a1a", display: "flex", alignItems: "center", gap: "8px" }}>
            🛒 Cart {cartCount > 0 && <span style={{ background: "#1a1a1a", color: "#e8d5b7", borderRadius: "50%", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px" }}>{cartCount}</span>}
          </button>
        </div>
      </header>

      {/* HERO */}
      <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #2d1b3d 50%, #1a2e1a 100%)", color: "#f8f6f2", padding: "72px 32px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "radial-gradient(circle at 20% 80%, rgba(232,184,75,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(168,230,207,0.08) 0%, transparent 50%)" }} />
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", letterSpacing: "4px", color: "#e8b84b", marginBottom: "16px", textTransform: "uppercase" }}>Spring / Summer 2026</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 600, lineHeight: 1.1, marginBottom: "20px" }}>
          Curated for the<br /><span style={{ color: "#e8d5b7" }}>Discerning Few</span>
        </h1>
        <p style={{ color: "#aaa", fontSize: "16px", maxWidth: "400px", margin: "0 auto 32px", lineHeight: 1.6 }}>Timeless pieces crafted with intention. Every detail considered, every material sourced.</p>
        <button onClick={() => productsRef.current?.scrollIntoView({ behavior: "smooth" })}
          style={{ background: "#e8d5b7", color: "#1a1a1a", border: "none", borderRadius: "100px", padding: "14px 36px", fontFamily: "inherit", fontWeight: 600, fontSize: "14px", cursor: "pointer", letterSpacing: "0.5px" }}>
          Explore Collection →
        </button>
      </div>

      {/* FILTERS */}
      <div style={{ background: "#fff", borderBottom: "1px solid #eee", padding: "16px 32px", display: "flex", alignItems: "center", gap: "12px", overflowX: "auto", flexWrap: "wrap" }}>
        {CATEGORIES.map(cat => (
          <button key={cat} className="cat-btn" onClick={() => setCategory(cat)}
            style={{ padding: "8px 20px", borderRadius: "100px", border: `1.5px solid ${category === cat ? "#1a1a1a" : "#ddd"}`, background: category === cat ? "#1a1a1a" : "transparent", color: category === cat ? "#fff" : "#555", cursor: "pointer", fontFamily: "inherit", fontSize: "13px", fontWeight: 500, whiteSpace: "nowrap", transition: "all 0.2s" }}>
            {cat}
          </button>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "12px", color: "#888" }}>Sort:</span>
          <select value={sort} onChange={e => setSort(e.target.value)}
            style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "6px 12px", fontFamily: "inherit", fontSize: "13px", cursor: "pointer", background: "#fff" }}>
            {SORT_OPTIONS.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* PRODUCTS */}
      <div ref={productsRef} id="products" style={{ padding: "40px 32px" }}>
        <div style={{ marginBottom: "24px", display: "flex", alignItems: "baseline", gap: "12px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", fontWeight: 500 }}>
            {category === "All" ? "All Products" : category}
          </h2>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: "#888" }}>{filtered.length} items</span>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#888" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
            <p style={{ fontSize: "18px" }}>No products found for "{search}"</p>
            <button onClick={() => { setSearch(""); setCategory("All"); }} style={{ marginTop: "16px", background: "#1a1a1a", color: "#fff", border: "none", borderRadius: "100px", padding: "10px 24px", cursor: "pointer", fontFamily: "inherit" }}>Clear Filters</button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "24px" }}>
            {filtered.map((product, i) => (
              <div key={product.id} className="product-card" style={{ animationDelay: `${i * 0.05}s`, background: "#fff", borderRadius: "16px", overflow: "hidden", border: "1px solid #eee", transition: "box-shadow 0.2s", cursor: "default" }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.1)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                <div style={{ background: "#f4f0ea", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", height: "220px" }}>
                  <img
                    className="card-img"
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease", display: "block" }}
                  />
                  <div style={{ display: "none", position: "absolute", inset: 0, alignItems: "center", justifyContent: "center", background: "#f0ede6", fontSize: "48px" }}>🛍️</div>
                  {product.badge && (
                    <span style={{ position: "absolute", top: "12px", left: "12px", background: BADGE_COLORS[product.badge].bg, color: BADGE_COLORS[product.badge].color, fontSize: "10px", fontFamily: "'DM Mono', monospace", letterSpacing: "1px", padding: "4px 10px", borderRadius: "100px" }}>
                      {product.badge.toUpperCase()}
                    </span>
                  )}
                  <button onClick={() => toggleWishlist(product.id)}
                    style={{ position: "absolute", top: "12px", right: "12px", background: "#fff", border: "none", borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                    {wishlist.includes(product.id) ? "♥" : "♡"}
                  </button>
                </div>
                <div style={{ padding: "20px" }}>
                  <p style={{ fontSize: "11px", color: "#888", fontFamily: "'DM Mono', monospace", letterSpacing: "1px", marginBottom: "6px", textTransform: "uppercase" }}>{product.category}</p>
                  <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "6px", fontFamily: "'Playfair Display', serif" }}>{product.name}</h3>
                  <p style={{ fontSize: "12px", color: "#888", marginBottom: "12px", lineHeight: 1.5 }}>{product.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "16px" }}>
                    <StarRating rating={product.rating} />
                    <span style={{ fontSize: "12px", color: "#aaa" }}>({product.reviews})</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "20px", fontWeight: 600, fontFamily: "'DM Mono', monospace" }}>${product.price}</span>
                    <button className="add-btn" onClick={() => addToCart(product)}
                      style={{ background: "#f4f0ea", border: "1.5px solid #1a1a1a", borderRadius: "100px", padding: "8px 18px", cursor: "pointer", fontFamily: "inherit", fontSize: "13px", fontWeight: 500, transition: "all 0.2s", color: "#1a1a1a" }}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#111", color: "#888", marginTop: "60px" }}>
        <div style={{ padding: "56px 32px 40px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "40px", borderBottom: "1px solid #222" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 600, color: "#e8d5b7", letterSpacing: "1px" }}>LÜXE</span>
              <span style={{ fontSize: "10px", color: "#555", letterSpacing: "3px" }}>STUDIO</span>
            </div>
            <p style={{ fontSize: "13px", lineHeight: 1.7, color: "#666", maxWidth: "220px" }}>Curated luxury for the discerning few. Every piece selected with intention.</p>
            <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
              {["𝕏", "IG", "FB", "TK"].map(s => (
                <span key={s} style={{ width: "32px", height: "32px", border: "1px solid #333", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", color: "#666", cursor: "pointer", fontFamily: "'DM Mono', monospace" }}>{s}</span>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize: "11px", fontFamily: "'DM Mono', monospace", letterSpacing: "2px", color: "#e8d5b7", marginBottom: "16px" }}>SHOP</p>
            {["New Arrivals", "Bestsellers", "Watches", "Bags & Leather", "Footwear", "Clothing", "Accessories"].map(l => (
              <p key={l} style={{ fontSize: "13px", color: "#666", marginBottom: "10px", cursor: "pointer" }}
                onMouseEnter={e => e.target.style.color = "#e8d5b7"} onMouseLeave={e => e.target.style.color = "#666"}>{l}</p>
            ))}
          </div>
          <div>
            <p style={{ fontSize: "11px", fontFamily: "'DM Mono', monospace", letterSpacing: "2px", color: "#e8d5b7", marginBottom: "16px" }}>HELP</p>
            {["Shipping & Returns", "Size Guide", "Track Your Order", "FAQs", "Contact Us", "Store Locator"].map(l => (
              <p key={l} style={{ fontSize: "13px", color: "#666", marginBottom: "10px", cursor: "pointer" }}
                onMouseEnter={e => e.target.style.color = "#e8d5b7"} onMouseLeave={e => e.target.style.color = "#666"}>{l}</p>
            ))}
          </div>
          <div>
            <p style={{ fontSize: "11px", fontFamily: "'DM Mono', monospace", letterSpacing: "2px", color: "#e8d5b7", marginBottom: "16px" }}>NEWSLETTER</p>
            <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.6, marginBottom: "16px" }}>Be first to know about new arrivals, exclusive offers, and curated edits.</p>
            <div style={{ display: "flex", gap: "8px" }}>
              <input placeholder="Your email" style={{ flex: 1, background: "#1a1a1a", border: "1px solid #333", borderRadius: "8px", padding: "10px 14px", color: "#f8f6f2", fontSize: "13px", fontFamily: "inherit" }} />
              <button style={{ background: "#e8d5b7", color: "#1a1a1a", border: "none", borderRadius: "8px", padding: "10px 16px", cursor: "pointer", fontFamily: "inherit", fontWeight: 600, fontSize: "13px", whiteSpace: "nowrap" }}>Join →</button>
            </div>
            <div style={{ marginTop: "20px" }}>
              <p style={{ fontSize: "11px", fontFamily: "'DM Mono', monospace", letterSpacing: "2px", color: "#e8d5b7", marginBottom: "12px" }}>WE ACCEPT</p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {["VISA", "MC", "AMEX", "PAYPAL", "APPLE PAY"].map(p => (
                  <span key={p} style={{ border: "1px solid #333", borderRadius: "5px", padding: "4px 8px", fontSize: "10px", fontFamily: "'DM Mono', monospace", color: "#555" }}>{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: "24px 32px", display: "flex", gap: "32px", flexWrap: "wrap", justifyContent: "center", borderBottom: "1px solid #1a1a1a" }}>
          {[["🚚", "Free Shipping", "On orders over $200"],
            ["↩", "30-Day Returns", "Hassle-free returns"],
            ["🔒", "Secure Payment", "256-bit SSL encryption"],
            ["✦", "Authenticity", "100% genuine products"]].map(([icon, title, sub]) => (
            <div key={title} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "20px" }}>{icon}</span>
              <div>
                <p style={{ fontSize: "13px", fontWeight: 500, color: "#aaa" }}>{title}</p>
                <p style={{ fontSize: "11px", color: "#555" }}>{sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ padding: "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ fontSize: "12px", color: "#444", fontFamily: "'DM Mono', monospace" }}>
            © {new Date().getFullYear()} Lüxe Studio. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"].map(l => (
              <span key={l} style={{ fontSize: "11px", color: "#444", cursor: "pointer", fontFamily: "'DM Mono', monospace" }}
                onMouseEnter={e => e.target.style.color = "#888"} onMouseLeave={e => e.target.style.color = "#444"}>{l}</span>
            ))}
          </div>
          <p style={{ fontSize: "11px", color: "#333", fontFamily: "'DM Mono', monospace" }}>Made with ♥ by Lüxe Studio</p>
        </div>
      </footer>

      {/* CART DRAWER */}
      {cartOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1000 }}>
          <div onClick={() => setCartOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(2px)" }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "min(480px, 100vw)", background: "#fff", animation: "slidein 0.3s ease", display: "flex", flexDirection: "column", boxShadow: "-8px 0 40px rgba(0,0,0,0.15)" }}>
            <div style={{ padding: "24px", borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#1a1a1a", color: "#f8f6f2" }}>
              <div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 500, color: "#e8d5b7" }}>{checkoutStep === 0 ? "Your Cart" : checkoutStep === 1 ? "Checkout" : "Order Confirmed"}</h2>
                {checkoutStep === 0 && <p style={{ fontSize: "12px", color: "#888", marginTop: "2px" }}>{cartCount} {cartCount === 1 ? "item" : "items"}</p>}
              </div>
              <button onClick={() => { setCartOpen(false); setCheckoutStep(0); }} style={{ background: "none", border: "none", color: "#888", fontSize: "22px", cursor: "pointer" }}>✕</button>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
              {orderDone ? (
                <div style={{ textAlign: "center", padding: "60px 20px" }}>
                  <div style={{ fontSize: "56px", marginBottom: "16px" }}>🎉</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", marginBottom: "8px" }}>Order Placed!</h3>
                  <p style={{ color: "#888", fontSize: "14px", lineHeight: 1.6 }}>Thank you, {form.name}! Your order has been confirmed and will arrive in 3–5 business days.</p>
                  <button onClick={() => { setCartOpen(false); setOrderDone(false); setForm({ name: "", email: "", address: "", card: "" }); }}
                    style={{ marginTop: "24px", background: "#1a1a1a", color: "#fff", border: "none", borderRadius: "100px", padding: "12px 28px", cursor: "pointer", fontFamily: "inherit", fontWeight: 500 }}>
                    Continue Shopping
                  </button>
                </div>
              ) : checkoutStep === 0 ? (
                cart.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "60px 20px", color: "#aaa" }}>
                    <div style={{ fontSize: "48px", marginBottom: "16px" }}>🛒</div>
                    <p style={{ fontSize: "16px" }}>Your cart is empty</p>
                    <button onClick={() => setCartOpen(false)} style={{ marginTop: "16px", background: "#1a1a1a", color: "#fff", border: "none", borderRadius: "100px", padding: "10px 24px", cursor: "pointer", fontFamily: "inherit" }}>Browse Products</button>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {cart.map(item => (
                      <div key={item.id} style={{ display: "flex", gap: "14px", padding: "16px", background: "#f8f6f2", borderRadius: "12px", alignItems: "center" }}>
                        <img src={item.image} alt={item.name} style={{ width: "64px", height: "64px", objectFit: "cover", borderRadius: "10px", flexShrink: 0 }} />
                        <div style={{ flex: 1 }}>
                          <p style={{ fontWeight: 600, fontSize: "14px", fontFamily: "'Playfair Display', serif" }}>{item.name}</p>
                          <p style={{ fontSize: "12px", color: "#888" }}>{item.category}</p>
                          <p style={{ fontSize: "15px", fontWeight: 600, fontFamily: "'DM Mono', monospace", marginTop: "4px" }}>${item.price}</p>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#fff", borderRadius: "100px", padding: "4px 10px", border: "1px solid #ddd" }}>
                            <button onClick={() => updateQty(item.id, -1)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px", color: "#555", lineHeight: 1 }}>−</button>
                            <span style={{ fontSize: "14px", fontFamily: "'DM Mono', monospace", minWidth: "16px", textAlign: "center" }}>{item.qty}</span>
                            <button onClick={() => updateQty(item.id, 1)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px", color: "#555", lineHeight: 1 }}>+</button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} style={{ background: "none", border: "none", fontSize: "11px", color: "#e74c3c", cursor: "pointer", fontFamily: "inherit" }}>Remove</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <p style={{ fontSize: "13px", color: "#888", fontFamily: "'DM Mono', monospace", letterSpacing: "1px" }}>SHIPPING DETAILS</p>
                  {[["Full Name", "name", "text", "Jane Doe"],
                    ["Email Address", "email", "email", "jane@example.com"],
                    ["Delivery Address", "address", "text", "123 Main St, City, Country"],
                    ["Card Number", "card", "text", "•••• •••• •••• ••••"]
                  ].map(([label, key, type, ph]) => (
                    <div key={key}>
                      <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "6px" }}>{label}</label>
                      <input type={type} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} placeholder={ph}
                        style={{ width: "100%", padding: "12px 16px", border: "1.5px solid #ddd", borderRadius: "10px", fontFamily: "inherit", fontSize: "14px" }} />
                    </div>
                  ))}
                  <div style={{ background: "#f8f6f2", borderRadius: "12px", padding: "16px", marginTop: "8px" }}>
                    <p style={{ fontSize: "12px", color: "#888", marginBottom: "10px", fontFamily: "'DM Mono', monospace" }}>ORDER SUMMARY</p>
                    {cart.map(i => (
                      <div key={i.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "6px" }}>
                        <span>{i.name} × {i.qty}</span>
                        <span style={{ fontFamily: "'DM Mono', monospace" }}>${i.price * i.qty}</span>
                      </div>
                    ))}
                    <div style={{ borderTop: "1px solid #ddd", marginTop: "10px", paddingTop: "10px", display: "flex", justifyContent: "space-between", fontWeight: 600 }}>
                      <span>Total</span>
                      <span style={{ fontFamily: "'DM Mono', monospace" }}>${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {!orderDone && cart.length > 0 && checkoutStep === 0 && (
              <div style={{ padding: "20px 24px", borderTop: "1px solid #eee" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: 600, marginBottom: "16px" }}>
                  <span>Subtotal</span>
                  <span style={{ fontFamily: "'DM Mono', monospace" }}>${cartTotal.toFixed(2)}</span>
                </div>
                {cartTotal < 200 && <p style={{ fontSize: "12px", color: "#e8b84b", marginBottom: "12px" }}>Add ${(200 - cartTotal).toFixed(0)} more for free shipping</p>}
                <button onClick={() => setCheckoutStep(1)}
                  style={{ width: "100%", background: "#1a1a1a", color: "#e8d5b7", border: "none", borderRadius: "100px", padding: "16px", fontFamily: "inherit", fontWeight: 600, fontSize: "15px", cursor: "pointer", letterSpacing: "0.5px" }}>
                  Proceed to Checkout →
                </button>
              </div>
            )}

            {!orderDone && checkoutStep === 1 && (
              <div style={{ padding: "20px 24px", borderTop: "1px solid #eee", display: "flex", gap: "12px" }}>
                <button onClick={() => setCheckoutStep(0)} style={{ flex: 1, background: "#f4f0ea", color: "#1a1a1a", border: "1.5px solid #1a1a1a", borderRadius: "100px", padding: "14px", fontFamily: "inherit", fontWeight: 500, cursor: "pointer" }}>← Back</button>
                <button onClick={placeOrder}
                  style={{ flex: 2, background: "#1a1a1a", color: "#e8d5b7", border: "none", borderRadius: "100px", padding: "14px", fontFamily: "inherit", fontWeight: 600, fontSize: "15px", cursor: "pointer" }}>
                  Place Order · ${cartTotal.toFixed(2)}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {toast && <Toast message={`✓ ${toast}`} onDone={() => setToast(null)} />}
    </div>
  );
}