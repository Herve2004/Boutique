
import React, { useState } from 'react';
import { motion as motionBase, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, PenTool, Layers, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants.ts';
import { Product } from '../types.ts';
import ProductCard from '../components/ProductCard.tsx';
import QuickViewModal from '../components/QuickViewModal.tsx';

const motion = motionBase as any;

const ArchitecturalShelf: React.FC<{ 
  title: string; 
  products: Product[]; 
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  onQuickView: (p: Product) => void;
}> = ({ title, products, wishlist, toggleWishlist, onQuickView }) => (
  <section className="py-32 relative overflow-hidden bg-white">
    <div className="max-w-[1440px] mx-auto px-8">
      <div className="flex justify-between items-end mb-20 border-b border-black/5 pb-10">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-7xl font-light italic serif lowercase"
        >
          {title}
        </motion.h2>
        <Link to="/shop" className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em]">
          Découvrir <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      
      <div className="flex overflow-x-auto no-scrollbar gap-12 pb-10">
        {products.map((p, i) => (
          <div key={p.id} className="flex-shrink-0 w-[350px] md:w-[450px]">
            <ProductCard 
              product={p} 
              idx={i} 
              onQuickView={onQuickView}
              isWishlisted={wishlist.includes(p.id)}
              onToggleWishlist={toggleWishlist}
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Home: React.FC<{ addToCart: (p: Product) => void; wishlist: string[]; toggleWishlist: (id: string) => void }> = ({ addToCart, wishlist, toggleWishlist }) => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const newest = PRODUCTS.slice(0, 4);
  const watches = PRODUCTS.filter(p => p.type === 'Montres').slice(0, 3);

  return (
    <div className="bg-[#fcfaf7]">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center px-8 md:px-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-40 left-8 right-8 h-[0.5px] bg-black/10 origin-left" 
          />
          <motion.div 
            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 2, delay: 0.5 }}
            className="absolute top-40 bottom-40 left-20 w-[0.5px] bg-black/10 origin-top hidden lg:block" 
          />
        </div>

        <div className="max-w-[1440px] mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-10">
            <div className="space-y-4">
              <div className="overflow-hidden">
                <motion.h1 initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[12vw] lg:text-[10vw] font-light leading-[0.85] tracking-tighter serif italic"
                >
                  Confection
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1 initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[12vw] lg:text-[10vw] font-light leading-[0.85] tracking-tighter uppercase pl-10 md:pl-32"
                >
                  Architecturale
                </motion.h1>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 flex flex-col justify-end pb-32">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 1.5 }}
              className="text-[10px] font-black uppercase tracking-[0.4em] leading-relaxed mb-8"
            >
              Maison fondée sur l'équilibre des formes et du mouvement.
            </motion.p>
            <Link to="/shop" className="text-[10px] font-black uppercase tracking-widest border-b border-black/20 pb-1 w-fit hover:border-black transition-colors">Explorer</Link>
          </div>
        </div>
      </section>

      {/* 2. IMAGE REVEAL SECTION */}
      <section className="px-8 py-20">
        <div className="relative aspect-[21/9] overflow-hidden">
          <motion.img 
            initial={{ scale: 1.2 }} whileInView={{ scale: 1 }} transition={{ duration: 3 }}
            src="https://images.unsplash.com/photo-1441984908746-d44ba88c0147?auto=format&fit=crop&q=90&w=2400" 
            className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-[2s]"
          />
          <div className="absolute inset-0 flex items-center justify-center text-white bg-black/20">
            <h2 className="text-5xl md:text-8xl serif italic font-light">L'Inspiration Pure.</h2>
          </div>
        </div>
      </section>

      {/* 3. NEW COLLECTIONS SHELF */}
      <ArchitecturalShelf 
        title="nos structures" 
        products={newest} 
        wishlist={wishlist}
        toggleWishlist={toggleWishlist}
        onQuickView={setQuickViewProduct}
      />

      {/* 4. PHILOSOPHY SECTION (RESTORED & ADDED) */}
      <section className="py-40 bg-white px-8">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
            className="space-y-6"
          >
            <PenTool size={40} strokeWidth={1} className="text-black/30" />
            <h3 className="text-3xl serif italic font-light">Le Dessin</h3>
            <p className="text-sm text-black/50 leading-relaxed uppercase tracking-widest">Chaque pièce commence par une étude géométrique rigoureuse pour assurer un tombé parfait.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
            className="space-y-6"
          >
            <Layers size={40} strokeWidth={1} className="text-black/30" />
            <h3 className="text-3xl serif italic font-light">La Matière</h3>
            <p className="text-sm text-black/50 leading-relaxed uppercase tracking-widest">Laine vierge, coton organique et métaux nobles. Nous ne transigeons jamais sur la qualité.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
            className="space-y-6"
          >
            <ShieldCheck size={40} strokeWidth={1} className="text-black/30" />
            <h3 className="text-3xl serif italic font-light">La Durée</h3>
            <p className="text-sm text-black/50 leading-relaxed uppercase tracking-widest">Une mode faite pour traverser les saisons et les générations, loin de l'éphémère.</p>
          </motion.div>
        </div>
      </section>

      {/* 5. QUOTE SECTION */}
      <section className="py-60 relative bg-[#fcfaf7]">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2 }}
            className="text-4xl md:text-7xl serif italic font-light leading-[1.1] tracking-tight"
          >
            "Le vêtement est la première architecture de l'âme."
          </motion.p>
        </div>
      </section>

      {/* 6. WATCHES SHELF (RESTORED) */}
      <ArchitecturalShelf 
        title="précision temporelle" 
        products={watches} 
        wishlist={wishlist}
        toggleWishlist={toggleWishlist}
        onQuickView={setQuickViewProduct}
      />

      <AnimatePresence>
        {quickViewProduct && (
          <QuickViewModal 
            product={quickViewProduct} 
            onClose={() => setQuickViewProduct(null)} 
            onAddToCart={addToCart}
            isWishlisted={wishlist.includes(quickViewProduct.id)}
            onToggleWishlist={toggleWishlist}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
