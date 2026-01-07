
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
      transition={{ duration: 1.2, delay: (idx % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col h-full"
    >
      <Link to={`/shop/${product.id}`} className="block flex-grow">
        <div className="aspect-[3/4] bg-[#f2f0ed] overflow-hidden relative mb-8 rounded-sm">
          <motion.img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-[2s] ease-out group-hover:scale-105 p-12"
          />
          
          <div className="absolute top-6 right-6 z-30 flex flex-col gap-3">
            <button 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleWishlist?.(product.id); }}
              className={`p-2 transition-all duration-500 ${isWishlisted ? 'text-red-500' : 'text-black/20 hover:text-black'}`}
            >
              <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={1.5} />
            </button>
            <button 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onQuickView(product); }}
              className="p-2 text-black/20 hover:text-black transition-all md:opacity-0 md:group-hover:opacity-100"
            >
              <Eye size={20} strokeWidth={1.5} />
            </button>
          </div>

          <motion.div 
            animate={{ opacity: isHovered ? 0.4 : 0.2 }}
            className="absolute bottom-6 left-6 z-30"
          >
             <span className="text-[9px] font-black uppercase tracking-[0.5em]">
                {product.type} / {product.season}
             </span>
          </motion.div>
        </div>
        
        <div className="space-y-4 px-2">
          <div className="flex justify-between items-baseline">
            <h3 className="text-3xl serif italic font-light tracking-tight group-hover:opacity-50 transition-opacity">
              {product.name}
            </h3>
            <span className="text-xs font-bold uppercase tracking-widest opacity-40">{product.price} €</span>
          </div>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            className="h-[0.5px] bg-black/10 origin-left"
          />
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
