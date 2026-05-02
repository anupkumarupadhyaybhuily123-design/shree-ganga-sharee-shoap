"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Truck, CreditCard, ChevronRight, MapPin, ArrowRight } from 'lucide-react';
import { useCart } from '@/lib/CartContext';

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const { subtotal } = useCart();
  const total = subtotal; // Heritage free shipping

  return (
    <div className="heritage-checkout">
      <style>{`
        .heritage-checkout { min-height: 100vh; background: #fdfaf3; font-family: 'Cormorant Garamond', serif; }
        .mini-meta { background: #fff; border-bottom: 1px solid #e5d5b5; padding: 30px 0; }
        .checkout-flow { max-width: 1300px; margin: 0 auto; padding: 0 32px; display: flex; justify-content: space-between; align-items: center; }
        
        .flow-logo { font-family: 'Cinzel', serif; font-size: 20px; color: #5d0c0c; letter-spacing: 2px; }
        .flow-steps { display: flex; gap: 40px; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #8B6914; font-weight: 600; }
        .flow-steps span { opacity: 0.4; }
        .flow-steps span.active { opacity: 1; color: #5d0c0c; font-weight: 700; }
        
        .main-checkout { max-width: 1300px; margin: 80px auto; padding: 0 32px; display: grid; grid-template-columns: 2fr 1.2fr; gap: 60px; }
        .checkout-card { background: #fff; border: 1px solid #e5d5b5; padding: 50px; }
        .check-h2 { font-family: 'Playfair Display', serif; font-size: 32px; color: #5d0c0c; margin-bottom: 40px; font-style: italic; display: flex; align-items: center; gap: 20px; }
        .step-num { width: 35px; height: 35px; background: #5d0c0c; color: #f0d47a; display: flex; align-items: center; justify-content: center; font-size: 16px; font-family: 'Cinzel', serif; }
        
        .lux-form { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
        .lux-fld { display: flex; flex-direction: column; gap: 8px; }
        .lux-fld label { font-size: 11px; text-transform: uppercase; color: #8B6914; letter-spacing: 2px; font-weight: 700; }
        .lux-fld input, .lux-fld textarea { border: none; border-bottom: 1px solid #e5d5b5; padding: 12px 0; font-size: 16px; outline: none; background: transparent; font-family: inherit; }
        .lux-fld input:focus { border-bottom-color: #5d0c0c; }
        
        .summary-card { background: #fff; border: 1px solid #e5d5b5; padding: 40px; position: sticky; top: 120px; }
        .summary-h3 { font-family: 'Cinzel', serif; font-size: 16px; color: #5d0c0c; margin-bottom: 30px; border-bottom: 1px solid #fdf2d9; padding-bottom: 15px; }
        .sum-row { display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 15px; color: #8B6914; }
        .sum-total { display: flex; justify-content: space-between; padding-top: 20px; border-top: 1px solid #e5d5b5; margin-top: 20px; font-size: 24px; color: #5d0c0c; font-weight: 600; }
        
        .pay-btn { background: #5d0c0c; color: #f0d47a; width: 100%; padding: 20px; border: none; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 3px; cursor: pointer; margin-top: 40px; transition: 0.3s; }
        .pay-btn:hover { background: #8B6914; transform: translateY(-3px); }
      `}</style>

      <header className="mini-meta">
        <div className="checkout-flow">
          <div className="flow-logo">SHREE GANGA</div>
          <div className="flow-steps">
             <span className="active">Shipping</span>
             <span>•</span>
             <span>Payment</span>
             <span>•</span>
             <span>Confirmation</span>
          </div>
          <div className="flex items-center gap-2 text-green-700 text-xs font-bold uppercase tracking-widest">
             <ShieldCheck size={16} /> Secure Checkout
          </div>
        </div>
      </header>

      <main className="main-checkout">
        <div className="check-left">
          <div className="checkout-card">
            <h2 className="check-h2"><div className="step-num">I</div> Shipping Master</h2>
            <div className="lux-form">
               <div className="lux-fld"><label>First Name</label><input type="text" placeholder="Radha" /></div>
               <div className="lux-fld"><label>Last Name</label><input type="text" placeholder="Sharma" /></div>
               <div className="lux-fld" style={{gridColumn: 'span 2'}}><label>Boutique Signature Email</label><input type="email" placeholder="radha@heritage.com" /></div>
               <div className="lux-fld" style={{gridColumn: 'span 2'}}><label>Grand Address</label><textarea rows={2} placeholder="Building, Street, Landmark..."></textarea></div>
               <div className="lux-fld"><label>City</label><input type="text" placeholder="Jaipur" /></div>
               <div className="lux-fld"><label>Pincode</label><input type="text" placeholder="302001" /></div>
            </div>
          </div>

          <div className="checkout-card" style={{marginTop: 30, opacity: 0.5}}>
             <h2 className="check-h2"><div className="step-num" style={{background: '#e5d5b5', color: '#8B6914'}}>II</div> Grand Payment</h2>
             <p className="text-xs uppercase tracking-widest text-[#8B6914]">Finalize shipping to unlock payment gateway</p>
          </div>
        </div>

        <aside className="check-right">
           <div className="summary-card">
              <h3 className="summary-h3">Collection Summary</h3>
              <div className="sum-row">
                 <span>Subtotal</span>
                 <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="sum-row">
                 <span>Hermitage Packaging</span>
                 <span style={{color: '#5d0c0c', fontWeight: 700}}>Gratis</span>
              </div>
              <div className="sum-total">
                 <span>Total Pay</span>
                 <span>₹{total.toLocaleString()}</span>
              </div>
              
              <button className="pay-btn flex items-center justify-center gap-3">
                 Signature Pay <ArrowRight size={18} />
              </button>
              
              <div className="mt-8 flex items-center gap-4 text-xs italic text-[#8B6914]">
                 <Truck size={18} />
                 <span>Express Boutique Shipping available for this creation.</span>
              </div>
           </div>
        </aside>
      </main>
    </div>
  );
}
