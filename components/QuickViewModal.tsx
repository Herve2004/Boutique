
import React, { useState } from 'react';
import { motion as motionBase, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Check, Heart } from 'lucide-react';
import { Product } from '../types';

const motion = motionBase as any;

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose, onAddToCart, isWishlisted, onToggleWishlist }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setIsAdded(true);
    onAddToCart(product);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] bg-black/40 backdrop-blur-sm flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden relative flex flex-col md:flex-row max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-black/5 hover:bg-black/10 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        {/* Product Image Area */}
        <div className="md:w-1/2 bg-[#fbfbfd] p-12 flex items-center justify-center overflow-hidden">
          <motion.img 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-contain mix-blend-multiply"
          />
        </div>

        {/* Product Info Area */}
        <div className="md:w-1/2 p-10 md:p-14 overflow-y-auto">
          <div className="flex flex-col h-full">
            <header className="mb-6 flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#bf4800] mb-2 block">
                  {product.segment} • {product.season}
                </span>
                <h2 className="text-3xl font-bold tracking-tight text-[#1d1d1f] mb-2">{product.name}</h2>
                <p className="text-xl font-medium text-[#1d1d1f]">{product.price} €</p>
              </div>
              <button 
                onClick={() => onToggleWishlist(product.id)}
                className={`p-3 rounded-full transition-all ${
                  isWishlisted ? 'bg-red-50 text-red-500' : 'bg-stone-100 text-black/30 hover:text-black'
                }`}
              >
                <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
              </button>
            </header>

            <div className="mb-8">
              <p className="text-[#6e6e73] leading-relaxed text-sm md:text-base">
                {product.description}
              </p>
            </div>

            <div className="space-y-4 mb-10">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#1d1d1f]">Spécifications</h4>
              <div className="grid grid-cols-1 gap-2">
                {product.specs.map((spec, i) => (
                  <div key={i} className="flex items-center text-sm text-[#6e6e73]">
                    <div className="w-1 h-1 bg-black/20 rounded-full mr-3" />
                    {spec}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-6 flex flex-col gap-4">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className={`w-full py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                  isAdded ? 'bg-green-500 text-white' : 'bg-black text-white hover:bg-[#1d1d1f]'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check size={18} />
                    Ajouté au panier
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    Ajouter au panier
                  </>
                )}
              </motion.button>
              
              <button 
                onClick={onClose}
                className="w-full py-4 text-sm font-semibold text-[#0066cc] hover:underline"
              >
                Continuer mes achats
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default QuickViewModal;
