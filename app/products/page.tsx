"use client";
import React, { useState, useEffect } from 'react';
import { PRODUCTS as initialProducts, CATEGORIES } from '@/lib/dummy-data';
import ProductCard from '@/components/ProductCard';
import { SlidersHorizontal, ChevronDown, LayoutGrid, List, Search } from 'lucide-react';

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [priceRange, setPriceRange] = useState(10000);
  const [products, setProducts] = useState<any[]>(initialProducts);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
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

  const filteredProducts = products.filter(p => 
    (activeCategory === 'all' || p.category.toLowerCase() === activeCategory.toLowerCase()) && 
    p.price <= priceRange
  );

  if (!mounted) return <div style={{minHeight: '100vh', background: '#fdfaf3'}} />;

  return (
    <div className="heritage-products">
      <style>{`
        .heritage-products { background: #fdfaf3; min-height: 100vh; padding: 160px 40px 100px; font-family: 'Cormorant Garamond', serif; }
        .products-container { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 280px 1fr; gap: 60px; }
        
        .filters-aside { position: sticky; top: 140px; height: fit-content; }
        .filter-h3 { font-family: 'Cinzel', serif; font-size: 14px; color: #5d0c0c; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 30px; border-bottom: 1px solid #e5d5b5; padding-bottom: 10px; }
        
        .cat-list { display: flex; flex-direction: column; gap: 15px; }
        .cat-btn { background: transparent; border: none; text-align: left; font-size: 16px; color: #8B6914; cursor: pointer; transition: 0.3s; display: flex; justify-content: space-between; align-items: center; }
        .cat-btn:hover, .cat-btn.active { color: #5d0c0c; transform: translateX(5px); font-weight: 600; }
        .cat-count { font-size: 11px; opacity: 0.6; font-family: 'Cinzel', serif; }
        
        .price-filter { margin-top: 50px; }
        .price-label { font-size: 14px; color: #5d0c0c; font-weight: 600; margin-bottom: 20px; display: block; text-transform: uppercase; letter-spacing: 1px; }
        
        .results-header { margin-bottom: 60px; display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 1px solid #e5d5b5; padding-bottom: 30px; }
        .results-header h1 { font-family: 'Playfair Display', serif; font-size: 48px; color: #5d0c0c; font-style: italic; }
        .results-count { font-size: 14px; color: #8B6914; text-transform: uppercase; letter-spacing: 2px; }
        
        .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 40px; }
      `}</style>

      <div className="products-container">
        <aside className="filters-aside">
          <h3 className="filter-h3">Curation Filter</h3>
          
          <div className="cat-list">
            <button 
              className={`cat-btn ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              <span>The Full Collection</span>
              <span className="cat-count">{products.length}</span>
            </button>
            {CATEGORIES.map(cat => (
              <button 
                key={cat.id} 
                className={`cat-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span>{cat.name} Heritage</span>
                <span className="cat-count">{products.filter(p => p.category === cat.id).length}</span>
              </button>
            ))}
          </div>

          <div className="price-filter">
             <label className="price-label">Investment Range</label>
             <input 
                type="range" 
                min="500" 
                max="50000" 
                step="500"
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                className="w-full h-1 bg-[#e5d5b5] rounded-lg appearance-none cursor-pointer accent-[#5d0c0c]"
              />
              <div className="flex justify-between mt-4 text-xs font-bold text-[#8B6914] uppercase tracking-widest">
                <span>₹500</span>
                <span>Up to ₹{priceRange.toLocaleString()}</span>
              </div>
          </div>

          <div className="mt-12 p-8 border border-[#e5d5b5] bg-white text-center">
             <h4 className="font-cinzel text-[10px] tracking-[3px] text-[#8B6914] mb-4">Bespoke Service</h4>
             <p className="text-sm italic text-[#5d0c0c] mb-6">Can&apos;t find your dream creation? Connect with our master designers.</p>
             <button className="text-[11px] font-bold uppercase tracking-widest border-b border-[#5d0c0c] pb-1 text-[#5d0c0c]">Inquire Now</button>
          </div>
        </aside>

        <main className="products-main">
          <div className="results-header">
            <div>
              <span className="results-count">Artisan Creations</span>
              <h1>{activeCategory === 'all' ? 'Grand Heritage' : activeCategory} Collection</h1>
            </div>
            <div className="flex items-center gap-6">
               <div className="flex border border-[#e5d5b5] p-1 bg-white">
                  <button className="p-2 bg-[#5d0c0c] text-[#f0d47a]"><LayoutGrid size={18} /></button>
                  <button className="p-2 text-[#8B6914] hover:bg-[#fdfaf3] transition-colors"><List size={18} /></button>
               </div>
               <button className="flex items-center gap-3 text-sm font-bold text-[#5d0c0c] uppercase tracking-widest border border-[#e5d5b5] px-6 py-3 bg-white">
                  Sort By <ChevronDown size={14} />
               </button>
            </div>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-40">
               <Search size={48} className="mx-auto mb-6 text-[#e5d5b5]" />
               <h3 className="font-playfair text-3xl italic text-[#5d0c0c]">No such creation found</h3>
               <p className="text-[#8B6914] mt-2">Try adjusting your filters to explore other heritage pieces.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
