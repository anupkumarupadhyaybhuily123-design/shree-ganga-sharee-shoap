import { Star, ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '@/lib/CartContext';

interface ProductProps {
  id: string | number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  rating?: number;
  reviews?: number;
  image: string;
  category: string;
}

export default function ProductCard(product: ProductProps) {
  const { id, name, price, originalPrice, discount, image, category } = product;
  const { addToCart } = useCart();

  return (
    <div className="heritage-card">
      <style>{`
        .heritage-card {
          background: #fff;
          border: 1px solid #fdf2d9;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          position: relative;
          font-family: 'Cormorant Garamond', serif;
        }
        .heritage-card:hover {
          border-color: #8B6914;
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(93,12,12,0.05);
        }
        .img-box {
          position: relative;
          aspect-ratio: 4/5;
          overflow: hidden;
          background: #fafafa;
        }
        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s ease;
        }
        .heritage-card:hover .card-img {
          transform: scale(1.1);
        }
        .card-tag {
          position: absolute;
          top: 15px;
          left: 15px;
          background: rgba(255,255,255,0.9);
          padding: 4px 15px;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          color: #8B6914;
          letter-spacing: 2px;
          z-index: 10;
          border: 1px solid #fdf2d9;
        }
        .quick-bag {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: #5d0c0c;
          color: #f0d47a;
          padding: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          transform: translateY(100%);
          transition: transform 0.4s;
          border: none;
          cursor: pointer;
        }
        .heritage-card:hover .quick-bag {
          transform: translateY(0);
        }
        .card-details {
          padding: 25px 20px;
          text-align: center;
          border-top: 1px solid #fdf2d9;
        }
        .card-cat {
          font-family: 'Cinzel', serif;
          font-size: 10px;
          color: #8B6914;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 8px;
          display: block;
        }
        .card-name {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          color: #2c1810;
          margin-bottom: 12px;
          font-style: italic;
          display: block;
          text-decoration: none;
        }
        .card-price-row {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 12px;
        }
        .card-curr { font-size: 20px; font-weight: 600; color: #5d0c0c; }
        .card-orig { font-size: 14px; color: #8B6914; text-decoration: line-through; opacity: 0.6; }
        .wish-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          z-index: 10;
          background: rgba(255,255,255,0.9);
          width: 35px;
          height: 35px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8B6914;
          border: 1px solid #fdf2d9;
          cursor: pointer;
          transition: 0.3s;
        }
        .wish-btn:hover { background: #5d0c0c; color: #f0d47a; }
      `}</style>

      <div className="img-box">
        <Link href={`/product/${id}`}>
          <img src={image} className="card-img" alt={name} />
        </Link>
        <span className="card-tag">{discount || 'Boutique'}</span>
        <button className="wish-btn"><Heart size={16} /></button>
        <button className="quick-bag" onClick={() => addToCart(product, 1)}>
          <ShoppingBag size={16} /> Add to Bag
        </button>
      </div>

      <div className="card-details">
        <span className="card-cat">{category} Heritage</span>
        <Link href={`/product/${id}`} className="card-name">{name}</Link>
        <div className="card-price-row">
          <span className="card-curr">₹{price.toLocaleString()}</span>
          {originalPrice && <span className="card-orig">₹{originalPrice.toLocaleString()}</span>}
        </div>
      </div>
    </div>
  );
}
