import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Shree Ganga Handloom | Premium Ethnic Store",
  description: "Discover the finest collection of premium sarees, handlooms, and designer kurtis at Shree Ganga Handloom & Readymade Centre.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect rx='12' width='100' height='100' fill='%23111'/><text x='50' y='62' font-size='48' font-weight='bold' fill='%23D4AF37' text-anchor='middle' font-family='serif'>SG</text></svg>" />
      </head>
      <body>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <a 
            href="https://wa.me/919305115851?text=Hello%20Shree%20Ganga%20Handloom,%20I%20have%20an%20inquiry." 
            target="_blank" 
            rel="noreferrer"
            className="sg-floating-wa"
            style={{
              position: 'fixed',
              bottom: '80px',
              right: '20px',
              backgroundColor: '#25D366',
              color: '#FFF',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              zIndex: 9999,
              transition: 'transform 0.2s',
            }}
          >
            <i className="fa-brands fa-whatsapp" style={{ fontSize: '32px' }}></i>
          </a>
      </body>
    </html>
  );
}
