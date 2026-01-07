
import React, { useState } from 'react';
import { motion as motionBase, AnimatePresence } from 'framer-motion';
import { ArrowRight, Scissors, Layers, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants.ts';
import { Product } from '../types.ts';
import ProductCard from '../components/ProductCard.tsx';
import QuickViewModal from '../components/QuickViewModal.tsx';

const motion = motionBase as any;

const SectionHeader: React.FC<{ label: string; title: string; align?: 'left' | 'center' }> = ({ label, title, align = 'left' }) => (
  <div className={`mb-24 ${align === 'center' ? 'text-center' : ''}`}>
    <motion.span 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 0.5, y: 0 }}
      viewport={{ once: true }}
      className="text-[10px] font-bold uppercase tracking-[0.6em] block mb-6 text-black/50"
    >
      {label}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="text-6xl md:text-9xl serif italic font-light tracking-tighter leading-[0.85]"
    >
      {title}
    </motion.h2>
  </div>
);

const Home: React.FC<{ addToCart: (p: Product) => void; wishlist: string[]; toggleWishlist: (id: string) => void }> = ({ addToCart, wishlist, toggleWishlist }) => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const newest = PRODUCTS.slice(0, 4);

  return (
    <div className="bg-[#fcfaf7]">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center px-8 md:px-20 overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.25 }}
            transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
            src="https://images.unsplash.com/photo-1490481651871-ab68624d5517?auto=format&fit=crop&q=100&w=2400" 
            className="w-full h-full object-cover grayscale brightness-110"
          />
        </div>

        <div className="max-w-[1440px] mx-auto w-full relative z-10 mt-20">
          <div className="space-y-4">
            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: "110%" }} 
                animate={{ y: 0 }} 
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-[16vw] lg:text-[13vw] font-light leading-[0.75] tracking-tighter serif italic"
              >
                L'Élégance
              </motion.h1>
            </div>
            <div className="overflow-hidden flex items-end">
              <motion.h1 
                initial={{ y: "110%" }} 
                animate={{ y: 0 }} 
                transition={{ duration: 1.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="text-[16vw] lg:text-[13vw] font-light leading-[0.75] tracking-tighter uppercase ml-8 lg:ml-48"
              >
                Atemporelle
              </motion.h1>
            </div>
          </div>
          
          <div className="mt-24 lg:mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 border-t border-black/10 pt-16">
            <div className="lg:col-span-5">
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 0.5 }} 
                transition={{ delay: 1.5 }}
                className="text-[14px] font-medium uppercase tracking-[0.2em] leading-relaxed max-w-sm"
              >
                Redéfinir le luxe par la simplicité. <br/>
                Une architecture de soi.
              </motion.p>
            </div>
            <div className="lg:col-start-11 lg:col-span-2 flex flex-col justify-end">
              <Link to="/shop" className="group flex items-center gap-6 text-[12px] font-bold uppercase tracking-[0.4em] border-b border-black/20 pb-4 w-fit hover:border-black transition-all">
                 Explorer <ArrowRight size={18} className="group-hover:translate-x-3 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SAVOIR FAIRE */}
      <section className="py-48 px-8 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <SectionHeader label="Notre philosophie" title="Le Geste Pur." />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">
            {[
              { icon: Scissors, title: "Précision", desc: "Le patronage est une science de la ligne parfaite." },
              { icon: Layers, title: "Origine", desc: "Matières sélectionnées dans les meilleurs ateliers d'Europe." },
              { icon: Landmark, title: "Héritage", desc: "Transmettre un style qui défie les saisons." }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 40 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <item.icon className="mb-10 opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" size={48} strokeWidth={1} />
                <h3 className="text-3xl serif italic mb-6">{item.title}</h3>
                <p className="text-sm text-black/40 leading-relaxed uppercase tracking-[0.2em]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. COLLECTION PREVIEW */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-[1440px] mx-auto px-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 h-[700px] lg:h-[900px]">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative overflow-hidden group h-full cursor-pointer"
              >
                 <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=90&w=1200" className="w-full h-full object-cover grayscale transition-transform duration-[4s] group-hover:scale-110" />
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <span className="px-12 py-5 bg-white text-black text-[12px] font-bold uppercase tracking-[0.5em]">Collections Femme</span>
                 </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative overflow-hidden group h-full cursor-pointer"
              >
                 <img src="https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=90&w=1200" className="w-full h-full object-cover grayscale transition-transform duration-[4s] group-hover:scale-110" />
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <span className="px-12 py-5 bg-white text-black text-[12px] font-bold uppercase tracking-[0.5em]">Collections Homme</span>
                 </div>
              </motion.div>
           </div>
        </div>
      </section>

      {/* 4. ARCHIVES / SHOP PREVIEW */}
      <section className="py-48 bg-white">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32 gap-8">
            <h2 className="text-7xl md:text-9xl serif italic font-light tracking-tighter leading-none">Les Archives.</h2>
            <Link to="/shop" className="text-[12px] font-bold uppercase tracking-[0.4em] mb-4 hover:opacity-50 transition-all flex items-center gap-6 border-b border-black/10 pb-4">
              Tout le catalogue <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {newest.map((p, i) => (
              <ProductCard 
                key={p.id} 
                product={p} 
                idx={i} 
                onQuickView={setQuickViewProduct}
                isWishlisted={wishlist.includes(p.id)}
                onToggleWishlist={toggleWishlist}
              />
            ))}
          </div>
        </div>
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
