
import React, { useState } from 'react';
import { motion as motionBase } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Heart } from 'lucide-react';

const motion = motionBase as any;

interface ProductCardProps {
  product: Product;
  idx: number;
  onQuickView: (product: Product) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, idx, onQuickView, isWishlisted, onToggleWishlist }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay: (idx % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col h-full bg-white"
    >
      <Link to={`/shop/${product.id}`} className="block flex-grow">
        <div className="aspect-[3/4] bg-stone-50 overflow-hidden relative mb-10">
          <motion.img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover grayscale transition-transform duration-[3s] ease-out group-hover:scale-105"
          />
          
          <div className="absolute top-6 right-6 z-30 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
            <button 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleWishlist?.(product.id); }}
              className={`p-4 rounded-full bg-white shadow-xl transition-all ${isWishlisted ? 'text-red-500' : 'text-black/30 hover:text-black'}`}
            >
              <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={1.5} />
            </button>
          </div>

          <div className="absolute bottom-6 left-6 z-30 flex gap-2">
             <span className="text-[9px] font-bold uppercase tracking-[0.3em] bg-white/90 backdrop-blur px-4 py-2">
                {product.type}
             </span>
          </div>
        </div>
        
        <div className="space-y-4 px-2 pb-6">
          <div className="flex justify-between items-start">
            <h3 className="text-3xl serif italic font-light tracking-tight group-hover:opacity-60 transition-opacity">
              {product.name}
            </h3>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-black/30">{product.season}</span>
            <span className="text-sm font-light tracking-widest">{product.price} €</span>
          </div>
          <div className="h-[1px] bg-black/5 w-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
