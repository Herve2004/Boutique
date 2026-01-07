
import React from 'react';
import { motion as motionBase } from 'framer-motion';
import { X, Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

// Fix for framer-motion type errors in certain environments
const motion = motionBase as any;

interface CartDrawerProps {
  cart: CartItem[];
  total: number;
  onClose: () => void;
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ cart, total, onClose, onRemove, onUpdateQty }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="absolute right-0 top-0 h-full w-full max-w-md bg-white p-8 flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-bold tracking-tight">Votre Panier</h2>
          <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-black/40 space-y-6">
            <ShoppingBag size={64} strokeWidth={1} />
            <p className="text-lg font-light">Votre panier est vide</p>
            <button 
              onClick={onClose}
              className="px-8 py-3 bg-black text-white rounded-full font-bold text-sm uppercase tracking-widest"
            >
              Découvrir la boutique
            </button>
          </div>
        ) : (
          <>
            <div className="flex-grow overflow-y-auto pr-4 -mr-4 space-y-8">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-24 h-32 bg-stone-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between mb-1">
                      <h4 className="font-bold text-sm leading-tight">{item.name}</h4>
                      <button onClick={() => onRemove(item.id)} className="text-black/30 hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    {/* Fix: use item.type instead of item.category */}
                    <p className="text-xs text-black/50 mb-4 uppercase tracking-widest font-medium">{item.type}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-black/10 rounded-full px-2 py-1">
                        <button onClick={() => onUpdateQty(item.id, -1)} className="p-1 hover:bg-black/5 rounded-full"><Minus size={12}/></button>
                        <span className="px-3 text-sm font-bold">{item.quantity}</span>
                        <button onClick={() => onUpdateQty(item.id, 1)} className="p-1 hover:bg-black/5 rounded-full"><Plus size={12}/></button>
                      </div>
                      <span className="font-light">{item.price * item.quantity}€</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-black/5">
              <div className="flex justify-between text-lg font-bold mb-6">
                <span>Total</span>
                <span>{total}€</span>
              </div>
              <button className="w-full h-16 bg-black text-white rounded-full font-bold uppercase tracking-[0.2em] text-sm hover:opacity-90 transition-all flex items-center justify-center group">
                Commander
                <motion.span 
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <Plus className="ml-2 rotate-45" size={18} />
                </motion.span>
              </button>
              <p className="text-center text-[10px] text-black/40 mt-4 uppercase tracking-widest font-bold">
                Livraison gratuite et retours offerts
              </p>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CartDrawer;
