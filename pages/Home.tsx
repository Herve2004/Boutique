
import React, { useState, useEffect } from 'react';
import { motion as motionBase, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';

const motion = motionBase as any;

// Animation variants
const lineAnimation = {
  hidden: { scaleX: 0, scaleY: 0 },
  visible: { 
    scaleX: 1, 
    scaleY: 1, 
    transition: { duration: 2, ease: [0.16, 1, 0.3, 1] } 
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
  }
};

const maskReveal = {
  hidden: { y: "100%" },
  visible: (i: number) => ({
    y: 0,
    transition: { delay: 0.5 + (i * 0.1), duration: 1.5, ease: [0.16, 1, 0.3, 1] }
  })
};

const ArchitecturalShelf: React.FC<{ 
  title: string; 
  products: Product[]; 
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  onQuickView: (p: Product) => void;
}> = ({ title, products, wishlist, toggleWishlist, onQuickView }) => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="flex justify-between items-end mb-20">
          <div className="overflow-hidden">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-7xl font-light italic serif lowercase"
            >
              {title}
            </motion.h2>
          </div>
          <Link to="/shop" className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em]">
            Voir tout <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="flex overflow-x-auto no-scrollbar gap-12 pb-10">
          {products.map((p, i) => (
            <div key={p.id} className="flex-shrink-0 w-[400px]">
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
};

const Home: React.FC<{ addToCart: (p: Product) => void; wishlist: string[]; toggleWishlist: (id: string) => void }> = ({ addToCart, wishlist, toggleWishlist }) => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  
  const newest = PRODUCTS.slice(0, 4);
  const watches = PRODUCTS.filter(p => p.type === 'Montres').slice(0, 3);

  return (
    <div className="bg-[#fcfaf7]">
      {/* MONUMENTAL HERO - Inspiré directement de Quadangles */}
      <section className="relative min-h-screen flex items-center px-8 md:px-20 overflow-hidden">
        
        {/* Animated Lines Grid */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Top Line */}
          <motion.div 
            variants={lineAnimation}
            initial="hidden"
            animate="visible"
            className="absolute top-40 left-8 right-8 h-[0.5px] bg-black/10 origin-left" 
          />
          {/* Bottom Line */}
          <motion.div 
            variants={lineAnimation}
            initial="hidden"
            animate="visible"
            className="absolute bottom-40 left-8 right-8 h-[0.5px] bg-black/10 origin-right" 
          />
          {/* Vertical Left */}
          <motion.div 
            variants={lineAnimation}
            initial="hidden"
            animate="visible"
            className="absolute top-40 bottom-40 left-40 w-[0.5px] bg-black/10 origin-top hidden lg:block" 
          />
          {/* Vertical Right */}
          <motion.div 
            variants={lineAnimation}
            initial="hidden"
            animate="visible"
            className="absolute top-40 bottom-40 right-40 w-[0.5px] bg-black/10 origin-bottom hidden lg:block" 
          />
        </div>

        <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
          <div className="lg:col-span-10">
            <div className="flex flex-col space-y-4">
              <div className="overflow-hidden">
                <motion.h1 
                  custom={0}
                  variants={maskReveal}
                  initial="hidden"
                  animate="visible"
                  className="text-[12vw] lg:text-[10vw] font-light leading-[0.85] tracking-tighter serif italic"
                >
                  Confection
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1 
                  custom={1}
                  variants={maskReveal}
                  initial="hidden"
                  animate="visible"
                  className="text-[12vw] lg:text-[10vw] font-light leading-[0.85] tracking-tighter uppercase pl-12 lg:pl-32"
                >
                  Architecturale
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1 
                  custom={2}
                  variants={maskReveal}
                  initial="hidden"
                  animate="visible"
                  className="text-[12vw] lg:text-[10vw] font-light leading-[0.85] tracking-tighter serif italic text-right lg:pr-20"
                >
                  & Moderne.
                </motion.h1>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col justify-end pb-32">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="space-y-8"
            >
              <div className="w-12 h-[0.5px] bg-black/40" />
              <p className="text-[10px] font-black uppercase tracking-[0.4em] leading-relaxed opacity-40">
                Chaque pièce est une fondation, chaque couture un équilibre.
              </p>
              <button className="flex items-center gap-4 group">
                <span className="text-[10px] font-black uppercase tracking-widest border-b border-black/10 pb-1">Explorer</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Floating Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20"
        >
          <ChevronDown size={32} strokeWidth={1} />
        </motion.div>
      </section>

      {/* Parallax Feature Image */}
      <section className="px-8 py-20 max-w-[1440px] mx-auto">
        <div className="relative aspect-[16/7] overflow-hidden group">
          <motion.img 
            initial={{ scale: 1.2 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
            src="https://images.unsplash.com/photo-1441984908746-d44ba88c0147?auto=format&fit=crop&q=90&w=2400" 
            className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-[2.5s]"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              className="text-center"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.8em] mb-8 block opacity-60">Depuis 1924</span>
              <h2 className="text-6xl md:text-8xl serif italic font-light tracking-tighter">Manifeste de l'Âme.</h2>
            </motion.div>
          </div>
        </div>
      </section>

      <ArchitecturalShelf 
        title="nos structures" 
        products={newest} 
        wishlist={wishlist}
        toggleWishlist={toggleWishlist}
        onQuickView={setQuickViewProduct}
      />

      <section className="py-60 bg-white relative">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[0.5px] h-32 bg-black/10" />
         <div className="max-w-4xl mx-auto px-8 text-center">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl serif italic font-light leading-tight tracking-tight"
            >
              "L'architecture d'un vêtement est le reflet de l'architecture intérieure de celui qui le porte."
            </motion.p>
         </div>
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[0.5px] h-32 bg-black/10" />
      </section>

      <ArchitecturalShelf 
        title="précision horlogère" 
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
