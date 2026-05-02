"use client";
import React from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Youtube, Twitter, Mail, Phone, MapPin, User, Users, Headphones, Globe, ChevronsUpDown } from 'lucide-react';

const FOOTER_COLS = [
  {
    title: 'Our Heritage',
    links: ['About Shree Ganga', 'The Art of Handloom', 'Our Weavers', 'Sustainability'],
  },
  {
    title: 'Collections',
    links: ['Premium Silk Sarees', 'Designer Bridal Wear', 'Handloom Kurtis', "Men's Ethnic"],
  },
  {
    title: 'Customer Care',
    links: ['Contact Us', 'Store Locator', 'Bespoke Services', 'Style Consultation'],
  },
  {
    title: 'Legal',
    links: ['Privacy Policy', 'Terms of Service', 'Authenticity Guarantee'],
  },
];

export default function Footer() {
  return (
    <footer style={{ fontFamily: "'Inter', sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Dancing+Script:wght@700&display=swap');
        
        .sg-signature {
          font-family: 'Dancing Script', cursive;
          font-size: 24px;
          color: rgba(212,175,55,0.4);
          text-align: center;
          margin-top: 30px;
          letter-spacing: 1px;
        }

        /* ── BACK TO TOP ── */
        .sg-btt {
          background: #1a1a1a;
          color: #fff;
          text-align: center;
          padding: 16px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
          font-family: 'Inter', sans-serif;
          border: none;
          width: 100%;
          display: block;
        }
        .sg-btt:hover { background: #2a2a2a; color: #D4AF37; }

        /* ── MAIN FOOTER ── */
        .sg-foot-main {
          background: #111;
          padding: 44px 0 24px;
        }
        .sg-foot-inner {
          max-width: 1500px;
          margin: 0 auto;
          padding: 0 40px;
        }

        /* COLS */
        .sg-foot-cols {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
          padding-bottom: 40px;
          border-bottom: 1px solid #3a4f63;
        }
        .sg-foot-col h4 {
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 16px;
          font-family: 'Inter', sans-serif;
        }
        .sg-foot-links { list-style: none; padding: 0; margin: 0; }
        .sg-foot-links li { margin-bottom: 10px; }
        .sg-foot-links a {
          color: #a0a0a0;
          text-decoration: none;
          font-size: 13px;
          transition: color 0.15s;
          font-family: 'Inter', sans-serif;
        }
        .sg-foot-links a:hover { color: #D4AF37; }

        /* MIDDLE */
        .sg-foot-mid {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 28px 0;
          border-bottom: 1px solid #3a4f63;
          gap: 20px;
          flex-wrap: wrap;
        }
        .sg-foot-logo { color: #fff; font-size: 22px; font-weight: 800; font-family: 'Inter', sans-serif; }
        .sg-foot-logo span { color: #ff9900; }

        /* SOCIALS */
        .sg-socials { display: flex; gap: 12px; }
        .sg-social {
          width: 40px; height: 40px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #d5dbdb;
          text-decoration: none;
          transition: all 0.2s;
        }
        .sg-social:hover { background: #ff9900; border-color: #ff9900; color: #131921; transform: translateY(-3px); }

        .sg-phone-pill:hover { background: #ff9900 !important; color: #131921 !important; border-color: #ff9900 !important; }
        .sg-phone-pill:hover svg { color: #131921 !important; }

        /* CONTACT */
        .sg-foot-contact { display: flex; flex-direction: column; gap: 8px; }
        .sg-contact-row { display: flex; align-items: center; gap: 10px; color: #d5dbdb; font-size: 13px; font-family: 'Inter', sans-serif; }
        .sg-contact-row svg { color: #ff9900; flex-shrink: 0; }

        /* BOTTOM */
        .sg-foot-bottom {
          background: #131921;
          padding: 16px 40px;
        }
        .sg-foot-bottom-inner {
          max-width: 1500px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .sg-copyright { font-size: 12px; color: #8d9191; font-family: 'Inter', sans-serif; }
        .sg-foot-bottom-links { display: flex; gap: 20px; flex-wrap: wrap; }
        .sg-foot-bottom-links a { font-size: 12px; color: #8d9191; text-decoration: none; font-family: 'Inter', sans-serif; }
        .sg-foot-bottom-links a:hover { color: #ff9900; }

        /* PAY */
        .sg-pay { display: flex; gap: 8px; align-items: center; }
        .sg-pay-icon {
          background: #fff;
          border-radius: 4px;
          padding: 4px 10px;
          font-size: 11px;
          font-weight: 800;
          color: #111;
          font-family: 'Inter', sans-serif;
          border: 1px solid #e7e7e7;
        }
        .sg-pay-label { font-size: 12px; color: #8d9191; font-family: 'Inter', sans-serif; }

        /* ── LOCALE & PREFS ── */
        .sg-foot-locale {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 30px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          flex-wrap: wrap;
        }
        .sg-locale-btn {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.15);
          color: #ccc;
          padding: 8px 16px;
          border-radius: 4px;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }
        .sg-locale-btn:hover { border-color: #D4AF37; color: #fff; }
        .sg-locale-btn option {
          background: #111;
          color: #fff;
          padding: 10px;
        }
      `}} />

      {/* Back to Top */}
      <button className="sg-btt" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        Back to top ↑
      </button>

      {/* Main Footer */}
      <div className="sg-foot-main">
        
        {/* Brand Promise Strip */}
        <div style={{ background: '#1a1a1a', padding: '40px 0', borderBottom: '1px solid #333' }}>
          <div className="sg-foot-inner" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {[
              { icon: <Globe size={24} color="#D4AF37" />, title: 'Global Delivery', sub: 'Shipping to 150+ countries' },
              { icon: <Headphones size={24} color="#D4AF37" />, title: 'Expert Styling', sub: 'Talk to our consultants' },
              { icon: <MapPin size={24} color="#D4AF37" />, title: 'Premium Stores', sub: 'Visit us in Rudrapur & Gorakhpur' },
              { icon: <ChevronsUpDown size={24} color="#D4AF37" />, title: 'Authenticity Guarantee', sub: '100% Handloom Certified' }
            ].map(p => (
              <div key={p.title} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                {p.icon}
                <div>
                  <div style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>{p.title}</div>
                  <div style={{ color: '#888', fontSize: 11 }}>{p.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sg-foot-inner">

          {/* Columns */}
          <div className="sg-foot-cols">
            {FOOTER_COLS.map(col => (
              <div key={col.title} className="sg-foot-col">
                <h4>{col.title}</h4>
                <ul className="sg-foot-links">
                  {col.links.map(link => (
                    <li key={link}><a href="#">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Mid Premium Section */}
          {/* Mid Premium Section */}
          <div className="sg-foot-mid" style={{ padding: '50px 0', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', width: '100%' }}>
              
              {/* Brand & Stores */}
              <div>
                <div className="sg-foot-logo" style={{ fontSize: '26px', marginBottom: '16px', color: '#fff' }}>ShreeGanga<span style={{ color: '#D4AF37' }}>.in</span></div>
                <p style={{ color: '#8d9191', fontSize: '13px', lineHeight: '1.6', marginBottom: '30px' }}>
                  Premium Ethnic Wear, Handlooms, and Designer Collections crafted with heritage and pride.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <strong style={{ color: '#fff', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', letterSpacing: '0.5px' }}><MapPin size={14} color="#D4AF37" /> SHOP 1 (MAIN)</strong>
                    <span style={{ color: '#8d9191', fontSize: '13px', lineHeight: '1.5', display: 'block', paddingLeft: '22px' }}>Bus stand Rudrapur, near PNB Bank,<br/>Rudrapur Deoria, UP 274204</span>
                  </div>
                  <div>
                    <strong style={{ color: '#fff', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', letterSpacing: '0.5px' }}><MapPin size={14} color="#D4AF37" /> SHOP 2</strong>
                    <span style={{ color: '#8d9191', fontSize: '13px', lineHeight: '1.5', display: 'block', paddingLeft: '22px' }}>Bus stand road, near rani saheb kila gate,<br/>Rudrapur Deoria, UP 274204</span>
                  </div>
                  <div>
                    <strong style={{ color: '#fff', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', letterSpacing: '0.5px' }}><MapPin size={14} color="#D4AF37" /> SHOP 3</strong>
                    <span style={{ color: '#8d9191', fontSize: '13px', lineHeight: '1.5', display: 'block', paddingLeft: '22px' }}>Hata bazar barhalganj,<br/>Gorakhpur, UP 273412</span>
                  </div>
                </div>
              </div>

              {/* Leadership & Team */}
              <div style={{ paddingTop: '8px' }}>
                <div style={{ marginBottom: '24px' }}>
                  <span style={{ color: '#D4AF37', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>Owner</span>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' }}>
                    <strong style={{ color: '#fff', fontSize: '15px', fontWeight: '500' }}>Ganga Prasad Gupta</strong>
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <span style={{ color: '#D4AF37', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>Account Manager (Main Contact)</span>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' }}>
                    <strong style={{ color: '#fff', fontSize: '15px', fontWeight: '500' }}>Priyanshu Gupta</strong>
                    <a href="tel:+918953013451" style={{ color: '#8d9191', textDecoration: 'none', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', transition: 'color 0.2s' }}>
                      <Phone size={12} color="#D4AF37" /> +91 89530 13451
                    </a>
                  </div>
                </div>

                <div>
                  <span style={{ color: '#D4AF37', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '12px' }}>Business Handles</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#d5dbdb', fontSize: '14px' }}>Durgesh Gupta</span>
                      <a href="tel:+919305115851" style={{ color: '#8d9191', textDecoration: 'none', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', transition: 'color 0.2s' }}><Phone size={12} color="#D4AF37" /> +91 93051 15851</a>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#d5dbdb', fontSize: '14px' }}>Santosh Gupta</span>
                      <a href="tel:+919935339272" style={{ color: '#8d9191', textDecoration: 'none', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', transition: 'color 0.2s' }}><Phone size={12} color="#D4AF37" /> +91 99353 39272</a>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#d5dbdb', fontSize: '14px' }}>Sandeep Gupta</span>
                      <a href="tel:+919793149491" style={{ color: '#8d9191', textDecoration: 'none', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', transition: 'color 0.2s' }}><Phone size={12} color="#D4AF37" /> +91 97931 49491</a>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#d5dbdb', fontSize: '14px' }}>Pradeep Gupta</span>
                      <a href="tel:+919935879825" style={{ color: '#8d9191', textDecoration: 'none', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', transition: 'color 0.2s' }}><Phone size={12} color="#D4AF37" /> +91 99358 79825</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connect & Support */}
              <div>
                <h4 style={{ color: '#fff', fontSize: '15px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '24px' }}>Support & Connect</h4>
                
                <div style={{ marginBottom: '30px' }}>
                   <div style={{ color: '#8d9191', fontSize: '12px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email Us</div>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                     <a href="mailto:priyanshugupta3036@gmail.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#fff', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}>
                       priyanshugupta3036@gmail.com
                     </a>
                     <a href="mailto:support@shreeganga.in" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#fff', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s', opacity: 0.8 }}>
                       support@shreeganga.in
                     </a>
                   </div>
                </div>

                <div>
                  <div style={{ color: '#8d9191', fontSize: '12px', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Quick Connect & Socials</div>
                  <div className="sg-socials" style={{ display: 'flex', gap: '12px' }}>
                    <a href="https://wa.me/919305115851" target="_blank" rel="noreferrer" className="sg-social" title="WhatsApp Us">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.274-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.098-.21.046-.39-.026-.54-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.21 2.095 3.2 5.076 4.485.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.195-.57-.345z"/><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12c0 1.846.502 3.57 1.36 5.093L2 22l4.982-1.274A9.957 9.957 0 0 0 12 22z"/></svg>
                    </a>
                    <a href="https://instagram.com/shree_ganga_handloom" target="_blank" rel="noreferrer" className="sg-social" title="Instagram">
                      <Instagram size={18} />
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>


          {/* Payment */}
          <div style={{ paddingTop: 20 }}>
            <div className="sg-pay">
              <span className="sg-pay-label">Payments:</span>
              {['VISA', 'MC', 'RuPay', 'UPI', 'COD', 'EMI', 'Paytm', 'GPay'].map(p => (
                <span key={p} className="sg-pay-icon">{p}</span>
              ))}
            </div>
          </div>
          {/* App Download Badges */}
          <div style={{ padding: '40px 0', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
            <h5 style={{ color: '#fff', fontSize: 14, fontWeight: 700, marginBottom: 20, letterSpacing: 1, textTransform: 'uppercase' }}>Experience the ShreeGanga App</h5>
            <div style={{ display: 'flex', gap: 20, justifyContent: 'center' }}>
              <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#000', border: '1px solid #333', padding: '8px 16px', borderRadius: 6, textDecoration: 'none', color: '#fff' }}>
                <div style={{ fontSize: 24 }}>🍎</div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 9, opacity: 0.7, textTransform: 'uppercase' }}>Download on</div>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>App Store</div>
                </div>
              </a>
              <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#000', border: '1px solid #333', padding: '8px 16px', borderRadius: 6, textDecoration: 'none', color: '#fff' }}>
                <div style={{ fontSize: 24 }}>🤖</div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 9, opacity: 0.7, textTransform: 'uppercase' }}>Get it on</div>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>



      {/* Bottom Bar */}
      <div className="sg-foot-bottom">
        <div className="sg-foot-bottom-inner">
          <span className="sg-copyright">© 2024 Shree Ganga Handloom & Readymade Centre. All Rights Reserved.</span>
          <div className="sg-foot-bottom-links">
            <a href="#">Conditions of Use</a>
            <a href="#">Privacy Notice</a>
            <a href="#">Interest-Based Ads</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>

      {/* Final Last Slide: Locale Wrapper */}
      <div style={{ background: '#0a0a0a', padding: '30px 0', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
          <div className="sg-foot-logo" style={{ fontSize: '20px', color: '#fff', marginRight: '20px' }}>ShreeGanga<span style={{ color: '#D4AF37' }}>.in</span></div>
          <div style={{ position: 'relative' }}>
            <Globe size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#ccc' }} />
            <select className="sg-locale-btn" style={{ paddingLeft: '40px', paddingRight: '40px', appearance: 'none', cursor: 'pointer', outline: 'none' }}>
              <option value="en">English</option>
              <option value="hi">हिन्दी - HI</option>
              <option value="bn">বাংলা - BN</option>
              <option value="mr">मराठी - MR</option>
              <option value="ta">தமிழ் - TA</option>
            </select>
            <ChevronsUpDown size={12} color="#888" style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          </div>

          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#ccc', fontWeight: 600 }}>₹</span>
            <select className="sg-locale-btn" style={{ paddingLeft: '32px', paddingRight: '40px', appearance: 'none', cursor: 'pointer', outline: 'none' }}>
              <option value="inr">INR - Indian Rupee</option>
              <option value="usd">USD - US Dollar</option>
              <option value="eur">EUR - Euro</option>
            </select>
            <ChevronsUpDown size={12} color="#888" style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          </div>

          <button className="sg-locale-btn">
            <img src="https://flagcdn.com/w20/in.png" alt="India Flag" style={{ width: '16px', height: '11px', borderRadius: '2px' }} /> India
          </button>
        </div>
        <div className="sg-signature">Crafted with Love by Shree Ganga Heritage</div>
      </div>
    </footer>
  );
}
