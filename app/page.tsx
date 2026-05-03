"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { PRODUCTS as initialProducts } from '@/lib/dummy-data';
import { Star, ChevronLeft, ChevronRight, ArrowRight, Truck, Shield, RefreshCw, Award, TrendingUp } from 'lucide-react';

const BANNER_SLIDES = [
  {
    video: 'https://player.vimeo.com/external/462118318.hd.mp4?s=183d596645934177d61183067756911762744883&profile_id=172&oauth2_token_id=57447761',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1600&h=500',
    headline: 'Premium Silk Sharees',
    sub: 'Up to 70% off · Free Delivery',
    cta: 'Shop Now',
    accent: '#ff9900',
  },
  {
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=1600&h=500',
    headline: 'Handloom Collection',
    sub: 'Authentic weaves · Starting ₹499',
    cta: 'Explore',
    accent: '#00a8cc',
  },
  {
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=1600&h=500',
    headline: 'Designer Wear',
    sub: 'Flat 50% off · Limited stock',
    cta: 'Buy Now',
    accent: '#e91e8c',
  },
  {
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80&w=1600&h=500',
    headline: 'Traditional Weaves',
    sub: 'Celebrating Heritage · New Arrivals',
    cta: 'View Collection',
    accent: '#D4AF37',
  },
  {
    image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&q=80&w=1600&h=500',
    headline: 'Wedding Store',
    sub: 'Exquisite Bridal Lehengas & Sharees',
    cta: 'Shop Bridal',
    accent: '#cc0c39',
  },
  {
    image: 'https://images.unsplash.com/photo-1610030469668-935142b9c7a6?auto=format&fit=crop&q=80&w=1600&h=500',
    headline: 'Royal Banarasi Silk',
    sub: 'The King of Silks · Pure Zari Work',
    cta: 'Explore Silks',
    accent: '#800080',
  },
  {
    image: 'https://images.unsplash.com/photo-1621644053631-01314f365ca3?auto=format&fit=crop&q=80&w=1600&h=500',
    headline: 'Summer Cotton Bliss',
    sub: 'Breathable · Light · Elegant',
    cta: 'Shop Cottons',
    accent: '#20B2AA',
  },
  {
    image: 'https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&q=80&w=1600&h=500',
    headline: 'Luxury Lehengas',
    sub: 'For the Modern Bride · Bespoke Designs',
    cta: 'Discover',
    accent: '#FF69B4',
  },
  {
    image: 'https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?auto=format&fit=crop&q=80&w=1600&h=500',
    headline: 'Elegant Kurtis',
    sub: 'Daily Wear · Office Wear · Party Wear',
    cta: 'Browse Kurtis',
    accent: '#4682B4',
  },
  {
    image: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&q=80&w=1600&h=500',
    headline: 'Ethnic Accessories',
    sub: 'Complete Your Look · Bags & Jewelry',
    cta: 'Shop Now',
    accent: '#DAA520',
  },
  {
    image: 'https://images.unsplash.com/photo-1582533089852-0240122d48e0?auto=format&fit=crop&q=80&w=1600&h=500',
    headline: 'Evening Gowns',
    sub: 'Party Ready · Indo-Western Fusion',
    cta: 'Explore Gowns',
    accent: '#000080',
  },
  {
    image: 'https://images.unsplash.com/photo-1618355272254-14f01832193f?auto=format&fit=crop&q=80&w=1600&h=500',
    headline: 'Artisan Crafts',
    sub: 'Handmade with Love · Supporting Weavers',
    cta: 'View Crafts',
    accent: '#A52A2A',
  },
];

const BRAND_STORY = [
  { label: 'Shree Ganga', sub: 'Heritage in Every Weave', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600&h=800', bg: 'linear-gradient(135deg, #fff5eb 0%, #fff 100%)' },
  { label: 'Pure Silks', sub: 'Timeless Elegance', img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=600&h=800', bg: 'linear-gradient(135deg, #eef5ff 0%, #fff 100%)' },
  { label: 'Handloom', sub: 'Artisan Crafted', img: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80&w=600&h=800', bg: 'linear-gradient(135deg, #f5f5f5 0%, #fff 100%)' },
  { label: 'Tradition', sub: 'Modern Grace', img: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&q=80&w=600&h=800', bg: 'linear-gradient(135deg, #fff0f0 0%, #fff 100%)' },
  { label: 'Boutique', sub: 'Royal Collection', img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600&h=800', bg: 'linear-gradient(135deg, #f0fff0 0%, #fff 100%)' },
  { label: 'Shree Ganga', sub: 'Pure Emotions', img: 'https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&q=80&w=600&h=800', bg: 'linear-gradient(135deg, #fffaf0 0%, #fff 100%)' },
];

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const SOCIAL_PROOFS = [
    { name: 'Priya', city: 'Delhi', item: 'Banarasi Silk Sharee', time: '2 min' },
    { name: 'Rahul', city: 'Lucknow', item: 'Wedding Sherwani', time: '5 min' },
    { name: 'Anjali', city: 'Mumbai', item: 'Designer Kurti Set', time: '8 min' },
    { name: 'Meena', city: 'Varanasi', item: 'Chanderi Cotton Sharee', time: '12 min' },
    { name: 'Vikram', city: 'Gorakhpur', item: 'Kurta Pajama Set', time: '15 min' },
    { name: 'Sunita', city: 'Jaipur', item: 'Bridal Lehenga', time: '18 min' },
  ];

  const [slide, setSlide] = useState(0);
  const [products, setProducts] = useState<any[]>(initialProducts);
  const [mounted, setMounted] = useState(false);
  const [countdown, setCountdown] = useState({ h: 5, m: 47, s: 32 });
  const [socialProof, setSocialProof] = useState(-1);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    setMounted(true);
    let baseProducts = initialProducts;
    try {
      const s = localStorage.getItem('shree_ganga_products');
      if (s) baseProducts = JSON.parse(s);
    } catch {}

    if (query) {
      const filtered = baseProducts.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        (p.category && p.category.toLowerCase().includes(query.toLowerCase()))
      );
      setProducts(filtered);
    } else {
      setProducts(baseProducts);
    }
  }, [query, mounted]);

  useEffect(() => {
    const t = setInterval(() => setSlide(p => (p + 1) % BANNER_SLIDES.length), 5000);

    // Countdown timer
    const cd = setInterval(() => {
      setCountdown(prev => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);

    // Social proof notifications
    const sp = setInterval(() => {
      setSocialProof(p => (p + 1) % 6);
      setTimeout(() => setSocialProof(-1), 4000);
    }, 8000);
    setTimeout(() => setSocialProof(0), 2000);
    setTimeout(() => setSocialProof(-1), 6000);

    // Parallax Scroll logic
    const handleScroll = () => {
      document.documentElement.style.setProperty('--scroll', window.scrollY + 'px');
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = winScroll / height;
      document.documentElement.style.setProperty('--scroll-pct', String(scrolled));
    };
    // Luxury Sparkle Cursor logic
    const handleMouseMove = (e: MouseEvent) => {
      const sparkle = document.createElement('div');
      sparkle.className = 'sg-sparkle';
      sparkle.style.left = e.pageX + 'px';
      sparkle.style.top = e.pageY + 'px';
      const size = Math.random() * 6 + 2;
      sparkle.style.width = size + 'px';
      sparkle.style.height = size + 'px';
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 800);

      // Cursor Follower
      const follower = document.querySelector('.sg-cursor-follower') as HTMLElement;
      if (follower) {
        follower.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    window.addEventListener('scroll', handleScroll);

    return () => { 
      clearInterval(t); 
      clearInterval(cd); 
      clearInterval(sp); 
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.05 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [mounted, products]);

  if (!mounted) return (
    <div style={{ minHeight: '100vh', background: '#111', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
      <div style={{ width: 70, height: 70, border: '3px solid rgba(212,175,55,0.15)', borderTop: '3px solid #D4AF37', borderRadius: '50%', animation: 'sgSpin 0.8s linear infinite' }} />
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: '#D4AF37', fontWeight: 700, letterSpacing: 3 }}>SHREE GANGA</div>
      <div style={{ fontSize: 11, color: '#555', letterSpacing: 2, textTransform: 'uppercase' }}>Loading Collections...</div>
      <style>{`@keyframes sgSpin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <main className="sg-home">
      <div className="sg-progress" />
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .sg-home { font-family: 'Inter', sans-serif; background: #f3f3f3; }
        .sg-progress {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: #D4AF37;
          transform-origin: 0% 50%;
          transform: scaleX(var(--scroll-pct, 0));
          z-index: 10001;
          box-shadow: 0 0 10px #D4AF37;
        }
        .sg-cursor-follower {
          position: fixed;
          top: -20px;
          left: -20px;
          width: 40px;
          height: 40px;
          border: 1px solid rgba(212,175,55,0.6);
          border-radius: 50%;
          pointer-events: none;
          z-index: 10000;
          transition: transform 0.1s ease-out;
        }



        /* ── SHIMMER ── */
        /* ── LUXURY EFFECTS ── */
        .sg-hero-parallax {
          transform: translateY(calc(var(--scroll, 0) * 0.4));
          transition: transform 0.1s linear;
        }
        .sg-gold-dust {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #D4AF37;
          border-radius: 50%;
          pointer-events: none;
          animation: sgDust 10s linear infinite;
          opacity: 0.6;
        }
        @keyframes sgDust {
          0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 0; }
          50% { opacity: 0.6; }
          100% { transform: translateY(-100vh) rotate(360deg) scale(0); opacity: 0; }
        }
        /* ── FABRIC TEXTURE OVERLAY ── */
        .sg-fabric-texture {
          position: fixed;
          inset: 0;
          z-index: 99999;
          pointer-events: none;
          opacity: 0.03;
          background-image: url('https://www.transparenttextures.com/patterns/natural-paper.png');
          mix-blend-mode: multiply;
        }
        .sg-magnetic {
          display: inline-block;
          transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }
        /* ── UNMASK TEXT ── */
        .sg-unmask {
          background: linear-gradient(90deg, #D4AF37 0%, #111 50%, #D4AF37 100%);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: sgUnmask 3s linear infinite;
        }
        @keyframes sgUnmask {
          to { background-position: 200% center; }
        }
        /* ── FLOATING SHAPES ── */
        .sg-float-shape {
          position: absolute;
          border: 1px solid rgba(212,175,55,0.2);
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
          animation: floatShape 20s linear infinite;
        }
        @keyframes floatShape {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(50px, 100px) rotate(180deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
        .shimmer {
          background: linear-gradient(90deg, #f0f0f0 25%, #f8f8f8 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite linear;
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .sg-wrap { max-width: 1500px; margin: 0 auto; padding: 0 20px; }
        .sg-hero {
          position: relative;
          height: calc(100vh - 80px);
          min-height: 600px;
          overflow: hidden;
          background: #111;
        }
        /* ── PRODUCT CARD LUXURY ── */
        .sg-product-card {
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1) !important;
          border: 1px solid transparent !important;
        }
        .sg-product-card:hover {
          transform: translateY(-10px);
          border-color: rgba(212,175,55,0.3) !important;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08) !important;
        }
        /* ── ELEGANT DIVIDER ── */
        .sg-divider {
          width: 80px;
          height: 2px;
          background: #D4AF37;
          margin: 20px auto;
          border-radius: 1px;
        }
        .sg-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 1s ease;
        }
        .sg-slide.active { opacity: 1; }
        .sg-slide img, .sg-slide video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          transform: translateY(calc(var(--scroll, 0px) * 0.4));
          transition: transform 0.1s ease-out;
        }
        .sg-slide.active img, .sg-slide.active video {
          /* Parallax handled by scroll variable */
        }
        
        /* ── MICRO-INTERACTIONS ── */
        a, button { transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        a:hover, button:hover { transform: scale(1.03); }
        a:active, button:active { transform: scale(0.97); }
        .sg-slide-mask {
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.1) 100%);
        }
        .sg-slide-body {
          position: absolute;
          top: 50%;
          left: 80px;
          transform: translateY(-50%);
          color: #fff;
          max-width: 600px;
          z-index: 5;
        }
        .sg-slide-badge {
          display: inline-block;
          background: #D4AF37;
          color: #111;
          font-size: 11px;
          font-weight: 800;
          padding: 5px 14px;
          border-radius: 20px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 24px;
          animation: slideInUp 0.6s both;
        }
        .sg-slide-h1 {
          font-family: 'Playfair Display', serif;
          font-size: 64px;
          font-weight: 800;
          color: #fff;
          margin-bottom: 20px;
          line-height: 1.1;
          letter-spacing: -1px;
          animation: sgTextReveal 1s cubic-bezier(0.19, 1, 0.22, 1) both;
          text-shadow: 0 4px 30px rgba(0,0,0,0.5);
          background: linear-gradient(to right, #fff 40%, #D4AF37 50%, #fff 60%);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          background-size: 200% auto;
          animation: sgTextReveal 1s cubic-bezier(0.19, 1, 0.22, 1) both, shimmer 3s infinite linear;
        }
        @keyframes shimmer {
          to { background-position: 200% center; }
        }
        @keyframes sgTextReveal {
          from { opacity: 0; transform: translateY(40px) skewY(2deg); }
          to { opacity: 1; transform: translateY(0) skewY(0); }
        }
        .sg-slide-sub {
          font-size: 20px;
          color: rgba(255,255,255,0.9);
          margin-bottom: 40px;
          max-width: 600px;
          font-weight: 300;
          animation: sgTextReveal 1.2s cubic-bezier(0.19, 1, 0.22, 1) 0.2s both;
        }
        .sg-slide-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #D4AF37;
          color: #111;
          padding: 16px 40px;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-radius: 2px;
          text-decoration: none;
          transition: all 0.3s;
          animation: slideInUp 0.8s 0.6s both;
        }
        .sg-slide-cta:hover { background: #fff; transform: translateY(-3px); }

        @keyframes slideInUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        /* ─────────────────────────────── PRODUCT CARD OVERLAYS ─── */
        /* ── REVEAL SYSTEM ── */
        .reveal {
          opacity: 0;
          transform: translateY(40px) scale(0.98);
          transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
          will-change: transform, opacity;
        }
        .reveal.active {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .reveal.active > * {
          animation: sgStagger 0.6s both;
        }
        @keyframes sgStagger {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .reveal.active > *:nth-child(2) { animation-delay: 0.1s; }
        .reveal.active > *:nth-child(3) { animation-delay: 0.2s; }
        .reveal.active > *:nth-child(4) { animation-delay: 0.3s; }
        .sg-prod-card {
          position: relative;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          perspective: 1000px;
        }
        .sg-prod-card:hover { transform: translateY(-12px) rotateX(4deg) rotateY(-2deg); z-index: 10; }
        .sg-prod-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(255,255,255,0.95);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transform: translateY(100%);
          transition: transform 0.4s ease;
          z-index: 10;
        }
        .sg-prod-card:hover .sg-prod-overlay { transform: translateY(0); }
        .sg-overlay-btn {
          width: 100%;
          padding: 12px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }
        .sg-btn-bag { background: #111; color: #fff; }
        .sg-btn-bag:hover { background: #D4AF37; color: #111; }
        .sg-btn-quick { background: transparent; color: #111; border: 1px solid #111; }
        .sg-btn-quick:hover { background: #f5f5f5; }

        /* REVEAL ON SCROLL */
        .reveal { transition: all 0.8s ease-out; }
        .reveal.active { animation: revealIn 0.8s both; }
        @keyframes revealIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        }
        .sg-slide-cta:hover { background: #f0c954; transform: translateY(-3px); box-shadow: 0 8px 25px rgba(212,175,55,0.4); }

        /* Hero arrows */
        .sg-hero-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.3);
          color: #fff;
          width: 44px;
          height: 80px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
          z-index: 10;
        }
        .sg-hero-arrow:hover { background: rgba(255,255,255,0.3); }
        .sg-hero-arrow.left { left: 12px; }
        .sg-hero-arrow.right { right: 12px; }

        /* Hero dots */
        .sg-hero-dots {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          z-index: 10;
        }
        .sg-dot {
          width: 28px; height: 4px;
          background: rgba(255,255,255,0.4);
          border-radius: 2px;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
        }
        .sg-dot.active { background: #ff9900; width: 40px; }

        /* ── PROMO STRIP ── */
        .sg-promo-strip {
          background: #fff;
          border-bottom: 1px solid #e7e7e7;
          padding: 14px 0;
        }
        .sg-promo-inner {
          max-width: 1500px;
          margin: 0 auto;
          padding: 0 20px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }
        .sg-promo-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 0 24px;
          border-right: 1px solid #e7e7e7;
        }
        .sg-promo-item:last-child { border-right: none; }
        .sg-promo-ico {
          width: 44px; height: 44px;
          background: #fff8ee;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #ff9900;
        }
        .sg-promo-title { font-size: 14px; font-weight: 700; color: #111; margin-bottom: 2px; }
        .sg-promo-sub { font-size: 12px; color: #888; }

        /* ── SECTION ── */
        .sg-section { background: #fff; border-radius: 4px; margin: 16px auto; max-width: 1500px; padding: 0 20px; overflow: hidden; }
        .sg-section-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 0 16px;
          border-bottom: 2px solid #f3f3f3;
        }
        .sg-section-title { font-size: 22px; font-weight: 700; color: #111; display: flex; align-items: center; gap: 10px; }
        .sg-section-badge {
          font-size: 11px;
          font-weight: 700;
          background: #D4AF37;
          color: #111;
          padding: 3px 10px;
          border-radius: 12px;
          letter-spacing: 0.5px;
        }
        .sg-viewall {
          font-size: 14px;
          color: #007185;
          font-weight: 600;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 8px 16px;
          border-radius: 20px;
          transition: background 0.2s;
        }
        .sg-viewall:hover { background: #f3f3f3; }

        /* ── PRODUCT CARD ── */
        .sg-prod-card {
          background: #fff;
          border: 1px solid #e7e7e7;
          border-radius: 8px;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          transition: box-shadow 0.25s, transform 0.25s;
          cursor: pointer;
        }
        .sg-prod-card:hover { box-shadow: 0 6px 28px rgba(0,0,0,0.12); transform: translateY(-4px); border-color: #D4AF37; }
        .sg-prod-img {
          position: relative;
          width: 100%;
          aspect-ratio: 3/4;
          overflow: hidden;
          background: #f5f5f5;
          border-radius: 4px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          transition: box-shadow 0.3s;
        }
        .sg-prod-card:hover .sg-prod-img {
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }
        .sg-hand-seal {
          position: absolute;
          top: 15px;
          left: 15px;
          width: 50px;
          height: 50px;
          border: 1px solid rgba(212,175,55,0.4);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.9);
          opacity: 0;
          transform: scale(0.5) rotate(-45deg);
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          z-index: 5;
        }
        .sg-prod-card:hover .sg-hand-seal {
          opacity: 1;
          transform: scale(1) rotate(0);
        }
        .sg-prod-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
        .sg-prod-card:hover .sg-prod-img img { transform: scale(1.06); }
        .sg-prod-info { padding: 12px; flex: 1; display: flex; flex-direction: column; gap: 6px; }
        .sg-prod-name {
          font-size: 13px;
          color: #111;
          font-weight: 500;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .sg-prod-brand { font-size: 11px; color: #007185; font-weight: 600; }
        .sg-prod-stars { display: flex; align-items: center; gap: 4px; }
        .sg-star-fill { color: #D4AF37; }
        .sg-prod-reviews { font-size: 12px; color: #007185; }
        .sg-prod-prices { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
        .sg-prod-curr { font-size: 18px; font-weight: 700; color: #0f1111; }
        .sg-prod-delivery { font-size: 11px; color: #007600; font-weight: 600; }
        .sg-prod-btn {
          margin-top: 8px;
          background: #111;
          color: #fff;
          border: 1px solid #111;
          padding: 9px 0;
          width: 100%;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-radius: 4px;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: all 0.3s;
        }
        .sg-prod-btn:hover { background: #D4AF37; color: #111; border-color: #D4AF37; }

        /* ── PRODUCT GRID ── */
        .sg-products-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
          padding: 16px 0 24px;
        }

        /* ── PRODUCT SLIDER ── */
        .sg-prod-slider {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          padding: 20px 0 40px;
          scrollbar-width: none;
          scroll-snap-type: x mandatory;
        }
        .sg-prod-slider::-webkit-scrollbar { display: none; }
        .sg-prod-slider .sg-prod-card {
          flex: 0 0 300px;
          scroll-snap-align: start;
        }

        /* ── FEATURED COLLECTIONS ── */
        .sg-coll-section { background: #fff; padding: 60px 0; }
        .sg-coll-head { text-align: center; margin-bottom: 40px; }
        .sg-coll-head h2 { font-size: 26px; font-weight: 600; color: #1a3a5f; letter-spacing: 3px; text-transform: uppercase; font-family: 'Inter', sans-serif; }
        .sg-coll-grid { display: flex; gap: 30px; overflow-x: auto; padding: 0 20px 40px; max-width: 1500px; margin: 0 auto; scrollbar-width: none; scroll-snap-type: x mandatory; }
        .sg-coll-grid::-webkit-scrollbar { display: none; }
        .sg-coll-card { flex: 0 0 600px; scroll-snap-align: center; display: flex; border-radius: 8px; overflow: hidden; height: 400px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); text-decoration: none; border: 1px solid #eee; transition: transform 0.3s; }
        .sg-coll-card:hover { transform: translateY(-5px); }
        .sg-coll-info { flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 40px; background: #fff; }
        .sg-coll-label { font-size: 32px; font-weight: 800; color: #111; line-height: 1; margin-bottom: 5px; text-transform: uppercase; font-family: 'Inter', sans-serif; }
        .sg-coll-sub { font-size: 24px; font-weight: 300; color: #111; text-transform: uppercase; font-family: 'Inter', sans-serif; letter-spacing: 2px; }
        .sg-coll-img { flex: 1.2; }
        .sg-coll-img img { width: 100%; height: 100%; object-fit: cover; }
        @media (max-width: 768px) { .sg-coll-card { flex: 0 0 85vw; height: 350px; } .sg-coll-info { padding: 20px; } .sg-coll-label { font-size: 24px; } .sg-coll-sub { font-size: 16px; } }

        .sg-sparkle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #D4AF37;
          border-radius: 50%;
          pointer-events: none;
          z-index: 10000;
          animation: sgFadeOut 0.8s forwards;
          box-shadow: 0 0 10px #D4AF37;
        }
        @keyframes sgFadeOut {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(3) translateY(-20px); opacity: 0; }
        }
      `}} />



      {/* ── HERO ── */}
      <div className="sg-hero">
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 5 }}>
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="sg-gold-dust" 
              style={{ 
                left: Math.random() * 100 + '%', 
                top: Math.random() * 100 + '%', 
                animationDelay: Math.random() * 10 + 's',
                animationDuration: (Math.random() * 5 + 5) + 's'
              }} 
            />
          ))}
        </div>
        {BANNER_SLIDES.map((s, i) => (
          <div key={i} className={`sg-slide${i === slide ? ' active' : ''}`}>
            <div className="sg-hero-parallax" style={{ height: '100%', width: '100%' }}>
              {s.video ? (
                <video src={s.video} autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <img src={s.image} alt={s.headline} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              )}
            </div>
            <div className="sg-slide-mask" />
            <div className="sg-slide-body">
              <span className="sg-slide-badge">Special Offer</span>
              <h1 className="sg-slide-h1">{s.headline}</h1>
              <p className="sg-slide-sub">{s.sub}</p>
              <Link href="/products" className="sg-slide-cta">
                {s.cta} <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        ))}
        <button className="sg-hero-arrow left" onClick={() => setSlide(p => (p - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length)}>
          <ChevronLeft size={22} />
        </button>
        <button className="sg-hero-arrow right" onClick={() => setSlide(p => (p + 1) % BANNER_SLIDES.length)}>
          <ChevronRight size={22} />
        </button>
        <div className="sg-hero-dots">
          {BANNER_SLIDES.map((_, i) => (
            <button key={i} className={`sg-dot${i === slide ? ' active' : ''}`} onClick={() => setSlide(i)} />
          ))}
        </div>
      </div>

      {/* ── PROMO STRIP ── */}
      <div className="sg-promo-strip">
        <div className="sg-promo-inner">
          <div className="sg-promo-item">
            <div className="sg-promo-ico"><Truck size={22} /></div>
            <div><div className="sg-promo-title">Free Delivery</div><div className="sg-promo-sub">On orders above ₹499</div></div>
          </div>
          <div className="sg-promo-item">
            <div className="sg-promo-ico"><RefreshCw size={22} /></div>
            <div><div className="sg-promo-title">Easy Returns</div><div className="sg-promo-sub">10-day hassle-free return</div></div>
          </div>
          <div className="sg-promo-item">
            <div className="sg-promo-ico"><Shield size={22} /></div>
            <div><div className="sg-promo-title">Secure Payment</div><div className="sg-promo-sub">100% safe & encrypted</div></div>
          </div>
          <div className="sg-promo-item">
            <div className="sg-promo-ico"><Award size={22} /></div>
            <div><div className="sg-promo-title">Handloom Certified</div><div className="sg-promo-sub">Authentic artisan products</div></div>
          </div>
        </div>
      </div>

      {/* ── FLASH SALE COUNTDOWN ── */}
      <div style={{ maxWidth: 1500, margin: '16px auto', borderRadius: 4, overflow: 'hidden', background: 'linear-gradient(135deg, #5d0c0c 0%, #8B0000 50%, #5d0c0c 100%)', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{ background: '#D4AF37', color: '#111', fontSize: 10, fontWeight: 800, padding: '4px 12px', borderRadius: 3, textTransform: 'uppercase', letterSpacing: 1, animation: 'sgPulse 1.5s ease-in-out infinite' }}>LIVE</span>
            <span style={{ color: '#D4AF37', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>Flash Sale</span>
          </div>
          <h3 style={{ color: '#fff', fontSize: 28, fontWeight: 800, fontFamily: "'Playfair Display', serif", marginBottom: 6 }}>Bridal Collection Sale</h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>Up to 50% OFF on Designer Sarees & Lehengas</p>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {[
            { val: String(countdown.h).padStart(2, '0'), label: 'Hours' },
            { val: String(countdown.m).padStart(2, '0'), label: 'Minutes' },
            { val: String(countdown.s).padStart(2, '0'), label: 'Seconds' },
          ].map((t, i) => (
            <React.Fragment key={t.label}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: 8, padding: '14px 18px', minWidth: 70 }}>
                  <span style={{ fontSize: 32, fontWeight: 800, color: '#D4AF37', fontFamily: "'Inter', sans-serif" }}>{t.val}</span>
                </div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 6, textTransform: 'uppercase', letterSpacing: 1 }}>{t.label}</div>
              </div>
              {i < 2 && <span style={{ fontSize: 28, color: '#D4AF37', fontWeight: 700, marginTop: -16 }}>:</span>}
            </React.Fragment>
          ))}
        </div>
        <a href="#" style={{ background: '#D4AF37', color: '#111', padding: '14px 36px', borderRadius: 4, fontSize: 14, fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 1, transition: 'transform 0.2s', display: 'inline-block' }}>Shop Now</a>
        <style>{`@keyframes sgPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }`}</style>
      </div>

      {/* ── LUXURY GIFTING ── */}
      <div className="reveal" style={{ maxWidth: 1500, margin: '16px auto', background: '#fff', borderRadius: 4, display: 'flex', overflow: 'hidden', minHeight: 400 }}>
        <div style={{ flex: 1, padding: '80px 60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ fontSize: 11, color: '#D4AF37', fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 16 }}>The Perfect Gift</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, fontWeight: 700, color: '#111', lineHeight: 1.2, marginBottom: 24 }}>Luxury Gifting Experience</h2>
          <p style={{ color: '#666', fontSize: 16, lineHeight: 1.8, marginBottom: 32, maxWidth: 500 }}>Make your loved ones feel special with our signature luxury packaging. Add a personalized handwritten note and premium gift wrap to any order.</p>
          <div style={{ display: 'flex', gap: 30, marginBottom: 40 }}>
            {[
              { icon: '\uD83C\uDF81', title: 'Signature Box', sub: 'Premium Gold-foil' },
              { icon: '\u270D\uFE0F', title: 'Personalized Note', sub: 'Handwritten with love' },
              { icon: '\u2728', title: 'Luxury Wrap', sub: 'Silk Ribbon finish' }
            ].map(f => (
              <div key={f.title}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{f.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#111' }}>{f.title}</div>
                <div style={{ fontSize: 12, color: '#888' }}>{f.sub}</div>
              </div>
            ))}
          </div>
          <a href="#" style={{ display: 'inline-block', background: '#111', color: '#fff', padding: '16px 40px', fontSize: 13, fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 2, width: 'fit-content' }}>Add Gift Options</a>
        </div>
        <div style={{ flex: 1, position: 'relative' }}>
          <img src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800&h=800" alt="Gifting" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #fff, transparent 50%)' }} />
        </div>
      </div>
      {socialProof >= 0 && socialProof < SOCIAL_PROOFS.length && (
        <div style={{
          position: 'fixed', bottom: 90, left: 20, background: '#fff', borderRadius: 10,
          boxShadow: '0 8px 30px rgba(0,0,0,0.15)', padding: '16px 20px', display: 'flex',
          alignItems: 'center', gap: 14, zIndex: 9998, maxWidth: 340,
          animation: 'sgSlideIn 0.4s ease-out', border: '1px solid #f0f0f0'
        }}>
          <div style={{ width: 60, height: 60, borderRadius: 4, overflow: 'hidden', flexShrink: 0 }}>
            <img src={`https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=100&h=100`} alt="Purchased" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <div style={{ fontSize: 13, color: '#111', fontWeight: 600 }}>
              <strong>{SOCIAL_PROOFS[socialProof].name}</strong> from {SOCIAL_PROOFS[socialProof].city}
            </div>
            <div style={{ fontSize: 12, color: '#555' }}>
              purchased <strong style={{ color: '#5d0c0c' }}>{SOCIAL_PROOFS[socialProof].item}</strong>
            </div>
            <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{SOCIAL_PROOFS[socialProof].time} ago {'\u2713'}</div>
          </div>
        </div>
      )}
      <style>{`@keyframes sgSlideIn { from { transform: translateX(-100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>

      {/* ── EXCLUSIVE COLLECTION SLIDER ── */}
      <div className="sg-section" style={{ background: 'transparent', padding: '20px 0' }}>
        <div className="sg-section-head" style={{ padding: '0 20px', border: 'none' }}>
          <div className="sg-section-title" style={{ fontSize: '28px', fontFamily: "'Playfair Display', serif" }}>
            Our Exclusive Collection
          </div>
          <Link href="/products" className="sg-viewall">View All Products <ArrowRight size={15} /></Link>
        </div>
        <div className="sg-prod-slider" style={{ padding: '20px' }}>
          {products.length > 0 ? products.map((product, idx) => (
            <Link href={`/product/${product.id}`} key={product.id} className="sg-prod-card">
              <div className="sg-prod-img">
                <img src={product.image} alt={product.name} loading="lazy" />
                <div className="sg-hand-seal">
                  <Award size={20} color="#D4AF37" />
                </div>
                {idx < 4 && <span style={{ position: 'absolute', top: 8, right: 8, background: '#D4AF37', color: '#111', fontSize: '10px', fontWeight: 800, padding: '3px 8px', borderRadius: '3px', letterSpacing: '0.5px', textTransform: 'uppercase', zIndex: 2 }}>New Arrival</span>}
                <div className="sg-prod-overlay">
                  <button className="sg-overlay-btn sg-btn-bag" onClick={(e) => { e.preventDefault(); alert('Added to Bag!'); }}>Add to Bag</button>
                  <button className="sg-overlay-btn sg-btn-quick" onClick={(e) => { e.preventDefault(); }}>Quick View</button>
                </div>
              </div>
              <div className="sg-prod-info">
                <span className="sg-prod-brand">Shree Ganga</span>
                <span className="sg-prod-name">{product.name}</span>
                <div className="sg-prod-prices">
                  <span className="sg-prod-curr" style={{ fontSize: '15px' }}>{product.priceRange ? product.priceRange : 'Price on Request'}</span>
                </div>
                <div style={{ fontSize: 11, color: '#007600', fontWeight: 600, marginTop: 4 }}>
                  FREE Delivery by {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </div>
                <button className="sg-prod-btn">View Details</button>
              </div>
            </Link>
          )) : (
            <div style={{ padding: '60px 0', textAlign: 'center', width: '100%', color: '#666' }}>
              <div style={{ fontSize: 40, marginBottom: 20 }}>🔍</div>
              <h3 style={{ fontSize: 20, color: '#111', marginBottom: 10 }}>No products found for "{query}"</h3>
              <p>Try searching for something else or explore our categories.</p>
              <button onClick={() => router.push('/')} style={{ marginTop: 20, padding: '10px 24px', background: '#D4AF37', border: 'none', borderRadius: 4, fontWeight: 700, cursor: 'pointer' }}>Clear Search</button>
            </div>
          )}
        </div>
      </div>

      {/* ── CINEMATIC FABRIC VIDEO ── */}
      <div className="reveal" style={{ maxWidth: 1500, margin: '16px auto', height: 600, borderRadius: 4, overflow: 'hidden', position: 'relative', background: '#000' }}>
        <video 
          src="https://player.vimeo.com/external/462118318.hd.mp4?s=183d596645934177d61183067756911762744883&profile_id=172&oauth2_token_id=57447761" 
          autoPlay muted loop playsInline 
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} 
        />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 20px', color: '#fff' }}>
          <span style={{ fontSize: 11, color: '#D4AF37', fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase', marginBottom: 20 }}>The Art of Silk</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 56, fontWeight: 700, marginBottom: 20, maxWidth: 800 }}>Threads That Define Your Soul</h2>
          <p style={{ fontSize: 18, fontWeight: 300, color: 'rgba(255,255,255,0.8)', maxWidth: 600, margin: '0 auto 40px' }}>Experience the rhythm of the loom and the grace of pure Banarasi silk.</p>
          <a href="#" style={{ padding: '16px 40px', border: '1px solid #D4AF37', color: '#D4AF37', textDecoration: 'none', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', transition: 'all 0.3s' }} className="sg-video-btn">Explore Heritage</a>
        </div>
        <style>{`.sg-video-btn:hover { background: #D4AF37; color: #111; }`}</style>
      </div>
      <div className="reveal" style={{ maxWidth: 1500, margin: '16px auto', background: '#111', color: '#fff', borderRadius: 4, overflow: 'hidden', display: 'flex', alignItems: 'stretch' }}>
        <div style={{ flex: 1, padding: '80px 60px' }}>
          <span style={{ fontSize: 11, color: '#D4AF37', fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 16, display: 'block' }}>Handmade with Love</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, fontWeight: 700, lineHeight: 1.2, marginBottom: 24 }}>Meet Our Master Artisans</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, lineHeight: 1.8, marginBottom: 40 }}>
            Humari har saree ek kala hai jo banayi jaati hai India ke sabse bade "Master Artisans" ke haathon se. 
            Banaras ki galiyon se lekar Chanderi ki dhoop tak, ye bunkar pichli kai peedhiyon se iss parampara ko zinda rakhe hue hain.
          </p>
          <div style={{ display: 'flex', gap: 40 }}>
            <div>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#D4AF37', marginBottom: 4 }}>500+</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1 }}>Active Weavers</div>
            </div>
            <div>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#D4AF37', marginBottom: 4 }}>100%</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1 }}>Handloom Certified</div>
            </div>
          </div>
        </div>
        <div style={{ flex: 1.2, position: 'relative', overflow: 'hidden' }}>
          <img src="https://images.unsplash.com/photo-1583344799093-8e843e8a600c?auto=format&fit=crop&q=80&w=1000" alt="Artisan at work" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to left, rgba(17,17,17,1) 0%, rgba(17,17,17,0) 30%)' }} />
        </div>
      </div>
      <div style={{ maxWidth: 1500, margin: '16px auto', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 500 }}>
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800&h=600" alt="Shree Ganga Heritage" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(93,12,12,0.4) 0%, rgba(0,0,0,0.1) 100%)' }} />
            <div style={{ position: 'absolute', bottom: 30, left: 30, right: 30 }}>
              <div style={{ display: 'flex', gap: 20 }}>
                {[{n:'25+',l:'Years Legacy'},{n:'3',l:'Stores'},{n:'5000+',l:'Happy Customers'}].map(s=>(
                  <div key={s.l} style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', padding: '16px 24px', borderRadius: 8, textAlign: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
                    <div style={{ fontSize: 28, fontWeight: 800, color: '#D4AF37' }}>{s.n}</div>
                    <div style={{ fontSize: 11, color: '#fff', textTransform: 'uppercase', letterSpacing: 1 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #fdfaf3 0%, #fff5eb 100%)', padding: '60px 50px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontSize: 11, color: '#D4AF37', fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 12 }}>Our Heritage</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: '#5d0c0c', lineHeight: 1.2, marginBottom: 20 }}>The Legacy of Shree Ganga Handloom</h2>
            <div style={{ width: 60, height: 3, background: '#D4AF37', marginBottom: 24 }} />
            <p style={{ fontSize: 15, color: '#555', lineHeight: 1.8, marginBottom: 16 }}>
              At <strong style={{ color: '#5d0c0c' }}>Shree Ganga</strong>, we believe every sharee is a masterpiece, a silent story of heritage woven into six yards of elegance. Born in the heart of Rudrapur, Deoria, our legacy spans over 25 years of preserving India&apos;s timeless handloom traditions.
            </p>
            <p style={{ fontSize: 15, color: '#555', lineHeight: 1.8, marginBottom: 24, fontStyle: 'italic' }}>
              "Humari har sharee mein Bharat ki aatma basti hai." {'\u2014'} From the sacred whispers of the looms to the golden touch of the zari, we bring you not just clothing, but a heritage that you can wear with pride.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {['Pure Silk Sharees', 'Handloom Certified', 'Bridal Collection', "Men's Ethnic"].map(tag => (
                <span key={tag} style={{ padding: '8px 16px', border: '1px solid #D4AF37', borderRadius: 20, fontSize: 12, color: '#8B6914', fontWeight: 600, letterSpacing: 0.5 }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── BEST SELLERS GRID ── */}
      <div className="sg-section reveal">
        <div className="sg-section-head">
          <div className="sg-section-title">
            <TrendingUp size={20} color="#D4AF37" /> Best Sellers
            <span className="sg-section-badge">HOT</span>
          </div>
          <Link href="/products" className="sg-viewall">View all <ArrowRight size={15} /></Link>
        </div>
        <div className="sg-products-grid">
          {products.length > 0 ? products.map(product => (
            <Link href={`/product/${product.id}`} key={product.id} className="sg-prod-card">
              <div className="sg-prod-img">
                <img src={product.image} alt={product.name} loading="lazy" />
                <div className="sg-hand-seal">
                  <Award size={20} color="#D4AF37" />
                </div>
              </div>
              <div className="sg-prod-info">
                <span className="sg-prod-brand">Shree Ganga</span>
                <span className="sg-prod-name">{product.name}</span>
                <div className="sg-prod-stars">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={12} fill={s <= Math.round(product.rating || 0) ? '#D4AF37' : 'none'} color={s <= Math.round(product.rating || 0) ? '#D4AF37' : '#ccc'} />
                  ))}
                  <span className="sg-prod-reviews">({product.reviews || 0})</span>
                </div>
                <div className="sg-prod-prices">
                  <span className="sg-prod-curr" style={{ fontSize: '15px' }}>{product.priceRange ? product.priceRange : 'Price on Request'}</span>
                </div>
                <div style={{ fontSize: 11, color: '#007600', fontWeight: 600, marginTop: 4 }}>
                  FREE Delivery by {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </div>
                <button className="sg-prod-btn">View Details</button>
              </div>
            </Link>
          )) : null}
        </div>
      </div>

      {/* ── SHOP BY CATEGORY ── */}
      <div className="reveal" style={{ maxWidth: 1500, margin: '16px auto', padding: '40px 20px', background: '#fff', borderRadius: 4 }}>
        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#111', textAlign: 'center', marginBottom: 8, fontFamily: "'Playfair Display', serif" }}>Shop by Category</h2>
        <p style={{ textAlign: 'center', color: '#888', fontSize: 14, marginBottom: 40 }}>Explore our curated collections</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 20 }}>
          {[
            { name: 'Sarees', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=300&h=400', color: '#cc0c39' },
            { name: 'Kurtis', img: 'https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?auto=format&fit=crop&q=80&w=300&h=400', color: '#4682B4' },
            { name: 'Lehengas', img: 'https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&q=80&w=300&h=400', color: '#FF69B4' },
            { name: "Men's Wear", img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=300&h=400', color: '#1a3a5f' },
            { name: 'Handlooms', img: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80&w=300&h=400', color: '#8B6914' },
            { name: 'Wedding', img: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&q=80&w=300&h=400', color: '#800080' },
          ].map(cat => (
            <a href="#" key={cat.name} className="sg-cat-card" style={{ textDecoration: 'none', borderRadius: 8, overflow: 'hidden', position: 'relative', aspectRatio: '3/4', display: 'block', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
              <img src={cat.img} alt={cat.name} className="sg-cat-img" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s' }} />
              <div className="sg-cat-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)', transition: 'opacity 0.3s' }} />
              <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16, zIndex: 2 }}>
                <span style={{ color: '#fff', fontSize: 18, fontWeight: 700, display: 'block', marginBottom: 6 }}>{cat.name}</span>
                <span style={{ background: cat.color, color: '#fff', fontSize: 10, fontWeight: 700, padding: '4px 12px', borderRadius: 20, letterSpacing: 1, textTransform: 'uppercase' }}>Explore</span>
              </div>
            </a>
          ))}
        </div>
        <style>{`
          .sg-cat-card:hover .sg-cat-img { transform: scale(1.1); }
          .sg-cat-card:hover .sg-cat-overlay { opacity: 0.9; }
        `}</style>
      </div>

      {/* ── WHY CHOOSE SHREE GANGA ── */}
      <div className="reveal" style={{ maxWidth: 1500, margin: '16px auto', padding: '60px 40px', background: 'linear-gradient(135deg, #111 0%, #1a1a2e 50%, #0d0d0d 100%)', borderRadius: 4, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <span style={{ fontSize: 11, color: '#D4AF37', fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>{'\u2727'} Shree Ganga Promise {'\u2727'}</span>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: '#fff', fontFamily: "'Playfair Display', serif", marginBottom: 10 }}>Why Thousands Trust Us</h2>
          <p style={{ color: '#888', fontSize: 14 }}>Rudrapur Deoria se puri duniya tak {'\u2014'} humari quality bolta hai</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {[
            { icon: '\uD83C\uDFAD', title: 'Asli Handloom', desc: 'Har product government certified handloom hai. Koi naqli maal nahi, sirf asli bunai.' },
            { icon: '\uD83D\uDC51', title: '25+ Saal Ka Bharosa', desc: 'Rudrapur Deoria mein 3 showrooms ke saath, humne hazaaron parivaron ka vishwaas jeeta hai.' },
            { icon: '\u2728', title: 'Premium Quality Silk', desc: 'Banarasi, Chanderi, Tussar, Kanjivaram \u2014 har silk ka pure zari kaam ke saath best quality.' },
            { icon: '\uD83D\uDC8D', title: 'Bridal Specialist', desc: 'Shaadi ka complete collection \u2014 Lehenga, Sherwani, Designer Saree sab ek jagah.' },
          ].map(item => (
            <div key={item.title} style={{ textAlign: 'center', padding: '36px 24px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,175,55,0.15)', borderRadius: 12, transition: 'all 0.3s', cursor: 'default' }}>
              <div style={{ fontSize: 48, marginBottom: 20, filter: 'drop-shadow(0 4px 8px rgba(212,175,55,0.3))' }}>{item.icon}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#D4AF37', marginBottom: 12, letterSpacing: 0.5 }}>{item.title}</h3>
              <p style={{ fontSize: 13, color: '#aaa', lineHeight: 1.7 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CUSTOMER REVIEWS ── */}
      <div className="reveal" style={{ maxWidth: 1500, margin: '16px auto', padding: '50px 20px', background: '#fff', borderRadius: 4 }}>
        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#111', textAlign: 'center', marginBottom: 8, fontFamily: "'Playfair Display', serif" }}>What Our Customers Say</h2>
        <p style={{ textAlign: 'center', color: '#888', fontSize: 14, marginBottom: 50 }}>{'\u2B50'} Rated 4.8/5 by 5,000+ happy customers</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {[
            { name: 'Priya Sharma', loc: 'Delhi', stars: 5, text: 'Amazing quality sarees! The silk is so soft and the designs are beautiful. Will definitely order again.', product: 'Banarasi Silk Saree' },
            { name: 'Anjali Verma', loc: 'Mumbai', stars: 5, text: "Best handloom collection I've found online. The colors are vibrant and delivery was super fast!", product: 'Handloom Cotton Saree' },
            { name: 'Rahul Gupta', loc: 'Lucknow', stars: 5, text: 'Ordered kurta for my wedding. The quality exceeded my expectations. Highly recommended!', product: 'Wedding Sherwani' },
            { name: 'Neha Singh', loc: 'Jaipur', stars: 4, text: 'Beautiful kurti collection at great prices. The fabric quality is top-notch. Love it!', product: 'Designer Kurti' },
            { name: 'Meena Devi', loc: 'Varanasi', stars: 5, text: 'As someone from Varanasi, I can confirm these are genuine handloom products. Excellent quality!', product: 'Chanderi Silk Saree' },
            { name: 'Vikram Yadav', loc: 'Gorakhpur', stars: 5, text: 'Great experience shopping here. The customer service is excellent and products are premium.', product: "Men's Ethnic Set" },
          ].map((r, i) => (
            <div key={i} style={{ padding: 28, border: '1px solid #f0f0f0', borderRadius: 8, position: 'relative', transition: 'all 0.3s' }}>
              <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={16} fill={s <= r.stars ? '#D4AF37' : 'none'} color={s <= r.stars ? '#D4AF37' : '#ccc'} />
                ))}
              </div>
              <p style={{ fontSize: 14, color: '#333', lineHeight: 1.7, marginBottom: 16, fontStyle: 'italic' }}>{'"' + r.text + '"'}</p>
              <div style={{ fontSize: 11, color: '#D4AF37', fontWeight: 600, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>Purchased: {r.product}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 16 }}>
                  {r.name[0]}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#111' }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: '#888' }}>{r.loc}</div>
                </div>
                <div style={{ marginLeft: 'auto', fontSize: 10, color: '#007600', fontWeight: 700, background: '#f0fff0', padding: '3px 8px', borderRadius: 4 }}>{'\u2713'} Verified</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── AS SEEN IN / PRESS ── */}
      <div className="reveal" style={{ maxWidth: 1500, margin: '16px auto', padding: '40px 20px', background: '#fff', borderRadius: 4, textAlign: 'center' }}>
        <span style={{ fontSize: 11, color: '#D4AF37', fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Media & Press</span>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111', marginBottom: 40, fontFamily: "'Playfair Display', serif" }}>As Featured In</h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 60, flexWrap: 'wrap', opacity: 0.5 }}>
          {[
            { name: 'Amar Ujala', size: 22 },
            { name: 'Dainik Jagran', size: 20 },
            { name: 'Hindustan', size: 22 },
            { name: 'Times of India', size: 18 },
            { name: 'NDTV', size: 24 },
            { name: 'ABP News', size: 20 },
          ].map(p => (
            <div key={p.name} style={{ fontSize: p.size, fontWeight: 800, color: '#333', fontFamily: "'Inter', sans-serif", letterSpacing: -0.5, textTransform: 'uppercase', transition: 'opacity 0.3s', cursor: 'default' }}>
              {p.name}
            </div>
          ))}
        </div>
      </div>

      {/* ── PARALLAX BANNER ── */}
      <div className="reveal" style={{ maxWidth: 1500, margin: '16px auto', borderRadius: 4, overflow: 'hidden', position: 'relative', height: 350 }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1600&h=600)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(93,12,12,0.85) 0%, rgba(0,0,0,0.6) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 40 }}>
          <span style={{ fontSize: 11, color: '#D4AF37', fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 16 }}>Exclusive Heritage</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 16, maxWidth: 700 }}>Where Tradition Meets Modern Elegance</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, maxWidth: 500, lineHeight: 1.7, marginBottom: 28 }}>Har dhage mein sanskriti, har rang mein parampara. Shree Ganga ka collection dekhein aur apni khoobsoorti ko naya roop dein.</p>
          <a href="#" style={{ background: '#D4AF37', color: '#111', padding: '14px 40px', borderRadius: 4, fontSize: 13, fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 1.5 }}>Explore Collection</a>
        </div>
      </div>

      {/* ── INSTAGRAM FEED ── */}
      <div className="reveal" style={{ maxWidth: 1500, margin: '16px auto', padding: '50px 20px', background: '#fff', borderRadius: 4, textAlign: 'center' }}>
        <span style={{ fontSize: 11, color: '#D4AF37', fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Follow Us</span>
        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#111', marginBottom: 6, fontFamily: "'Playfair Display', serif" }}>@shree_ganga_handloom</h2>
        <p style={{ color: '#888', fontSize: 14, marginBottom: 30 }}>Follow us on Instagram for latest designs & offers</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
          {[
            'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=300&h=300',
            'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=300&h=300',
            'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80&w=300&h=300',
            'https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&q=80&w=300&h=300',
            'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&q=80&w=300&h=300',
            'https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?auto=format&fit=crop&q=80&w=300&h=300',
          ].map((img, i) => (
            <a key={i} href="#" style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', borderRadius: 4, display: 'block' }}>
              <img src={img} alt={`Instagram ${i+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s, filter 0.4s' }}
                onMouseEnter={e => { (e.target as HTMLImageElement).style.transform = 'scale(1.1)'; (e.target as HTMLImageElement).style.filter = 'brightness(0.7)'; }}
                onMouseLeave={e => { (e.target as HTMLImageElement).style.transform = 'scale(1)'; (e.target as HTMLImageElement).style.filter = 'none'; }}
              />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.3s', background: 'rgba(0,0,0,0.3)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '0'; }}
              >
                <span style={{ color: '#fff', fontSize: 22 }}>{'\u2764'}</span>
              </div>
            </a>
          ))}
        </div>
        <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 24, padding: '12px 30px', border: '2px solid #111', borderRadius: 30, color: '#111', fontSize: 13, fontWeight: 700, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 1, transition: 'all 0.3s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#111'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#111'; }}
        >
          <i className="fa-brands fa-instagram" /> Follow on Instagram
        </a>
      </div>

      {/* ── VIP GOLD CLUB ── */}
      <div className="reveal" style={{ maxWidth: 1500, margin: '16px auto', borderRadius: 4, overflow: 'hidden', position: 'relative', background: 'linear-gradient(135deg, #111 0%, #1a1a2e 100%)' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
          <div style={{ padding: '60px 50px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 36 }}>{'\uD83D\uDC51'}</span>
              <span style={{ fontSize: 11, color: '#D4AF37', fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' }}>Exclusive Membership</span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 16 }}>Join Shree Ganga <span style={{ color: '#D4AF37' }}>Gold Club</span></h2>
            <p style={{ color: '#aaa', fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>VIP members ko milta hai har order pe 20% extra discount, free express delivery, early access to new collections, aur exclusive bridal previews.</p>
            <div style={{ display: 'flex', gap: 20, marginBottom: 30 }}>
              {[
                { icon: '\u2B50', text: '20% Extra OFF' },
                { icon: '\uD83D\uDE9A', text: 'Free Shipping' },
                { icon: '\uD83D\uDC8E', text: 'Early Access' },
                { icon: '\uD83C\uDF81', text: 'Birthday Gift' },
              ].map(b => (
                <div key={b.text} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 18 }}>{b.icon}</span>
                  <span style={{ color: '#ddd', fontSize: 12, fontWeight: 600 }}>{b.text}</span>
                </div>
              ))}
            </div>
            <a href="#" style={{ background: 'linear-gradient(135deg, #D4AF37, #f0c954)', color: '#111', padding: '16px 40px', borderRadius: 4, fontSize: 14, fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 1.5, display: 'inline-block', alignSelf: 'flex-start', boxShadow: '0 4px 20px rgba(212,175,55,0.3)' }}>Join Gold Club {'\u2192'} Free</a>
          </div>
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <img src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=700&h=500" alt="VIP Gold Club" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #111 0%, transparent 30%)' }} />
          </div>
        </div>
      </div>

      {/* ── DOWNLOAD APP SECTION ── */}
      <div className="reveal" style={{ maxWidth: 1500, margin: '16px auto', borderRadius: 4, overflow: 'hidden', background: 'linear-gradient(135deg, #fdfaf3 0%, #fff5eb 100%)', padding: '50px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ maxWidth: 500 }}>
            <span style={{ fontSize: 11, color: '#D4AF37', fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>Mobile App</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, fontWeight: 700, color: '#111', lineHeight: 1.2, marginBottom: 16 }}>Shop Anytime, Anywhere</h2>
            <p style={{ color: '#666', fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>Download the Shree Ganga app for exclusive mobile-only deals, real-time order tracking, aur fastest checkout experience.</p>
            <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
              {[
                { icon: '\u26A1', text: 'App-Only Deals' },
                { icon: '\uD83D\uDD14', text: 'Sale Alerts' },
                { icon: '\uD83D\uDCE6', text: 'Order Tracking' },
              ].map(f => (
                <div key={f.text} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: '#fff', borderRadius: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                  <span>{f.icon}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#333' }}>{f.text}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <a href="#" style={{ background: '#111', color: '#fff', padding: '14px 28px', borderRadius: 8, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, transition: 'transform 0.2s' }}>
                <i className="fa-brands fa-google-play" style={{ fontSize: 22 }} />
                <div>
                  <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: 0.5, opacity: 0.7 }}>GET IT ON</div>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>Google Play</div>
                </div>
              </a>
              <a href="#" style={{ background: '#111', color: '#fff', padding: '14px 28px', borderRadius: 8, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, transition: 'transform 0.2s' }}>
                <i className="fa-brands fa-apple" style={{ fontSize: 24 }} />
                <div>
                  <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: 0.5, opacity: 0.7 }}>Download on</div>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>App Store</div>
                </div>
              </a>
            </div>
          </div>
          {/* Phone Mockup */}
          <div style={{ position: 'relative', width: 280, height: 500, flexShrink: 0 }}>
            <div style={{ width: '100%', height: '100%', background: '#111', borderRadius: 36, border: '4px solid #333', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.2)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 120, height: 24, background: '#111', borderRadius: '0 0 14px 14px', zIndex: 3 }} />
              <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=300&h=600" alt="App Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.5) 100%)' }} />
              <div style={{ position: 'absolute', top: 40, left: 0, right: 0, textAlign: 'center' }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: '#fff' }}>ShreeGanga</div>
                <div style={{ fontSize: 9, color: '#D4AF37', letterSpacing: 2, textTransform: 'uppercase' }}>Premium Ethnic</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── TRUST BADGES ── */}
      <div className="reveal" style={{ maxWidth: 1500, margin: '16px auto', padding: '40px 20px', background: '#fff', borderRadius: 4 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40 }}>
          {[
            { icon: '\uD83D\uDCDC', title: '100% Authentic', desc: 'Direct from artisans' },
            { icon: '\uD83D\uDD12', title: 'Secure Payment', desc: 'Encrypted checkout' },
            { icon: '\uD83D\uDE9A', title: 'Global Shipping', desc: 'Across 150+ countries' },
            { icon: '\u2B50', title: 'Top Rated', desc: '5,000+ happy reviews' }
          ].map(b => (
            <div key={b.title} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ fontSize: 32 }}>{b.icon}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#111' }}>{b.title}</div>
                <div style={{ fontSize: 12, color: '#888' }}>{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="sg-section reveal" style={{ background: '#fcfcfc', borderTop: '1px solid #eee' }}>
        <div className="sg-section-head">
          <div className="sg-section-title" style={{ fontSize: 24, fontFamily: "'Playfair Display', serif" }}>Recently Viewed</div>
        </div>
        <div style={{ display: 'flex', gap: 24, padding: '24px 20px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {products.slice(0, 8).reverse().map(p => (
            <Link href={`/product/${p.id}`} key={p.id} style={{ flex: '0 0 180px', textDecoration: 'none', transition: 'transform 0.2s' }}>
              <div style={{ width: '100%', aspectRatio: '1/1', borderRadius: 8, overflow: 'hidden', border: '1px solid #eee', marginBottom: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ fontSize: 13, color: '#111', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 4 }}>{p.name}</div>
              <div style={{ fontSize: 14, color: '#D4AF37', fontWeight: 700 }}>₹{p.price}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── INSTAGRAM FEED ── */}
      <div className="reveal" style={{ maxWidth: 1500, margin: '60px auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span style={{ fontSize: 11, color: '#D4AF37', fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' }}>Social Gallery</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: '#111', marginTop: 10 }}>Shop Our Instagram</h2>
          <div className="sg-divider" style={{ margin: '15px auto' }} />
          <p style={{ color: '#666', fontSize: 14, marginTop: 10 }}>Tag <strong style={{ color: '#111' }}>#ShreeGangaFashion</strong> to get featured</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10 }}>
          {[
            'https://images.unsplash.com/photo-1610030469983-98e550d6193c',
            'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b',
            'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5',
            'https://images.unsplash.com/photo-1549060279-7e168fcee0c2',
            'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb',
            'https://images.unsplash.com/photo-1605763240000-7e93b172d754'
          ].map((img, i) => (
            <div key={i} style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', borderRadius: 4 }}>
              <img src={`${img}?auto=format&fit=crop&q=80&w=400&h=400`} alt="Insta" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} className="sg-insta-img" />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.3s' }} className="sg-insta-overlay">
                <span style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>Shop Item</span>
              </div>
            </div>
          ))}
        </div>
        <style>{`
          .sg-insta-img:hover { transform: scale(1.1); }
          div:hover > .sg-insta-overlay { opacity: 1; }
        `}</style>
      </div>

      {/* ── ROYAL WHISPERS TESTIMONIALS ── */}
      <div className="reveal" style={{ maxWidth: 1500, margin: '100px auto', padding: '100px 20px', background: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -50, right: -50, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: -50, left: -50, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)' }} />
        
        <div style={{ textAlign: 'center', marginBottom: 60, position: 'relative', zIndex: 2 }}>
          <span style={{ fontSize: 11, color: '#D4AF37', fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase' }}>Voices of Royalty</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, color: '#111', marginTop: 15 }}>Royal Whispers</h2>
          <div className="sg-divider" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 30, position: 'relative', zIndex: 2 }}>
          {[
            { name: 'Mrs. Singhania', city: 'Mumbai', text: "The Banarasi sharee I ordered for my daughter's wedding was beyond beautiful. The craftsmanship is truly world-class. It felt like wearing a piece of history.", stars: 5 },
            { name: 'Dr. Kapoor', city: 'Delhi', text: "Shree Ganga's collection is unparalleled. Their attention to detail and the purity of their silk is what keeps me coming back. A true luxury experience.", stars: 5 },
            { name: 'Anita Verma', city: 'London', text: "I was worried about international shipping, but the sharee arrived in perfect condition. The packaging itself was royal! The fabric quality is exceptional.", stars: 5 }
          ].map((t, i) => (
            <div key={i} className="sg-testimonial-card" style={{ padding: 40, background: '#fff', border: '1px solid #f0f0f0', borderRadius: 2, transition: 'all 0.4s' }}>
              <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
                {[...Array(t.stars)].map((_, s) => <Star key={s} size={14} fill="#D4AF37" color="#D4AF37" />)}
              </div>
              <p style={{ fontSize: 16, color: '#444', lineHeight: 1.8, fontStyle: 'italic', marginBottom: 30 }}>"{t.text}"</p>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#111' }}>{t.name}</div>
                <div style={{ fontSize: 12, color: '#888', letterSpacing: 1, textTransform: 'uppercase' }}>{t.city}</div>
              </div>
            </div>
          ))}
        </div>
        <style>{`
          .sg-testimonial-card:hover { transform: translateY(-10px); box-shadow: 0 30px 60px rgba(0,0,0,0.08); border-color: #D4AF37; }
        `}</style>
      </div>

      {/* ── BRAND VISION BANNER ── */}
      <div className="reveal" style={{ maxWidth: 1500, margin: '60px auto', height: 400, borderRadius: 4, overflow: 'hidden', position: 'relative', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <img src="https://images.unsplash.com/photo-1610030469668-935142b9c7a6?auto=format&fit=crop&q=80&w=1600&h=800" alt="Vision" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />
        <div style={{ position: 'relative', zIndex: 2, padding: '0 20px', maxWidth: 800 }}>
          <h2 className="sg-unmask" style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, marginBottom: 20 }}>Empowering Tradition, Defining Elegance</h2>
          <p style={{ fontSize: 18, color: '#fff', lineHeight: 1.6, fontWeight: 300 }}>
            "Shree Ganga is not just a brand; it&apos;s a movement to keep the rhythm of the handloom alive. 
            We promise to bring the finest threads of India to your doorstep, ensuring every woman feels like royalty."
          </p>
          <div style={{ marginTop: 30, display: 'flex', gap: 20, justifyContent: 'center' }}>
            <div style={{ border: '1px solid rgba(212,175,55,0.5)', padding: '10px 20px', borderRadius: 2, fontSize: 13, color: '#D4AF37', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>Legacy Driven</div>
            <div style={{ border: '1px solid rgba(212,175,55,0.5)', padding: '10px 20px', borderRadius: 2, fontSize: 13, color: '#D4AF37', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>Artisan First</div>
            <div style={{ border: '1px solid rgba(212,175,55,0.5)', padding: '10px 20px', borderRadius: 2, fontSize: 13, color: '#D4AF37', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>Pure Quality</div>
          </div>
        </div>
      </div>

      <div className="reveal" style={{ maxWidth: 1500, margin: '16px auto 0', padding: '60px 20px', background: 'linear-gradient(135deg, #111 0%, #1a1a2e 100%)', borderRadius: 4, textAlign: 'center' }}>
        {!subscribed ? (
          <>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 10, fontFamily: "'Playfair Display', serif" }}>Get Exclusive Offers</h2>
            <p style={{ color: '#aaa', fontSize: 14, marginBottom: 30 }}>Subscribe to our newsletter and get 10% off your first order</p>
            <div style={{ display: 'flex', maxWidth: 500, margin: '0 auto', gap: 0 }}>
              <input type="email" placeholder="Enter your email address" style={{ flex: 1, padding: '14px 20px', border: '2px solid #D4AF37', borderRight: 'none', borderRadius: '4px 0 0 4px', fontSize: 14, fontFamily: "'Inter', sans-serif", outline: 'none', background: 'rgba(255,255,255,0.05)', color: '#fff' }} />
              <button onClick={() => setSubscribed(true)} style={{ padding: '14px 30px', background: '#D4AF37', color: '#111', border: 'none', borderRadius: '0 4px 4px 0', fontSize: 14, fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: 1, fontFamily: "'Inter', sans-serif" }}>Subscribe</button>
            </div>
            <p style={{ color: '#555', fontSize: 11, marginTop: 14 }}>No spam, unsubscribe anytime. Your email is safe with us.</p>
          </>
        ) : (
          <div style={{ padding: '20px 0', animation: 'sgFadeIn 0.5s' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>\u2728</div>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: '#D4AF37', marginBottom: 10, fontFamily: "'Playfair Display', serif" }}>Welcome to the Club!</h2>
            <p style={{ color: '#fff', fontSize: 16 }}>Check your email for your 10% discount code.</p>
          </div>
        )}
        <style>{`@keyframes sgFadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      </div>
      {/* ── EXCLUSIVE CLUB BADGE ── */}
      <div style={{ position: 'fixed', bottom: 30, left: 30, zIndex: 9997, background: '#111', color: '#D4AF37', padding: '10px 20px', borderRadius: 40, display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 10px 40px rgba(0,0,0,0.3)', border: '1px solid #D4AF37', cursor: 'pointer', transition: 'all 0.3s' }} className="sg-club-badge">
        <Star size={14} fill="#D4AF37" />
        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase' }}>Join The Royal Club</span>
      </div>
      <style>{`.sg-club-badge:hover { transform: scale(1.1); background: #D4AF37; color: #111; }`}</style>
      {/* ── VERTICAL BACK TO TOP ── */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{ position: 'fixed', right: 30, top: '50%', transform: 'translateY(-50%) rotate(90deg)', transformOrigin: 'right center', zIndex: 9996, background: 'transparent', border: 'none', color: '#888', fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 15, transition: 'color 0.3s' }}
        className="sg-btt-vert"
      >
        <span style={{ width: 40, height: 1, background: '#ccc' }} /> Back To Top
      </button>
      {/* ── FEATURED IN BRAND BAR ── */}
      <div className="reveal" style={{ maxWidth: 1500, margin: '80px auto', borderTop: '1px solid #eee', borderBottom: '1px solid #eee', padding: '40px 0' }}>
        <div style={{ textAlign: 'center', fontSize: 11, color: '#888', fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 30 }}>As Seen In</div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 60, opacity: 0.5, filter: 'grayscale(100%) brightness(0)' }}>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 24, letterSpacing: 2 }}>VOGUE</div>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 20, letterSpacing: 4 }}>BAZAAR</div>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 22, letterSpacing: 2 }}>ELLE</div>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 20, letterSpacing: 3 }}>COSMO</div>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 24, letterSpacing: 2 }}>GRAZIA</div>
        </div>
      </div>

      <div className="sg-cursor-follower" />
      <style>{`.sg-btt-vert:hover { color: #D4AF37; } .sg-btt-vert:hover span { background: #D4AF37; }`}</style>
    </main>
  );
}
