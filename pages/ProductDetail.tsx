
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion as motionBase } from 'framer-motion';
import { Check, ArrowLeft, Heart, Share2, Ruler } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';

const motion = motionBase as any;

interface ProductDetailProps {
  addToCart: (p: Product) => void;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ addToCart, wishlist, toggleWishlist }) => {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  if (!product) return <div>Product not found</div>;

  const handleAdd = () => {
    setIsAdding(true);
    setTimeout(() => {
      addToCart(product);
      setIsAdding(false);
    }, 1200);
  };

  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Link to="/shop" className="inline-flex items-center text-sm font-bold uppercase tracking-widest mb-12 hover:opacity-60 transition-opacity group">
        <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={16} />
        Retour boutique
      </Link>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Sticky Gallery */}
        <div className="lg:w-2/3 space-y-8">
          {product.images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2 }}
              className="bg-stone-100 rounded-2xl overflow-hidden"
            >
              <img src={img} alt={`${product.name} ${i}`} className="w-full h-auto object-cover" />
            </motion.div>
          ))}
        </div>

        {/* Info Column */}
        <div className="lg:w-1/3">
          <div className="lg:sticky lg:top-32">
            <header className="mb-8">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-black/40 mb-2 block">{product.type}</span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">{product.name}</h1>
              <p className="text-2xl font-light">{product.price}€</p>
            </header>

            <div className="mb-8">
              <p className="text-lg text-black/70 leading-relaxed font-light">{product.description}</p>
            </div>

            <div className="space-y-6 mb-12">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-xs uppercase tracking-widest">Sélectionner Taille</h4>
                <button className="flex items-center text-xs font-bold uppercase tracking-widest text-black/50 hover:text-black transition-colors">
                  <Ruler size={14} className="mr-1" /> Guide des tailles
                </button>
              </div>
              <div className="flex gap-3">
                {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex-1 h-14 border rounded-lg text-sm font-medium transition-all ${
                      selectedSize === size 
                        ? 'bg-black text-white border-black' 
                        : 'border-black/10 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4 mb-12">
              <button
                onClick={handleAdd}
                disabled={isAdding}
                className="flex-[4] h-16 bg-black text-white rounded-full font-bold uppercase tracking-widest text-sm relative overflow-hidden transition-transform active:scale-95 flex items-center justify-center"
              >
                {isAdding ? (
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full"
                  />
                ) : (
                  "Ajouter au panier"
                )}
              </button>
              <button 
                onClick={() => toggleWishlist(product.id)}
                className={`flex-1 h-16 border rounded-full flex items-center justify-center transition-all ${
                  isWishlisted ? 'bg-red-50 border-red-500 text-red-500' : 'border-black/10 hover:bg-black/5'
                }`}
              >
                <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
              </button>
              <button className="flex-1 h-16 border border-black/10 rounded-full flex items-center justify-center hover:bg-black/5 transition-all">
                <Share2 size={20} />
              </button>
            </div>

            <div className="border-t border-black/5 pt-8 space-y-6">
              {product.specs.map((spec, i) => (
                <div key={i} className="flex items-center text-sm">
                  <div className="w-1.5 h-1.5 bg-black rounded-full mr-4" />
                  <span className="font-medium text-black/80">{spec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
