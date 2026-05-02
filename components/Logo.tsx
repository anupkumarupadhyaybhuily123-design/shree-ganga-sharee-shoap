"use client";
import React from 'react';

export default function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
      {/* ── IMAGE-BASED EMBLEM ── */}
      <div style={{ 
        position: 'relative', 
        width: '60px', 
        height: '60px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        borderRadius: '50%',
        overflow: 'hidden',
        border: '1px solid rgba(212, 175, 55, 0.3)',
        flexShrink: 0,
        boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
      }}>
        <img 
          src="https://i.ibb.co/N6ZMHJrp/SG-no-tagline.jpg" 
          alt="SG Emblem" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* ── 3D BRAND TYPOGRAPHY ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
          <span style={{ 
            fontSize: '36px', 
            fontWeight: '900', 
            color: '#fff', 
            fontFamily: "'Playfair Display', serif",
            letterSpacing: '-1.5px',
            lineHeight: 1,
            textShadow: `
              1px 1px 0px #8d9191,
              2px 2px 0px #8d9191,
              3px 3px 4px rgba(0,0,0,0.4)
            `
          }}>
            Shree
          </span>
          <span style={{ 
            fontSize: '30px', 
            fontWeight: '900', 
            color: '#D4AF37', 
            fontFamily: "'Cinzel', serif",
            letterSpacing: '1px',
            lineHeight: 1,
            marginLeft: '4px',
            textShadow: `
              1px 1px 0px #8B4513,
              2px 2px 0px #8B4513,
              3px 3px 4px rgba(0,0,0,0.4)
            `
          }}>
            Ganga
          </span>
        </div>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          marginTop: '4px'
        }}>
          <div style={{ height: '1.5px', flex: 1, background: '#D4AF37' }}></div>
          <span style={{ 
            fontSize: '10px', 
            color: '#fff', 
            letterSpacing: '2px', 
            fontWeight: '800',
            textTransform: 'uppercase',
            fontFamily: "'Inter', sans-serif",
            whiteSpace: 'nowrap'
          }}>
            Handloom & Readymade
          </span>
          <div style={{ height: '1.5px', flex: 1, background: '#D4AF37' }}></div>
        </div>
      </div>
    </div>
  );
}
