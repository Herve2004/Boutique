
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { motion as motionBase, AnimatePresence } from 'framer-motion';
import { X, User } from 'lucide-react';
import { PRODUCTS } from './constants';
import { Product, CartItem } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Support from './pages/Support';
import Contact from './pages/Contact';
import Shipping from './pages/Shipping';
import Returns from './pages/Returns';
import Admin from './pages/Admin';
import Auth from './pages/Auth';
import CartDrawer from './components/CartDrawer';
import GeminiAssistant from './components/GeminiAssistant';

const motion = motionBase as any;

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        console.error("Failed to load wishlist", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    // HashRouter est idéal pour GitHub Pages car il ne nécessite pas de configuration serveur 404
    <HashRouter>
      <div className="min-h-screen flex flex-col relative overflow-x-hidden bg-[#fcfaf7]">
        <Header 
          cartCount={cartCount} 
          wishlistCount={wishlist.length}
          onOpenCart={() => setIsCartOpen(true)} 
          onOpenMenu={() => setIsMenuOpen(true)} 
        />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
            <Route path="/shop" element={<Shop addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
            <Route path="/shop/:id" element={<ProductDetail addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
            <Route path="/support" element={<Support />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Auth mode="login" />} />
            <Route path="/signup" element={<Auth mode="signup" />} />
          </Routes>
        </main>

        <Footer />

        <AnimatePresence>
          {isCartOpen && (
            <CartDrawer 
              cart={cart} 
              total={cartTotal}
              onClose={() => setIsCartOpen(false)} 
              onRemove={removeFromCart}
              onUpdateQty={updateQuantity}
            />
          )}
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[150] bg-black/40 backdrop-blur-md flex justify-end"
              onClick={() => setIsMenuOpen(false)}
            >
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 200 }}
                className="w-full max-w-xl bg-black text-white p-12 flex flex-col h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-24">
                  <span className="text-3xl font-light serif italic tracking-tighter">L'Élégance</span>
                  <button onClick={() => setIsMenuOpen(false)} className="p-4 hover:bg-white/10 rounded-full transition-colors">
                    <X size={32}/>
                  </button>
                </div>
                <nav className="flex flex-col space-y-8 text-6xl font-light serif italic">
                  <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:opacity-50 transition-opacity">Accueil</Link>
                  <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="hover:opacity-50 transition-opacity">Collections</Link>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="hover:opacity-50 transition-opacity flex items-center gap-6">
                    Compte <User size={40} strokeWidth={1} />
                  </Link>
                  <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="hover:opacity-50 transition-opacity">Atelier</Link>
                </nav>
                
                <div className="mt-auto space-y-6">
                  <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="text-[10px] uppercase tracking-[0.4em] opacity-40 hover:opacity-100 transition-opacity block">Accès Administration</Link>
                  <div className="h-px bg-white/10 w-full" />
                  <p className="text-[10px] uppercase tracking-[0.4em] opacity-20">Maison de Couture © 2024</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <GeminiAssistant />
      </div>
    </HashRouter>
  );
};

export default App;
