"use client";
import React, { useState, useEffect } from 'react';
import { PRODUCTS as initialProducts } from '@/lib/dummy-data';
import { Star, ShieldCheck, Truck, RotateCcw, Heart, Check, ChevronRight, Package, Award, Zap } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [selectedSize, setSelectedSize] = useState('M');
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState('');
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let all = [...initialProducts];
    try { const s = localStorage.getItem('shree_ganga_products'); if (s) all = JSON.parse(s); } catch {}
    const found = all.find(p => String(p.id) === params.id);
    if (found) { setProduct(found); setActiveImg(found.image); }
  }, [params.id]);



  if (!mounted || !product) return <div style={{ minHeight: '100vh', background: '#f3f3f3' }} />;

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="sg-pdp">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .sg-pdp {
          font-family: 'Inter', sans-serif;
          background: #f3f3f3;
          min-height: 100vh;
          padding: 16px 20px 40px;
        }

        /* BREADCRUMB */
        .sg-bc {
          max-width: 1200px;
          margin: 0 auto 16px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #565959;
          flex-wrap: wrap;
        }
        .sg-bc a { color: #007185; text-decoration: none; }
        .sg-bc a:hover { color: #c45500; text-decoration: underline; }
        .sg-bc-sep { color: #aaa; }

        /* MAIN LAYOUT */
        .sg-pdp-layout {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 420px 1fr 280px;
          gap: 20px;
          align-items: start;
        }

        /* ── LEFT GALLERY ── */
        .sg-gallery {
          background: #fff;
          border-radius: 8px;
          border: 1px solid #e7e7e7;
          padding: 20px;
          position: sticky;
          top: 100px;
        }
        .sg-main-img {
          aspect-ratio: 1/1.1;
          overflow: hidden;
          border: 1px solid #f0f0f0;
          border-radius: 6px;
          background: #fafafa;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
          cursor: zoom-in;
        }
        .sg-main-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }
        .sg-main-img:hover img { transform: scale(1.1); }
        .sg-thumbs { display: flex; gap: 10px; justify-content: center; }
        .sg-thumb {
          width: 60px;
          height: 68px;
          border: 2px solid #e7e7e7;
          border-radius: 4px;
          overflow: hidden;
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .sg-thumb:hover { border-color: #ff9900; }
        .sg-thumb.active { border-color: #ff9900; border-width: 2px; }
        .sg-thumb img { width: 100%; height: 100%; object-fit: cover; }

        /* Share / Wishlist */
        .sg-gallery-footer {
          display: flex;
          gap: 12px;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #f0f0f0;
        }
        .sg-wish-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #fff;
          border: 1px solid #d5d9d9;
          border-radius: 6px;
          padding: 10px;
          font-size: 13px;
          font-weight: 600;
          color: #111;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: all 0.2s;
        }
        .sg-wish-btn:hover { background: #fff8ee; border-color: #ff9900; color: #c45500; }

        /* ── MIDDLE INFO ── */
        .sg-info {
          background: #fff;
          border-radius: 8px;
          border: 1px solid #e7e7e7;
          padding: 24px;
        }
        .sg-info-brand { font-size: 13px; color: #007185; font-weight: 600; text-decoration: none; margin-bottom: 6px; display: block; }
        .sg-info-brand:hover { color: #c45500; text-decoration: underline; }
        .sg-info-name { font-size: 22px; font-weight: 500; color: #0f1111; margin-bottom: 10px; line-height: 1.4; }
        
        /* Rating */
        .sg-rating-row {
          display: flex;
          align-items: center;
          gap: 8px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e7e7e7;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }
        .sg-stars { display: flex; gap: 2px; }
        .sg-rating-val { font-size: 14px; color: #c45500; font-weight: 600; }
        .sg-rating-cnt { font-size: 13px; color: #007185; text-decoration: none; }
        .sg-rating-cnt:hover { color: #c45500; text-decoration: underline; }
        .sg-rating-sep { color: #e7e7e7; }

        /* Price */
        .sg-price-box { margin-bottom: 20px; }
        .sg-price-label { font-size: 12px; color: #565959; margin-bottom: 6px; }
        .sg-price-main { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; }
        .sg-price-deal { color: #cc0c39; font-size: 14px; font-weight: 700; }
        .sg-price-curr { font-size: 32px; font-weight: 400; color: #0f1111; }
        .sg-price-curr sup { font-size: 16px; vertical-align: super; }
        .sg-price-orig { font-size: 15px; color: #565959; }
        .sg-price-orig s { text-decoration: line-through; }
        .sg-price-off { color: #cc0c39; font-size: 15px; font-weight: 600; }
        .sg-prime-row { margin-top: 8px; font-size: 13px; color: #007185; font-weight: 600; }

        /* Variants */
        .sg-variant-section { margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #e7e7e7; }
        .sg-variant-label { font-size: 14px; font-weight: 700; color: #0f1111; margin-bottom: 12px; }
        .sg-variant-label span { font-weight: 400; color: #565959; }
        .sg-size-row { display: flex; gap: 10px; flex-wrap: wrap; }
        .sg-size-opt {
          min-width: 50px;
          height: 36px;
          border: 1px solid #d5d9d9;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 500;
          color: #0f1111;
          cursor: pointer;
          padding: 0 14px;
          transition: all 0.15s;
          background: #fff;
          font-family: 'Inter', sans-serif;
        }
        .sg-size-opt:hover { border-color: #ff9900; background: #fff8ee; }
        .sg-size-opt.active { border-color: #ff9900; border-width: 2px; background: #fff8ee; color: #c45500; font-weight: 700; }

        /* Qty */
        .sg-qty-row { display: flex; align-items: center; gap: 0; margin-bottom: 20px; }
        .sg-qty-label { font-size: 14px; font-weight: 600; color: #0f1111; margin-right: 16px; }
        .sg-qty-select {
          background: #f0f2f2;
          border: 1px solid #d5d9d9;
          border-radius: 4px;
          padding: 6px 12px;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          color: #0f1111;
          cursor: pointer;
        }

        /* About */
        .sg-about { margin-bottom: 20px; }
        .sg-about-title { font-size: 16px; font-weight: 700; color: #0f1111; margin-bottom: 12px; }
        .sg-about-list { list-style: none; padding: 0; }
        .sg-about-list li {
          font-size: 14px;
          color: #333;
          padding: 4px 0 4px 20px;
          position: relative;
          line-height: 1.5;
        }
        .sg-about-list li::before {
          content: '▸';
          position: absolute;
          left: 0;
          color: #ff9900;
          font-size: 12px;
        }

        /* ── RIGHT BUY BOX ── */
        .sg-buybox {
          background: #fff;
          border: 1px solid #e7e7e7;
          border-radius: 8px;
          padding: 20px;
          position: sticky;
          top: 100px;
        }
        .sg-bb-price { font-size: 28px; font-weight: 400; color: #0f1111; margin-bottom: 8px; }
        .sg-bb-price sup { font-size: 14px; vertical-align: super; }
        .sg-bb-free { font-size: 14px; color: #007600; font-weight: 600; margin-bottom: 4px; }
        .sg-bb-delivery { font-size: 13px; color: #333; margin-bottom: 14px; }
        .sg-bb-delivery a { color: #007185; text-decoration: none; }
        .sg-bb-stock { font-size: 17px; color: #007600; font-weight: 600; margin-bottom: 14px; }
        .sg-bb-sold { font-size: 13px; color: #565959; margin-bottom: 16px; }
        .sg-bb-sold a { color: #007185; text-decoration: none; font-weight: 600; }

        .sg-bb-btn {
          width: 100%;
          padding: 12px;
          border-radius: 100px;
          border: none;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          margin-bottom: 10px;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .sg-bb-btn.orange { background: #ff9900; color: #111; box-shadow: 0 2px 5px rgba(213,117,0,.5); }
        .sg-bb-btn.orange:hover { background: #e88b00; }
        .sg-bb-btn.yellow { background: #ffd814; color: #111; box-shadow: 0 2px 5px rgba(0,0,0,.13); }
        .sg-bb-btn.yellow:hover { background: #f7ca00; }
        .sg-bb-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .sg-bb-divider { height: 1px; background: #e7e7e7; margin: 14px 0; }
        .sg-bb-security { font-size: 12px; color: #565959; text-align: center; display: flex; align-items: center; justify-content: center; gap: 6px; }
        .sg-bb-detail { font-size: 13px; color: #333; margin-bottom: 10px; display: flex; gap: 8px; }
        .sg-bb-detail-label { color: #565959; min-width: 70px; }
        .sg-bb-detail-val { color: #0f1111; font-weight: 500; }
        .sg-bb-detail-val a { color: #007185; text-decoration: none; }
        .sg-bb-detail-val a:hover { color: #c45500; text-decoration: underline; }

        /* TOAST */
        .sg-toast {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          background: #232f3e;
          color: #fff;
          padding: 14px 28px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.3);
          z-index: 9999;
          animation: sgToast 0.4s ease;
        }
        .sg-toast-icon { background: #007600; border-radius: 50%; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        @keyframes sgToast {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}} />

      {/* Breadcrumb */}
      <div className="sg-bc">
        <Link href="/">ShreeGanga.in</Link>
        <span className="sg-bc-sep"><ChevronRight size={13} /></span>
        <Link href="/products">{product.category}</Link>
        <span className="sg-bc-sep"><ChevronRight size={13} /></span>
        <span style={{ color: '#333' }}>{product.name}</span>
      </div>

      <div className="sg-pdp-layout">

        {/* ── GALLERY ── */}
        <div className="sg-gallery">
          <div className="sg-main-img">
            <img src={activeImg} alt={product.name} />
          </div>
          <div className="sg-thumbs">
            {[product.image, product.image, product.image].map((img, i) => (
              <div key={i} className={`sg-thumb${i === 0 ? ' active' : ''}`} onClick={() => setActiveImg(img)}>
                <img src={img} alt="" />
              </div>
            ))}
          </div>
          <div className="sg-gallery-footer">
            <button className="sg-wish-btn" onClick={() => setWishlisted(!wishlisted)}>
              <Heart size={16} fill={wishlisted ? '#e91e8c' : 'none'} color={wishlisted ? '#e91e8c' : '#555'} />
              {wishlisted ? 'Wishlisted' : 'Add to Wishlist'}
            </button>
          </div>
        </div>

        {/* ── INFO ── */}
        <div className="sg-info">
          <a href="#" className="sg-info-brand">Visit the Shree Ganga Store</a>
          <h1 className="sg-info-name">{product.name}</h1>

          <div className="sg-rating-row">
            <span className="sg-rating-val">{product.rating}</span>
            <div className="sg-stars">
              {[1,2,3,4,5].map(s => (
                <Star key={s} size={16} fill={s <= Math.round(product.rating) ? '#ff9900' : 'none'} color={s <= Math.round(product.rating) ? '#ff9900' : '#ccc'} />
              ))}
            </div>
            <a href="#" className="sg-rating-cnt">{product.reviews} ratings</a>
            <span className="sg-rating-sep">|</span>
            <a href="#" className="sg-rating-cnt">Search similar items</a>
          </div>

          <div className="sg-price-box">
            <div className="sg-price-label">Price Range:</div>
            <div className="sg-price-main">
              <span className="sg-price-curr" style={{ fontSize: '24px' }}>{product.priceRange ? product.priceRange : 'Price on Request'}</span>
            </div>
            <div className="sg-prime-row" style={{ color: '#D4AF37' }}>✓ Premium Quality Assured</div>
          </div>

          {/* Size */}
          <div className="sg-variant-section">
            <div className="sg-variant-label">Size: <span>{selectedSize}</span></div>
            <div className="sg-size-row">
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(sz => (
                <button key={sz} className={`sg-size-opt${selectedSize === sz ? ' active' : ''}`} onClick={() => setSelectedSize(sz)}>
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* About */}
          <div className="sg-about">
            <div className="sg-about-title">About this item</div>
            <ul className="sg-about-list">
              {product.features
                ? product.features.map((f: string, i: number) => <li key={i}>{f}</li>)
                : ['Premium quality fabric', 'Handcrafted by skilled artisans', 'Suitable for special occasions', 'Easy to maintain'].map((f, i) => <li key={i}>{f}</li>)
              }
              <li>{product.description}</li>
            </ul>
          </div>
        </div>

        {/* ── SHOWROOM INQUIRY BOX ── */}
        <div className="sg-buybox">
          <div className="sg-bb-price" style={{ fontSize: '20px', fontWeight: 600, marginBottom: 12 }}>Interested in this item?</div>
          <p style={{ fontSize: '13px', color: '#565959', marginBottom: 20, lineHeight: 1.5 }}>
            This exclusive piece is available at our physical boutique. Contact us to inquire about exact pricing, sizing details, or to schedule a store visit.
          </p>

          <a href={`https://wa.me/919305115851?text=Hi, I am interested in the ${product.name} from your website.`} target="_blank" rel="noreferrer" className="sg-bb-btn" style={{ background: '#25D366', color: '#fff', textDecoration: 'none' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.274-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.098-.21.046-.39-.026-.54-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.21 2.095 3.2 5.076 4.485.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.195-.57-.345z"/><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12c0 1.846.502 3.57 1.36 5.093L2 22l4.982-1.274A9.957 9.957 0 0 0 12 22z"/></svg>
            Inquire on WhatsApp
          </a>

          <div className="sg-bb-divider" />

          <div className="sg-bb-detail"><span className="sg-bb-detail-label">Availability</span><span className="sg-bb-detail-val" style={{ color: '#007600' }}>In Store</span></div>
          <div className="sg-bb-detail"><span className="sg-bb-detail-label">Store</span><span className="sg-bb-detail-val">Shree Ganga Handloom</span></div>
          <div className="sg-bb-detail"><span className="sg-bb-detail-label">Location</span><span className="sg-bb-detail-val">Robertsganj, Sonbhadra</span></div>

          <div className="sg-bb-divider" />

          <button className="sg-wish-btn" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#fff', border: '1px solid #d5d9d9', borderRadius: 6, padding: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer' }} onClick={() => setWishlisted(!wishlisted)}>
            <Heart size={15} fill={wishlisted ? '#D4AF37' : 'none'} color={wishlisted ? '#D4AF37' : '#555'} />
            {wishlisted ? 'Saved to Collection' : 'Save to Collection'}
          </button>
        </div>

      </div>
    </div>
  );
}
