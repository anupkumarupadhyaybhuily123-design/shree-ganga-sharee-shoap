"use client";
import React, { useState } from 'react';
import { PRODUCTS as initialProducts } from '@/lib/dummy-data';
import { Package, Plus, Edit, Trash2, LayoutDashboard, Settings, ShoppingBag, Users, Lock, Mail, ArrowRight, LogOut, Search, X } from 'lucide-react';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // PRODUCT MANAGEMENT STATE
  const [products, setProducts] = useState(initialProducts);
  const [mounted, setMounted] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', category: 'Saree', priceMin: '', priceMax: '', image: '' });

  // Save/Load products
  React.useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('shree_ganga_products');
    if (saved) {
      try {
        setProducts(JSON.parse(saved));
      } catch (e) {
        console.error("Storage error", e);
      }
    }
  }, []);

  React.useEffect(() => {
    if (mounted) {
      localStorage.setItem('shree_ganga_products', JSON.stringify(products));
    }
  }, [products, mounted]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        setIsLoggedIn(true);
        setError('');
      } else {
        setError(data.message || 'Access Denied');
      }
    } catch (err) {
      setError('Connection error.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const product = {
      id: products.length + 1,
      name: newProduct.name,
      category: newProduct.category,
      priceRange: '\u20b9' + Number(newProduct.priceMin).toLocaleString() + ' \u2013 \u20b9' + Number(newProduct.priceMax).toLocaleString(),
      price: Number(newProduct.priceMin),
      image: newProduct.image || "https://images.unsplash.com/photo-1610030469983-98e550d6193c"
    };
    setProducts([product, ...products]);
    setIsModalOpen(false);
    setNewProduct({ name: '', category: 'Saree', priceMin: '', priceMax: '', image: '' });
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  }

  const getDisplayPrice = (p: any) => {
    if (p.priceRange) return p.priceRange;
    if (p.price) return '\u20b9' + p.price.toLocaleString();
    return 'N/A';
  };

  if (!isLoggedIn) {
    return (
      <div className="boutique-login">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:wght@300;600&display=swap');
          .boutique-login { min-height: 100vh; background: #fdfaf3; display: flex; align-items: center; justify-content: center; font-family: 'Cormorant Garamond', serif; padding: 20px; }
          .login-card { background: #fff; width: 450px; padding: 60px 48px; box-shadow: 0 30px 60px rgba(93,12,12,0.1); border: 1px solid #e5d5b5; text-align: center; border-radius: 2px; }
          .brand-logo { margin-bottom: 40px; }
          .om-text { font-family: 'Cinzel', serif; font-size: 10px; color: #8B6914; letter-spacing: 4px; }
          .brand-name { font-family: 'Cinzel Decorative', serif; font-size: 32px; font-weight: 700; color: #5d0c0c; letter-spacing: 4px; margin: 4px 0; }
          .brand-sub { font-family: 'Cinzel', serif; font-size: 12px; color: #8B6914; letter-spacing: 4px; text-transform: uppercase; }
          .luxury-input { width: 100%; margin-bottom: 30px; text-align: left; }
          .luxury-input label { display: block; font-size: 11px; text-transform: uppercase; color: #8B6914; letter-spacing: 2px; margin-bottom: 8px; font-weight: 600; }
          .luxury-input input { width: 100%; border: none; border-bottom: 1px solid #e5d5b5; padding: 10px 0; font-size: 18px; outline: none; font-family: inherit; color: #5d0c0c; background: transparent; transition: border-color 0.3s; }
          .luxury-input input:focus { border-bottom-color: #5d0c0c; }
          .luxury-btn { background: #5d0c0c; color: #fdfaf3; width: 100%; height: 54px; border: none; font-size: 14px; font-weight: 700; letter-spacing: 3px; cursor: pointer; margin-top: 20px; transition: all 0.3s; text-transform: uppercase; }
          .luxury-btn:hover { background: #8B6914; transform: scale(1.02); }
          .error-msg { margin-top: 20px; color: #5d0c0c; font-size: 14px; font-style: italic; }
          .back-home { margin-top: 40px; display: block; color: #8B6914; text-decoration: none; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; }
        `}</style>
        <div className="login-card">
          <div className="brand-logo">
            <div className="om-text">{'\u0965'} {'\u0950'} {'\u0965'}</div>
            <h1 className="brand-name">SHREE GANGA</h1>
            <div className="brand-sub">Grand Studio</div>
          </div>
          <form onSubmit={handleLogin}>
            <div className="luxury-input">
              <label>Studio Identity</label>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
            </div>
            <div className="luxury-input">
              <label>Master Signature</label>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
            </div>
            {error && <div className="error-msg">{error}</div>}
            <button type="submit" className="luxury-btn" disabled={loading}>{loading ? 'Verifying...' : 'Authenticate'}</button>
          </form>
          <a href="/" className="back-home">Back To Boutique</a>
        </div>
      </div>
    );
  }

  return (
    <div className="luxury-dashboard">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:wght@300;600&display=swap');
        .luxury-dashboard { display: flex; min-height: 100vh; font-family: 'Cormorant Garamond', serif; background: #fff; }
        .lux-sidebar { width: 280px; background: #5d0c0c; color: #fdfaf3; display: flex; flex-direction: column; padding: 40px 0; }
        .lux-logo { padding: 0 40px 40px; border-bottom: 1px solid rgba(240,212,122,0.1); margin-bottom: 40px; }
        .lux-logo h2 { font-family: 'Cinzel', serif; font-size: 20px; letter-spacing: 3px; color: #f0d47a; }
        .lux-nav-item { display: flex; align-items: center; gap: 15px; padding: 15px 40px; color: #fdfaf3; text-decoration: none; font-size: 16px; opacity: 0.7; transition: 0.3s; background: transparent; border: none; width: 100%; cursor: pointer; font-family: inherit; }
        .lux-nav-item:hover, .lux-nav-item.active { opacity: 1; background: rgba(240,212,122,0.05); color: #f0d47a; }
        .main-lux { flex: 1; padding: 60px 80px; background: #fdfaf3; max-width: calc(100vw - 280px); overflow-x: hidden; }
        .admin-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 60px; border-bottom: 1px solid #e5d5b5; padding-bottom: 20px; }
        .admin-header h1 { font-family: 'Playfair Display', serif; font-size: 42px; color: #5d0c0c; font-style: italic; }
        .add-lux-btn { background: #5d0c0c; color: #fdfaf3; border: none; padding: 15px 35px; font-size: 13px; font-weight: 700; letter-spacing: 2px; cursor: pointer; display: flex; align-items: center; gap: 10px; text-transform: uppercase; transition: 0.3s; }
        .add-lux-btn:hover { background: #8B6914; }
        .grid-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px; margin-bottom: 60px; }
        .stat-lux { background: #fff; padding: 30px; border: 1px solid #e5d5b5; }
        .stat-lux span { font-size: 12px; text-transform: uppercase; color: #8B6914; letter-spacing: 2px; }
        .stat-lux h3 { font-size: 32px; color: #5d0c0c; margin-top: 10px; font-weight: 400; }
        .lux-table { width: 100%; border-collapse: collapse; background: #fff; border: 1px solid #e5d5b5; border-radius: 4px; overflow: hidden; }
        .lux-table th { text-align: left; padding: 20px 30px; background: #5d0c0c; color: #fdfaf3; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; }
        .lux-table td { padding: 25px 30px; border-bottom: 1px solid #fdf2d9; color: #2c1810; font-size: 16px; }
        .prod-cell { display: flex; align-items: center; gap: 20px; }
        .prod-cell img { width: 50px; height: 65px; object-fit: cover; }
        .logout-btn { margin-top: auto; padding: 20px 40px; color: #f0d47a; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; background: transparent; border: none; cursor: pointer; text-align: left; display: flex; align-items: center; gap: 10px; }

        /* MODAL STYLES */
        .lux-modal-overlay { position: fixed; inset: 0; background: rgba(93,12,12,0.4); backdrop-filter: blur(5px); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .lux-modal { background: #fff; width: 500px; padding: 40px; border: 1px solid #e5d5b5; box-shadow: 0 40px 80px rgba(0,0,0,0.2); position: relative; }
        .close-btn { position: absolute; top: 20px; right: 20px; cursor: pointer; color: #5d0c0c; }
        .modal-h2 { font-family: 'Playfair Display', serif; font-size: 32px; color: #5d0c0c; margin-bottom: 30px; text-align: center; font-style: italic; }
        .form-row { margin-bottom: 20px; }
        .form-row label { display: block; font-size: 11px; text-transform: uppercase; color: #8B6914; letter-spacing: 2px; margin-bottom: 6px; }
        .form-row input, .form-row select { width: 100%; border: 1px solid #e5d5b5; padding: 12px; font-size: 16px; font-family: inherit; outline: none; }
        .form-row input:focus { border-color: #5d0c0c; }
        .submit-lux { background: #5d0c0c; color: #fdfaf3; width: 100%; padding: 15px; border: none; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; cursor: pointer; margin-top: 10px; }
      `}</style>
      
      <aside className="lux-sidebar">
        <div className="lux-logo">
           <h2>SHREE GANGA</h2>
           <p style={{fontSize: 10, letterSpacing: 2, marginTop: 5}}>Management Studio</p>
        </div>
        <div className="lux-nav">
           <button className="lux-nav-item active"><LayoutDashboard size={18} /> Collection Overview</button>
           <button className="lux-nav-item"><Package size={18} /> Inventory List</button>
           <button className="lux-nav-item"><ShoppingBag size={18} /> Direct Orders</button>
           <button className="lux-nav-item"><Users size={18} /> Exclusive Clients</button>
        </div>
        <button onClick={() => setIsLoggedIn(false)} className="logout-btn"><LogOut size={18} /> Sign Out</button>
      </aside>

      <main className="main-lux">
        <div className="admin-header">
           <h1>Studio Manager</h1>
           <button className="add-lux-btn" onClick={() => setIsModalOpen(true)}><Plus size={18} /> Add New Creation</button>
        </div>

        <div className="grid-stats">
           <div className="stat-lux"><span>Monthly Revenue</span><h3>{'\u20b9'}12,48,000</h3></div>
           <div className="stat-lux"><span>Active Orders</span><h3>{products.length * 3}</h3></div>
           <div className="stat-lux"><span>Stock Items</span><h3>{products.length}</h3></div>
           <div className="stat-lux"><span>Exclusive Members</span><h3>1.2K</h3></div>
        </div>

        <table className="lux-table">
           <thead>
             <tr>
               <th>Creations</th>
               <th>Heritage Category</th>
               <th>Price Range</th>
               <th>Availability</th>
               <th>Actions</th>
             </tr>
           </thead>
           <tbody>
             {products.map(p => (
               <tr key={p.id}>
                 <td>
                   <div className="prod-cell">
                     <img src={p.image} alt="" />
                     <div style={{fontFamily: 'Playfair Display', fontSize: 18}}>{p.name}</div>
                   </div>
                 </td>
                 <td style={{fontSize: 14, textTransform: 'uppercase', letterSpacing: 1}}>{p.category}</td>
                 <td style={{fontWeight: 700}}>{getDisplayPrice(p)}</td>
                 <td><span style={{color: '#8B6914', fontSize: 13, textTransform: 'uppercase'}}>Artisan Crafted</span></td>
                 <td>
                   <div style={{display: 'flex', gap: 15, color: '#8B6914'}}>
                      <Edit size={18} style={{cursor: 'pointer'}} />
                      <Trash2 size={18} style={{cursor: 'pointer', color: '#ff4d4d'}} onClick={() => deleteProduct(p.id)} />
                   </div>
                 </td>
               </tr>
             ))}
           </tbody>
        </table>
      </main>

      {/* ADD PRODUCT MODAL */}
      {isModalOpen && (
        <div className="lux-modal-overlay">
          <div className="lux-modal">
            <X className="close-btn" onClick={() => setIsModalOpen(false)} />
            <h2 className="modal-h2">New Creation</h2>
            <form onSubmit={handleAddProduct}>
              <div className="form-row">
                <label>Product Name</label>
                <input type="text" placeholder="e.g. Royal Silk Saree" required value={newProduct.name} onChange={e=>setNewProduct({...newProduct, name: e.target.value})} />
              </div>
              <div className="form-row">
                <label>Heritage Category</label>
                <select value={newProduct.category} onChange={e=>setNewProduct({...newProduct, category: e.target.value})}>
                  <option>Saree</option>
                  <option>Kurti</option>
                  <option>Mens Wear</option>
                  <option>Accessories</option>
                </select>
              </div>
              <div className="form-row">
                <label>Price Range ({'\u20b9'})</label>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <input type="number" placeholder="Min (e.g. 500)" required value={newProduct.priceMin} onChange={e=>setNewProduct({...newProduct, priceMin: e.target.value})} style={{ flex: 1 }} />
                  <span style={{ color: '#8B6914', fontWeight: 700, fontSize: '18px' }}>{'\u2013'}</span>
                  <input type="number" placeholder="Max (e.g. 1000)" required value={newProduct.priceMax} onChange={e=>setNewProduct({...newProduct, priceMax: e.target.value})} style={{ flex: 1 }} />
                </div>
              </div>
              <div className="form-row">
                <label>Image URL</label>
                <input type="text" placeholder="https://unsplash.com/..." value={newProduct.image} onChange={e=>setNewProduct({...newProduct, image: e.target.value})} />
              </div>
              <button type="submit" className="submit-lux">Register Creation</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
