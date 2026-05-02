"use client";
import React, { useState, useEffect } from 'react';
import { PRODUCTS as initialProducts } from '@/lib/dummy-data';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowLeft, ShieldCheck, Heart } from 'lucide-react';
import { useCart } from '@/lib/CartContext';

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const { cartItems, updateQuantity, removeFromCart, subtotal } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  const delivery = 0; // Heritage boutique free shipping
  const total = subtotal + delivery;

  if (!mounted) return <div style={{ minHeight: '100vh', background: '#fdfaf3' }} />;

  if (cartItems.length === 0) {
    return (
      <div className="heritage-cart empty">
        <style>{`
          .heritage-cart.empty { min-height: 100vh; background: #fdfaf3; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: 'Cormorant Garamond', serif; padding: 40px; }
          .empty-msg { font-family: 'Playfair Display', serif; font-size: 32px; color: #5d0c0c; margin-bottom: 20px; font-style: italic; }
          .shop-link { background: #5d0c0c; color: #fdfaf3; padding: 15px 40px; text-decoration: none; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; }
        `}</style>
        <h2 className="empty-msg">Your Creation Bag is Empty</h2>
        <Link href="/" className="shop-link">Explore Collections</Link>
      </div>
    );
  }

  return (
    <div className="heritage-cart">
      <style>{`
        .heritage-cart { min-height: 100vh; background: #fdfaf3; padding: 160px 40px 100px; font-family: 'Cormorant Garamond', serif; }
        .cart-wrapper { max-width: 1300px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr; gap: 60px; }
        
        .cart-title { font-family: 'Playfair Display', serif; font-size: 48px; color: #5d0c0c; margin-bottom: 40px; font-style: italic; border-bottom: 1px solid #e5d5b5; padding-bottom: 20px; }
        
        .cart-list { display: flex; flex-direction: column; gap: 30px; }
        .cart-item { background: #fff; border: 1px solid #e5d5b5; padding: 30px; display: flex; gap: 30px; transition: 0.3s; }
        .cart-item:hover { transform: translateY(-5px); box-shadow: 0 15px 30px rgba(93,12,12,0.05); }
        .cart-img { width: 120px; height: 160px; object-fit: cover; border: 1px solid #fdf2d9; }
        
        .item-info { flex: 1; }
        .item-row { display: flex; justify-content: space-between; align-items: flex-start; }
        .item-h3 { font-family: 'Cinzel', serif; font-size: 18px; color: #5d0c0c; margin-bottom: 5px; }
        .item-cat { font-size: 12px; color: #8B6914; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px; display: block; }
        
        .qty-box { display: flex; align-items: center; gap: 20px; margin-top: 25px; }
        .qty-btn { width: 32px; height: 32px; border: 1px solid #e5d5b5; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #5d0c0c; transition: 0.3s; }
        .qty-btn:hover { background: #5d0c0c; color: #fff; }
        .qty-val { font-size: 16px; font-weight: 700; min-width: 25px; text-align: center; }

        .price-box { text-align: right; }
        .p-val { font-size: 22px; color: #5d0c0c; font-weight: 600; display: block; }
        .p-unit { font-size: 13px; color: #8B6914; opacity: 0.7; }
        
        .summary-box { background: #fff; border: 1px solid #e5d5b5; padding: 40px; position: sticky; top: 140px; }
        .sum-h2 { font-family: 'Cinzel', serif; font-size: 18px; color: #5d0c0c; margin-bottom: 30px; border-bottom: 1px solid #fdf2d9; padding-bottom: 15px; }
        .sum-line { display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 15px; color: #8B6914; }
        .sum-total { display: flex; justify-content: space-between; padding-top: 20px; border-top: 1px solid #e5d5b5; margin-top: 20px; font-size: 24px; color: #5d0c0c; font-weight: 600; }
        
        .checkout-btn { background: #5d0c0c; color: #f0d47a; width: 100%; padding: 20px; border: none; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; cursor: pointer; margin-top: 40px; transition: 0.3s; display: block; text-align: center; text-decoration: none; }
        .checkout-btn:hover { background: #8B6914; }
      `}</style>

      <div className="cart-wrapper">
        <div className="cart-left">
          <h1 className="cart-title">Your Bag of Creations</h1>
          <div className="cart-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} className="cart-img" alt="" />
                <div className="item-info">
                  <div className="item-row">
                    <div>
                      <span className="item-cat">{item.category} Heritage</span>
                      <h3 className="item-h3">{item.name}</h3>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-[#ff4d4d] hover:opacity-70 transition-opacity">
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="qty-box">
                      <div className="qty-btn" onClick={() => updateQuantity(item.id, -1)}><Minus size={14} /></div>
                      <span className="qty-val">{item.quantity}</span>
                      <div className="qty-btn" onClick={() => updateQuantity(item.id, 1)}><Plus size={14} /></div>
                    </div>
                    <div className="price-box">
                      <span className="p-val">₹{(item.price * item.quantity).toLocaleString()}</span>
                      <span className="p-unit">₹{item.price.toLocaleString()} / unit</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Link href="/" className="mt-12 inline-block text-[#8B6914] text-sm uppercase tracking-widest font-bold border-b border-[#8B6914] pb-1 hover:text-[#5d0c0c] hover:border-[#5d0c0c] transition-all">
            Add More Pieces to Collection
          </Link>
        </div>

        <aside className="cart-right">
          <div className="summary-box">
            <h2 className="sum-h2">Grand Summary</h2>
            <div className="sum-line">
              <span>Boutique Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="sum-line">
              <span>Heritage Shipping</span>
              <span style={{color: '#5d0c0c', fontWeight: 600}}>Gratis</span>
            </div>
            <div className="sum-total">
              <span>Grand Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
            
            <Link href="/checkout" className="checkout-btn">
              Proceed to Signature Checkout
            </Link>
            
            <div className="mt-8 flex items-center gap-3 text-xs italic text-[#8B6914] justify-center">
               <ShieldCheck size={18} /> Secure Handloom Transaction
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
