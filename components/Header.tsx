
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, X, Heart } from 'lucide-react';
import { motion as motionBase, AnimatePresence } from 'framer-motion';

const motion = motionBase as any;

const Header: React.FC<{ cartCount: number; wishlistCount: number; onOpenCart: () => void; onOpenMenu: () => void }> = ({ cartCount, wishlistCount, onOpenCart, onOpenMenu }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchActive && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchActive]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchActive(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] apple-glass border-b border-black/5 h-20">
      <div className="max-w-[1440px] mx-auto px-8 h-full flex items-center justify-between relative">
        <div className="flex items-center space-x-12">
          <Link to="/" className="text-3xl font-light serif italic tracking-tighter hover:opacity-50 transition-opacity">
            L'Élégance <span className="not-italic font-bold">Moderne</span>
          </Link>
          <div className="hidden lg:flex space-x-10 text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">
            <Link to="/shop" className="hover:opacity-100 transition-opacity">Collections</Link>
            <Link to="/shop?segment=Homme" className="hover:opacity-100 transition-opacity">Atelier Homme</Link>
            <Link to="/shop?segment=Femme" className="hover:opacity-100 transition-opacity">Atelier Femme</Link>
          </div>
        </div>

        <div className="flex items-center space-x-8">
          <button onClick={() => setIsSearchActive(true)} className="opacity-50 hover:opacity-100 transition-opacity">
            <Search size={18} strokeWidth={1.5} />
          </button>
          <button onClick={onOpenCart} className="opacity-50 hover:opacity-100 transition-opacity relative">
            <ShoppingBag size={18} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-black text-white text-[7px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
          <button onClick={onOpenMenu} className="opacity-50 hover:opacity-100 transition-opacity text-[10px] font-black uppercase tracking-widest border border-black/10 px-4 py-2 rounded-full">
            Menu
          </button>
        </div>

        <AnimatePresence>
          {isSearchActive && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-0 bg-white px-8 flex items-center z-[110]"
            >
              <form onSubmit={handleSearchSubmit} className="flex-grow flex items-center">
                <Search size={20} className="mr-6 opacity-30" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="RECHERCHER DANS L'ATELIER..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none w-full text-lg serif italic placeholder:opacity-20"
                />
              </form>
              <button onClick={() => setIsSearchActive(false)} className="ml-8 p-3 hover:bg-stone-50 rounded-full">
                <X size={24} strokeWidth={1} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Header;
