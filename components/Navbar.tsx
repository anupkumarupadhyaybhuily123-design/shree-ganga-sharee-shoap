"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, User, ChevronDown, Package, Heart, ShoppingBag, MapPin, Bell, Menu, X, Store, Mic, Shield, Truck, Award, Phone } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import Logo from './Logo';

const CATEGORIES = ['Women', 'Men', 'Girls', 'Kids', 'Handlooms', 'Wedding Store'];

export default function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchVal, setSearchVal] = useState(searchParams.get('q') || '');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchVal.trim()) {
      router.push(`/?q=${encodeURIComponent(searchVal.trim())}`);
    } else {
      router.push('/');
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Dancing+Script:wght@700&family=Cinzel:wght@700&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        /* ── ANNOUNCEMENT BAR ── */
        .sg-announce {
          background: linear-gradient(90deg, #D4AF37, #8B6914, #D4AF37);
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          padding: 8px 0;
          overflow: hidden;
          white-space: nowrap;
        }
        .sg-announce-scroll {
          display: inline-block;
          animation: scrollAnnounce 25s linear infinite;
        }
        @keyframes scrollAnnounce {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .sg-announce-scroll span {
          margin: 0 60px;
        }

        /* ── TOP BAR ── */
        .sg-topbar {
          background: #0f1111;
          color: #ccc;
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          padding: 6px 24px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 20px;
        }
        .sg-topbar a { color: #ccc; text-decoration: none; }
        .sg-topbar a:hover { color: #ff9900; }

        /* ── MAIN NAVBAR ── */
        .sg-navbar {
          background: #131921 !important;
          font-family: 'Inter', sans-serif;
          position: sticky;
          top: 0;
          z-index: 1000;
          transition: background 0.3s, box-shadow 0.3s;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .sg-navbar.scrolled { 
          background: #131921 !important;
          box-shadow: 0 4px 24px rgba(0,0,0,0.4); 
        }

        .sg-nav-inner {
          max-width: 1500px;
          margin: 0 auto;
          padding: 10px 20px;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        /* LOGO */
        .sg-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          border: 1px solid transparent;
          padding: 4px;
          border-radius: 2px;
          transition: border-color 0.2s;
          flex-shrink: 0;
          height: 65px;
        }
        .sg-logo:hover { border-color: #fff; }
        .sg-logo img {
          height: 100%;
          object-fit: contain;
        }

        /* DELIVER TO */
        .sg-deliver {
          display: flex;
          flex-direction: column;
          cursor: pointer;
          border: 1px solid transparent;
          padding: 6px 8px;
          border-radius: 2px;
          transition: border-color 0.2s;
          flex-shrink: 0;
        }
        .sg-deliver:hover { border-color: #fff; }
        .sg-deliver-label { font-size: 11px; color: #ccc; display: flex; align-items: center; gap: 4px; }
        .sg-deliver-val { font-size: 13px; color: #fff; font-weight: 700; }

        /* SEARCH */
        .sg-search {
          flex: 1;
          display: flex;
          align-items: center;
          height: 40px;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 0 0 3px transparent;
          transition: box-shadow 0.2s;
          min-width: 0;
        }
        .sg-search:focus-within { box-shadow: 0 0 0 3px #ff9900; }
        .sg-search-cat {
          background: #f3f3f3;
          border: none;
          height: 100%;
          padding: 0 14px;
          font-size: 12px;
          color: #333;
          cursor: pointer;
          border-right: 1px solid #ccc;
          font-family: 'Inter', sans-serif;
          flex-shrink: 0;
        }
        .sg-search-input {
          flex: 1;
          width: 100%;
          border: none;
          outline: none;
          padding: 0 14px;
          font-size: 14px;
          color: #111;
          font-family: 'Inter', sans-serif;
          height: 40px;
          background: #fff;
        }
        .sg-search-btn {
          background: #ff9900;
          border: none;
          height: 40px;
          width: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
          flex-shrink: 0;
        }
        .sg-voice-btn {
          background: transparent;
          border: none;
          height: 100%;
          width: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
        }
        .sg-voice-btn:hover { background: #f3f3f3; }
        .sg-search-wrap { position: relative; flex: 1; height: 40px; display: flex; align-items: center; background: #fff; }
        .sg-search-suggest {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          right: 0;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 15px 50px rgba(0,0,0,0.15);
          z-index: 1001;
          padding: 16px;
          display: none;
          border: 1px solid #eee;
        }
        .sg-search:focus-within .sg-search-suggest { display: block; }
        .sg-suggest-head { font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; font-weight: 700; }
        .sg-suggest-list { display: flex; flex-wrap: wrap; gap: 8px; }
        .sg-suggest-item {
          padding: 6px 14px;
          background: #f5f5f5;
          border-radius: 20px;
          font-size: 12px;
          color: #333;
          text-decoration: none;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .sg-suggest-item:hover { background: #111; color: #fff; transform: translateY(-2px); }

        /* MEGA MENU */
        .sg-mega-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: #fff;
          box-shadow: 0 25px 60px rgba(0,0,0,0.2);
          display: none;
          z-index: 1000;
          padding: 40px 0;
          border-top: 1px solid #eee;
          animation: megaSlide 0.3s ease-out;
        }
        @keyframes megaSlide { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .sg-subnav-drop-wrap.mega:hover .sg-mega-menu { display: block; }
        .sg-mega-inner { max-width: 1500px; margin: 0 auto; padding: 0 20px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; }
        .sg-mega-col h3 { font-size: 14px; color: #111; font-weight: 800; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px; border-left: 3px solid #D4AF37; padding-left: 10px; }
        .sg-mega-col a { display: block; font-size: 14px; color: #555; text-decoration: none; margin-bottom: 12px; transition: all 0.2s; }
        .sg-mega-col a:hover { color: #D4AF37; padding-left: 6px; }
        .sg-mega-promo { position: relative; border-radius: 8px; overflow: hidden; height: 280px; }
        .sg-mega-promo img { width: 100%; height: 100%; object-fit: cover; }
        .sg-mega-promo-text { position: absolute; bottom: 20px; left: 20px; right: 20px; color: #fff; }
        .sg-mega-promo-text h4 { font-family: 'Playfair Display', serif; font-size: 20px; margin-bottom: 4px; }
        .sg-mega-promo-text span { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #D4AF37; font-weight: 700; }

        /* EXPERT WIDGET */
        .sg-expert-widget {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 20px 8px 8px;
          background: #fff;
          border-radius: 40px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.15);
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          text-decoration: none;
          border: 1px solid #eee;
        }
        .sg-expert-widget:hover { transform: translateY(-5px) scale(1.05); box-shadow: 0 15px 50px rgba(0,0,0,0.25); }
        .sg-expert-avatar { width: 44px; height: 44px; border-radius: 50%; background: #25D366; display: flex; align-items: center; justify-content: center; color: #fff; position: relative; }
        .sg-expert-avatar::after { content: ''; position: absolute; inset: -4px; border-radius: 50%; border: 2px solid #25D366; animation: sgPulse 2s infinite; }
        @keyframes sgPulse { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(1.3); opacity: 0; } }
        .sg-expert-text { display: flex; flex-direction: column; }
        .sg-expert-label { font-size: 10px; color: #888; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; }
        .sg-expert-name { font-size: 13px; font-weight: 700; color: #111; }
        .sg-expert-val { font-size: 13px; color: #111; font-weight: 700; }

        /* NAV ITEMS */
        .sg-nav-items {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-shrink: 0;
          margin-right: 40px; /* Shift to left */
        }
        .sg-nav-item {
          display: flex;
          flex-direction: column;
          padding: 6px 10px;
          cursor: pointer;
          border: 1px solid transparent;
          border-radius: 2px;
          transition: border-color 0.2s;
          text-decoration: none;
          color: #fff;
          position: relative;
        }
        .sg-nav-item:hover { border-color: #fff; }
        .sg-nav-label { font-size: 11px; color: #ccc; white-space: nowrap; }
        .sg-nav-val { font-size: 13px; color: #fff; font-weight: 700; white-space: nowrap; display: flex; align-items: center; gap: 3px; }

        /* CART */
        .sg-cart {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          border: 1px solid transparent;
          border-radius: 2px;
          transition: border-color 0.2s;
          text-decoration: none;
          color: #fff;
          flex-shrink: 0;
          cursor: pointer;
        }
        .sg-cart:hover { border-color: #fff; }
        .sg-cart-icon { position: relative; }
        .sg-cart-badge {
          position: absolute;
          top: -8px;
          left: 12px;
          background: #ff9900;
          color: #131921;
          font-size: 11px;
          font-weight: 800;
          height: 18px;
          min-width: 18px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 3px;
          font-family: 'Inter', sans-serif;
        }
        .sg-cart-text { font-size: 13px; font-weight: 700; }

        /* DROPDOWN */
        .sg-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: #fff;
          border: 1px solid #d5d9d9;
          border-radius: 8px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.2);
          min-width: 220px;
          display: none;
          z-index: 9999;
          overflow: hidden;
        }
        .sg-nav-item:hover .sg-dropdown,
        .sg-dropdown-trigger:hover .sg-dropdown { display: block; }
        .sg-dropdown::before {
          content: '';
          position: absolute;
          top: -8px;
          right: 20px;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-bottom: 8px solid #fff;
        }
        .sg-drop-header {
          background: #f0f2f2;
          padding: 14px 18px;
          font-size: 13px;
          color: #555;
          border-bottom: 1px solid #e7e7e7;
        }
        .sg-drop-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 18px;
          font-size: 14px;
          color: #111;
          text-decoration: none;
          transition: background 0.15s;
          font-family: 'Inter', sans-serif;
        }
        .sg-drop-item:hover { background: #f0f2f2; color: #c45500; }
        .sg-drop-item svg { color: #555; }
        .sg-drop-divider { height: 1px; background: #e7e7e7; }
        /* ── BOTTOM NAV STRIP ── */
        .sg-subnav {
          background: #232f3e;
          font-family: 'Inter', sans-serif;
          position: relative;
        }
        .sg-subnav-inner {
          max-width: 1500px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          align-items: center;
          gap: 0;
          height: 38px;
        }
        .sg-subnav-item {
          color: #fff;
          font-size: 13px;
          font-weight: 500;
          padding: 0 14px;
          height: 100%;
          display: flex;
          align-items: center;
          text-decoration: none;
          white-space: nowrap;
          border: 1px solid transparent;
          transition: border-color 0.15s;
        }
        .sg-subnav-item:hover { border-color: #fff; }
        .sg-subnav-item.hot { color: #D4AF37; font-weight: 700; }
        .sg-subnav-item.hot:hover { color: #f0c954; }

        /* ── MOBILE BOTTOM NAV ── */
        .sg-bottom-nav {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(19, 25, 33, 0.95);
          backdrop-filter: blur(16px);
          border-top: 1px solid rgba(255,255,255,0.08);
          z-index: 2000;
          padding: 10px 20px 20px;
          justify-content: space-between;
          align-items: center;
        }
        .sg-bottom-nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #8d9191;
          text-decoration: none;
          font-size: 10px;
          gap: 6px;
          transition: color 0.2s;
        }
        .sg-bottom-nav-item.active, .sg-bottom-nav-item:hover { color: #D4AF37; }
        .sg-bottom-badge {
          position: absolute;
          top: -6px;
          right: -8px;
          background: #D4AF37;
          color: #111;
          font-size: 9px;
          font-weight: 800;
          padding: 2px 5px;
          border-radius: 10px;
        }

        @media (max-width: 768px) {
          .sg-bottom-nav { display: flex; }
          .sg-subnav { display: none; }
          body { padding-bottom: 70px; }
        }

        /* ── MOBILE NAVBAR TWEAKS ── */
        /* SUBNAV DROPDOWN */
        .sg-subnav-drop-wrap {
          position: relative;
          height: 100%;
          display: flex;
        }
        .sg-subnav-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          background: #fff;
          border: 1px solid #d5d9d9;
          border-radius: 4px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
          min-width: 200px;
          display: none;
          z-index: 9999;
          padding: 8px 0;
        }
        .sg-subnav-drop-wrap:hover .sg-subnav-dropdown { display: block; }
        .sg-sub-drop-item {
          display: block;
          padding: 8px 16px;
          font-size: 13px;
          color: #111;
          text-decoration: none;
          transition: background 0.15s;
        }
        .sg-sub-drop-item:hover { background: #f0f2f2; color: #c45500; }
      `}} />

      {/* Announcement Bar */}
      <div className="sg-announce">
        <div className="sg-announce-scroll">
          <span>{'\uD83C\uDF89'} Flat 30% OFF on Bridal Collection! Use Code: BRIDE30</span>
          <span>{'\uD83D\uDE9A'} FREE Delivery on Orders Above {'\u20b9'}499</span>
          <span>{'\u2728'} New Arrivals: Premium Banarasi Silk Sharees Now Available!</span>
          <span>{'\uD83D\uDCA5'} Buy 2 Get 1 Free on All Kurtis</span>
          <span>{'\uD83C\uDFC6'} 100% Authentic Handloom Products - Certified</span>
        </div>
      </div>

      {/* Top bar */}
      <div className="sg-topbar">
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#fff', opacity: 0.9 }}>
            <Shield size={12} color="#D4AF37" /> 100% Authentic Handloom
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#fff', opacity: 0.9 }}>
            <Truck size={12} color="#D4AF37" /> Free Global Shipping
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#fff', opacity: 0.9 }}>
            <Award size={12} color="#D4AF37" /> Heritage Since 1999
          </div>
        </div>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <select style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: 11, outline: 'none', cursor: 'pointer' }}>
            <option style={{ color: '#000' }}>English</option>
            <option style={{ color: '#000' }}>हिन्दी</option>
          </select>
          <a href="#" style={{ fontSize: 11, color: '#fff', textDecoration: 'none' }}>Sell on ShreeGanga</a>
          <a href="#" style={{ fontSize: 11, color: '#fff', textDecoration: 'none' }}>Track Order</a>
          <a href="#" style={{ fontSize: 11, color: '#fff', textDecoration: 'none' }}>Help Center</a>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`sg-navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="sg-nav-inner">

          {/* Logo */}
          <Link href="/" className="sg-logo">
            <Logo />
          </Link>

          {/* Deliver To */}
          <div className="sg-deliver">
            <span className="sg-deliver-label"><MapPin size={12} /> Deliver to</span>
            <span className="sg-deliver-val">India</span>
          </div>

          {/* Search */}
          <div className="sg-search">
            <select className="sg-search-cat">
              <option>All</option>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <div className="sg-search-wrap">
              <input
                className="sg-search-input"
                type="text"
                placeholder="Search ShreeGanga.in"
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
              />
              <button className="sg-voice-btn" title="Search with your voice">
                <Mic size={18} color="#888" />
              </button>
              <div className="sg-search-suggest">
                <div className="sg-suggest-head">Trending Searches</div>
                <div className="sg-suggest-list">
                  <a href="#" className="sg-suggest-item">Banarasi Sharee</a>
                  <a href="#" className="sg-suggest-item">Bridal Lehenga</a>
                  <a href="#" className="sg-suggest-item">Silk Kurta</a>
                  <a href="#" className="sg-suggest-item">Wedding Store</a>
                  <a href="#" className="sg-suggest-item">Handloom Cotton</a>
                </div>
              </div>
            </div>
            <button className="sg-search-btn" onClick={() => handleSearch()}>
              <Search size={18} color="#131921" />
            </button>
          </div>

          {/* Nav Items */}
          <div className="sg-nav-items">

            {/* Account */}
            <div className="sg-nav-item" style={{ position: 'relative' }}>
              <span className="sg-nav-val">Login <ChevronDown size={13} /></span>
              <div className="sg-dropdown">
                <div className="sg-drop-header">New customer? <a href="#" style={{ color: '#007185', fontWeight: 600 }}>Start here</a></div>
                <Link href="/admin" className="sg-drop-item"><User size={15} /> My Profile</Link>
                <Link href="/admin" className="sg-drop-item"><Package size={15} /> Admin Panel</Link>
                <div className="sg-drop-divider" />
                <Link href="#" className="sg-drop-item"><Heart size={15} /> Wishlist</Link>
                <Link href="#" className="sg-drop-item"><ShoppingBag size={15} /> My Orders</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Sub Nav */}
        <div className="sg-subnav">
          <div className="sg-subnav-inner">
            <a href="#" className="sg-subnav-item sg-magnetic" style={{ fontWeight: 700 }}><Menu size={16} style={{ marginRight: 6 }} />All</a>
            {CATEGORIES.map(cat => {
              if (cat === 'Women') {
                return (
                  <div key={cat} className="sg-subnav-drop-wrap">
                    <a href="#" className="sg-subnav-item sg-magnetic" style={{ gap: 4 }}>
                      {cat} <ChevronDown size={12} />
                    </a>
                    <div className="sg-subnav-dropdown">
                      <a href="#" className="sg-sub-drop-item">Sharee</a>
                      <a href="#" className="sg-sub-drop-item">Kurti</a>
                      <a href="#" className="sg-sub-drop-item">Lehenga</a>
                      <a href="#" className="sg-sub-drop-item">Salwar Kameez</a>
                      <a href="#" className="sg-sub-drop-item">Palazzo Suit</a>
                      <a href="#" className="sg-sub-drop-item">Sharara Suit</a>
                      <a href="#" className="sg-sub-drop-item">T-shirt</a>
                      <a href="#" className="sg-sub-drop-item">Dupatta</a>
                      <a href="#" className="sg-sub-drop-item">Churidar</a>
                    </div>
                  </div>
                );
              }
              if (cat === 'Men') {
                return (
                  <div key={cat} className="sg-subnav-drop-wrap">
                    <a href="#" className="sg-subnav-item sg-magnetic" style={{ gap: 4 }}>
                      {cat} <ChevronDown size={12} />
                    </a>
                    <div className="sg-subnav-dropdown">
                      <a href="#" className="sg-sub-drop-item">T-shirt</a>
                      <a href="#" className="sg-sub-drop-item">Shirt (Formal / Casual)</a>
                      <a href="#" className="sg-sub-drop-item">Polo T-shirt</a>
                      <a href="#" className="sg-sub-drop-item">Kurta</a>
                      <a href="#" className="sg-sub-drop-item">Hoodie</a>
                      <a href="#" className="sg-sub-drop-item">Sweatshirt</a>
                      <a href="#" className="sg-sub-drop-item">Jacket</a>
                      <a href="#" className="sg-sub-drop-item">Blazer</a>
                      <a href="#" className="sg-sub-drop-item">Coat</a>
                      <a href="#" className="sg-sub-drop-item">Sweater</a>
                      <a href="#" className="sg-sub-drop-item">Vest (Baniyan)</a>
                      <a href="#" className="sg-sub-drop-item">Tank Top</a>
                    </div>
                  </div>
                );
              }
              if (cat === 'Girls') {
                return (
                  <div key={cat} className="sg-subnav-drop-wrap">
                    <a href="#" className="sg-subnav-item sg-magnetic" style={{ gap: 4 }}>
                      {cat} <ChevronDown size={12} />
                    </a>
                    <div className="sg-subnav-dropdown">
                      <a href="#" className="sg-sub-drop-item">Top</a>
                      <a href="#" className="sg-sub-drop-item">T-shirt</a>
                      <a href="#" className="sg-sub-drop-item">Shirt</a>
                      <a href="#" className="sg-sub-drop-item">Blouse</a>
                      <a href="#" className="sg-sub-drop-item">Crop Top</a>
                      <a href="#" className="sg-sub-drop-item">Tunic</a>
                      <a href="#" className="sg-sub-drop-item">Tank Top</a>
                      <a href="#" className="sg-sub-drop-item">Camisole</a>
                      <a href="#" className="sg-sub-drop-item">Hoodie</a>
                      <a href="#" className="sg-sub-drop-item">Sweatshirt</a>
                      <a href="#" className="sg-sub-drop-item">Sweater</a>
                      <a href="#" className="sg-sub-drop-item">Jacket</a>
                      <a href="#" className="sg-sub-drop-item">Blazer</a>
                      <a href="#" className="sg-sub-drop-item">Jeans</a>
                      <a href="#" className="sg-sub-drop-item">Pants / Trousers</a>
                      <a href="#" className="sg-sub-drop-item">Leggings</a>
                      <a href="#" className="sg-sub-drop-item">Jeggings</a>
                      <a href="#" className="sg-sub-drop-item">Shorts</a>
                      <a href="#" className="sg-sub-drop-item">Skirt</a>
                      <a href="#" className="sg-sub-drop-item">Palazzo</a>
                      <a href="#" className="sg-sub-drop-item">Culottes</a>
                      <a href="#" className="sg-sub-drop-item">Track Pants</a>
                      <a href="#" className="sg-sub-drop-item">Joggers</a>
                    </div>
                  </div>
                );
              }
              if (cat === 'Kids') {
                return (
                  <div key={cat} className="sg-subnav-drop-wrap">
                    <a href="#" className="sg-subnav-item sg-magnetic" style={{ gap: 4 }}>
                      {cat} <ChevronDown size={12} />
                    </a>
                    <div className="sg-subnav-dropdown">
                      <a href="#" className="sg-sub-drop-item">Onesie</a>
                      <a href="#" className="sg-sub-drop-item">Romper</a>
                      <a href="#" className="sg-sub-drop-item">Jumpsuit</a>
                      <a href="#" className="sg-sub-drop-item">Playsuit</a>
                      <a href="#" className="sg-sub-drop-item">Dungarees</a>
                      <a href="#" className="sg-sub-drop-item">Bodysuit</a>
                      <a href="#" className="sg-sub-drop-item">Sleepsuit</a>
                      <a href="#" className="sg-sub-drop-item">Night Suit</a>
                      <a href="#" className="sg-sub-drop-item">Baby Suit (2-piece / 3-piece)</a>
                      <a href="#" className="sg-sub-drop-item">Frock</a>
                    </div>
                  </div>
                );
              }
              if (cat === 'Handlooms') {
                return (
                  <div key={cat} className="sg-subnav-drop-wrap mega">
                    <a href="#" className="sg-subnav-item sg-magnetic" style={{ gap: 4 }}>
                      {cat} <ChevronDown size={12} />
                    </a>
                    <div className="sg-mega-menu">
                      <div className="sg-mega-inner">
                        <div className="sg-mega-col">
                          <h3>Popular Fabrics</h3>
                          <a href="#">Cotton Sharees</a>
                          <a href="#">Silk Sharees</a>
                          <a href="#">Khadi Collection</a>
                          <a href="#">Handspun Yarn</a>
                          <a href="#">Linen Mix</a>
                        </div>
                        <div className="sg-mega-col">
                          <h3>Men's Handloom</h3>
                          <a href="#">Khadi Kurta</a>
                          <a href="#">Handloom Shirts</a>
                          <a href="#">Dhoti & Lungi</a>
                          <a href="#">Stoles & Shawls</a>
                        </div>
                        <div className="sg-mega-col">
                          <h3>Handcrafted</h3>
                          <a href="#">Dupattas</a>
                          <a href="#">Stoles</a>
                          <a href="#">Handwoven Bedsheets</a>
                        </div>
                        <div className="sg-mega-promo">
                          <img src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80&w=300&h=400" alt="Handloom" />
                          <div className="sg-mega-promo-text">
                            <h4>Handloom Heritage</h4>
                            <span>100% Authentic Craft</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              if (cat === 'Wedding Store') {
                return (
                  <div key={cat} className="sg-subnav-drop-wrap mega">
                    <a href="#" className="sg-subnav-item sg-magnetic" style={{ gap: 4 }}>
                      {cat} <ChevronDown size={12} />
                    </a>
                    <div className="sg-mega-menu">
                      <div className="sg-mega-inner">
                        <div className="sg-mega-col">
                          <h3>Bridal Wear</h3>
                          <a href="#">Bridal Lehengas</a>
                          <a href="#">Wedding Silk Sharees</a>
                          <a href="#">Heavy Anarkali</a>
                          <a href="#">Reception Gowns</a>
                        </div>
                        <div className="sg-mega-col">
                          <h3>Groom's Collection</h3>
                          <a href="#">Sherwani</a>
                          <a href="#">Bandhgala Suits</a>
                          <a href="#">Wedding Kurta</a>
                          <a href="#">Jodhpuri Suits</a>
                        </div>
                        <div className="sg-mega-col">
                          <h3>Wedding Guest</h3>
                          <a href="#">Designer Sharees</a>
                          <a href="#">Indo-Western</a>
                          <a href="#">Party Wear Kurta</a>
                        </div>
                        <div className="sg-mega-promo">
                          <img src="https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&q=80&w=300&h=400" alt="Wedding" />
                          <div className="sg-mega-promo-text">
                            <h4>Bridal 2024</h4>
                            <span>New Collection Live</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return <a key={cat} href="#" className="sg-subnav-item">{cat}</a>;
            })}
            <a href="#" className="sg-subnav-item hot">⚡ Today's Deals</a>
            <a href="#" className="sg-subnav-item hot">🔥 New Arrivals</a>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="sg-bottom-nav">
        <Link href="/" className="sg-bottom-nav-item active">
          <Menu size={20} />
          <span>Home</span>
        </Link>
        <Link href="#" className="sg-bottom-nav-item">
          <Search size={20} />
          <span>Explore</span>
        </Link>
        <Link href="#" className="sg-bottom-nav-item">
          <Store size={20} />
          <span>Stores</span>
        </Link>
        <Link href="#" className="sg-bottom-nav-item">
          <Heart size={20} />
          <span>Saved</span>
        </Link>
        <Link href="#" className="sg-bottom-nav-item">
          <User size={20} />
          <span>Profile</span>
        </Link>
      </div>
      {/* Expert Widget */}
      <a href="https://wa.me/918953013451" target="_blank" rel="noopener noreferrer" className="sg-expert-widget">
        <div className="sg-expert-avatar">
          <Phone size={20} />
        </div>
        <div className="sg-expert-text">
          <span className="sg-expert-label">Personal Shopper</span>
          <span className="sg-expert-name">Book Video Consultation</span>
        </div>
      </a>
    </>
  );
}
