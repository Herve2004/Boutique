
import React, { useState } from 'react';
import { motion as motionBase, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Eye, Heart } from 'lucide-react';

const motion = motionBase as any;

interface ProductCardProps {
  product: Product;
  idx: number;
  onQuickView: (product: Product) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, idx, onQuickView, isWishlisted, onToggleWishlist }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: (idx % 4) * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col h-full bg-white p-4"
    >
      <Link to={`/shop/${product.id}`} className="block flex-grow">
        <div className="aspect-[3/4] bg-[#f2f0ed] overflow-hidden relative mb-8 rounded-sm">
          <motion.img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
          />
          
          <div className="absolute top-4 right-4 z-30 flex flex-col gap-2">
            <button 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleWishlist?.(product.id); }}
              className={`p-3 rounded-full bg-white shadow-sm transition-all ${isWishlisted ? 'text-red-500' : 'text-black/20 hover:text-black'}`}
            >
              <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={1.5} />
            </button>
          </div>

          <div className="absolute bottom-4 left-4 z-30 bg-white/80 backdrop-blur px-3 py-1">
             <span className="text-[8px] font-black uppercase tracking-[0.3em]">
                {product.type} / {product.season}
             </span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <h3 className="text-2xl serif italic font-light tracking-tight group-hover:opacity-50 transition-opacity">
              {product.name}
            </h3>
            <span className="text-xs font-bold uppercase tracking-widest opacity-40">{product.price} €</span>
          </div>
          <div className="h-[0.5px] bg-black/5 w-full" />
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
