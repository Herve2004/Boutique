
import React, { useState } from 'react';
import { motion as motionBase, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';

const motion = motionBase as any;

// Animation variants for masking effect
const maskReveal = {
  initial: { y: "100%" },
  animate: { 
    y: 0, 
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
  }
};

const lineGrow = {
  initial: { scaleX: 0 },
  animate: { 
    scaleX: 1, 
    transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 } 
  }
};

const imageReveal = {
  initial: { scale: 1.2, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1, 
    transition: { duration: 2, ease: [0.16, 1, 0.3, 1] } 
  }
};

const ArchitecturalShelf: React.FC<{ 
  title: string; 
  products: Product[]; 
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  onQuickView: (p: Product) => void;
}> = ({ title, products, wishlist, toggleWishlist, onQuickView }) => {
  return (
    <section className="py-32 relative">
      <motion.div 
        variants={lineGrow}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="absolute top-0 left-8 right-8 h-[0.5px] bg-black/10 origin-left"
      />
      
      <div className="max-w-[1440px] mx-auto px-8 mb-20 flex items-end justify-between">
        <div className="overflow-hidden">
          <motion.h2 
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl font-light tracking-tight italic lowercase serif"
          >
            {title}
          </motion.h2>
        </div>
        <Link to="/shop" className="text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-4 hover:opacity-50 transition-opacity pb-2">
          Voir la sélection <ArrowRight size={14} />
        </Link>
      </div>
      
      <div className="flex overflow-x-auto no-scrollbar gap-12 px-8 pb-10">
        {products.map((p, i) => (
          <div key={p.id} className="flex-shrink-0 w-[380px] md:w-[500px]">
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
    </section>
  );
};

const Home: React.FC<{ addToCart: (p: Product) => void; wishlist: string[]; toggleWishlist: (id: string) => void }> = ({ addToCart, wishlist, toggleWishlist }) => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  
  const newest = PRODUCTS.slice(0, 4);
  const watches = PRODUCTS.filter(p => p.type === 'Montres').slice(0, 3);

  return (
    <div className="bg-[#fcfaf7]">
      {/* HERO SECTION - Monumental Reveal */}
      <section className="min-h-screen flex flex-col justify-center px-8 max-w-[1440px] mx-auto pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-10">
            <div className="space-y-0">
              <div className="overflow-hidden py-2">
                <motion.span 
                  variants={maskReveal}
                  initial="initial"
                  animate="animate"
                  className="block text-[12vw] lg:text-[11vw] font-light leading-[0.85] tracking-tighter serif italic"
                >
                  L'élégance
                </motion.span>
              </div>
              <div className="overflow-hidden py-2">
                <motion.span 
                  variants={maskReveal}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.1 }}
                  className="block text-[12vw] lg:text-[11vw] font-light leading-[0.85] tracking-tighter"
                >
                  est une
                </motion.span>
              </div>
              <div className="overflow-hidden py-2">
                <motion.span 
                  variants={maskReveal}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.2 }}
                  className="block text-[12vw] lg:text-[11vw] font-light leading-[0.85] tracking-tighter serif italic text-right lg:pr-32"
                >
                  structure.
                </motion.span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 flex flex-col justify-end pb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="space-y-12"
            >
              <div className="w-full h-[0.5px] bg-black/20 origin-left" />
              <p className="text-xs font-medium leading-relaxed text-black/50 uppercase tracking-[0.2em]">
                Maison de couture fondée sur les principes de la géométrie et du mouvement.
              </p>
              <Link to="/shop" className="group flex items-center gap-4">
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Découvrir</span>
                <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                  <ArrowRight size={16} />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full-width Image Reveal */}
      <section className="px-8 max-w-[1440px] mx-auto mb-40">
        <div className="relative aspect-[21/9] overflow-hidden group">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=90&w=2400" 
              className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-[3s]"
              alt="Atelier"
            />
          </motion.div>
          
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white pointer-events-none">
            <motion.span 
              initial={{ opacity: 0, letterSpacing: "1em" }}
              whileInView={{ opacity: 0.6, letterSpacing: "0.5em" }}
              transition={{ duration: 2 }}
              className="text-[10px] font-bold uppercase mb-8"
            >
              Collection Permanente
            </motion.span>
            <div className="overflow-hidden">
              <motion.h3 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl md:text-8xl serif italic font-light"
              >
                Manifeste 2024
              </motion.h3>
            </div>
          </div>
        </div>
      </section>

      <ArchitecturalShelf 
        title="nouvelles structures" 
        products={newest} 
        wishlist={wishlist}
        toggleWishlist={toggleWishlist}
        onQuickView={setQuickViewProduct}
      />

      {/* Quote Section with Line drawing */}
      <section className="py-60 relative overflow-hidden bg-white">
        <motion.div 
          variants={lineGrow}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[0.5px] h-40 bg-black/10 origin-top"
        />
        
        <div className="max-w-[1440px] mx-auto px-8 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-7xl serif italic font-light max-w-5xl mx-auto leading-[1.1] tracking-tight"
          >
            "Le vêtement est la première architecture de l'âme, une structure qui définit notre présence au monde."
          </motion.p>
        </div>
        
        <motion.div 
          variants={lineGrow}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[0.5px] h-40 bg-black/10 origin-bottom"
        />
      </section>

      <ArchitecturalShelf 
        title="précision horlogère" 
        products={watches} 
        wishlist={wishlist}
        toggleWishlist={toggleWishlist}
        onQuickView={setQuickViewProduct}
      />

      {/* Grid of details with staggered reveals */}
      <section className="max-w-[1440px] mx-auto px-8 py-40 grid grid-cols-1 md:grid-cols-2 gap-32">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="space-y-12"
        >
          <div className="aspect-[3/4] overflow-hidden bg-[#f2f0ed]">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1.5 }}
              src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=90&w=1200" 
              className="w-full h-full object-cover mix-blend-multiply" 
            />
          </div>
          <div className="space-y-6">
            <h4 className="text-5xl serif italic font-light">L'art de la coupe.</h4>
            <div className="w-20 h-[0.5px] bg-black/20" />
            <p className="text-black/50 font-medium text-sm leading-relaxed max-w-sm uppercase tracking-widest">
              Chaque patron est étudié comme un plan de masse, optimisant le tombé pour une liberté absolue.
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 50 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="space-y-12 md:mt-40"
        >
          <div className="aspect-[3/4] overflow-hidden bg-[#f2f0ed]">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1.5 }}
              src="https://images.unsplash.com/photo-1594932224828-b4b059b6f6ee?auto=format&fit=crop&q=90&w=1200" 
              className="w-full h-full object-cover mix-blend-multiply" 
            />
          </div>
          <div className="space-y-6">
            <h4 className="text-5xl serif italic font-light">Matières Brutes.</h4>
            <div className="w-20 h-[0.5px] bg-black/20" />
            <p className="text-black/50 font-medium text-sm leading-relaxed max-w-sm uppercase tracking-widest">
              Laine vierge et titane. Nous ne travaillons que les matériaux dans leur forme la plus noble.
            </p>
          </div>
        </motion.div>
      </section>

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
