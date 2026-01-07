
import React, { useState } from 'react';
import { motion as motionBase, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, Scissors, Layers, Eye, Sparkles, Wind, Landmark, Quote } from 'lucide-react';
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
      whileInView={{ opacity: 0.4, y: 0 }}
      viewport={{ once: true }}
      className="text-[10px] font-black uppercase tracking-[0.8em] block mb-6"
    >
      {label}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-6xl md:text-8xl serif italic font-light tracking-tighter leading-none"
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
      {/* 1. LA VITRINE ÉMOTIONNELLE (HERO) */}
      <section className="relative min-h-screen flex items-center px-8 md:px-20 overflow-hidden pt-20">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ duration: 3 }}
            className="absolute -top-40 -right-40 w-[900px] h-[900px] border border-black rounded-full" 
          />
        </div>

        <div className="max-w-[1440px] mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-10">
              <div className="space-y-4">
                <div className="overflow-hidden">
                  <motion.h1 
                    initial={{ y: "100%" }} 
                    animate={{ y: 0 }} 
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[14vw] lg:text-[11vw] font-light leading-[0.8] tracking-tighter serif italic"
                  >
                    L'Élégance
                  </motion.h1>
                </div>
                <div className="overflow-hidden flex items-end">
                  <motion.h1 
                    initial={{ y: "100%" }} 
                    animate={{ y: 0 }} 
                    transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[14vw] lg:text-[11vw] font-light leading-[0.8] tracking-tighter uppercase ml-12 lg:ml-48"
                  >
                    Moderne
                  </motion.h1>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-24 lg:mt-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 border-t border-black/10 pt-16">
            <div className="lg:col-span-4">
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 1.5 }}
                className="text-[12px] font-black uppercase tracking-[0.4em] leading-relaxed max-w-xs"
              >
                L'équilibre parfait entre la rigueur de la structure et la poésie de la matière.
              </motion.p>
            </div>
            <div className="lg:col-start-11 lg:col-span-2 flex flex-col justify-end">
              <Link to="/shop" className="group flex items-center gap-4 text-[11px] font-black uppercase tracking-widest border-b border-black/20 pb-4 w-fit hover:border-black transition-all">
                 Explorer <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. L'ESSENCE DES MATIÈRES */}
      <section className="py-40 px-8 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto">
          <SectionHeader label="Le langage du toucher" title="L'Essence des Matières." />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <motion.img 
                whileInView={{ scale: 1.05 }} transition={{ duration: 10 }}
                src="https://images.unsplash.com/photo-1554047310-ab68624d5517?auto=format&fit=crop&q=100&w=1200" 
                className="w-full h-full object-cover grayscale brightness-110"
              />
              <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
            </div>
            <div className="space-y-16">
              <p className="text-2xl md:text-3xl font-light text-black/60 leading-relaxed serif italic">
                "Nous sélectionnons nos fibres comme un architecte choisit ses matériaux nobles. Laine de Tasmanie, soie de Lyon et lin de Normandie sont les fondations de notre style."
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                <div className="space-y-4">
                  <Wind size={32} strokeWidth={1} className="opacity-30" />
                  <h4 className="font-black text-[10px] uppercase tracking-widest">Aéro-Propriétés</h4>
                  <p className="text-sm text-black/40 leading-relaxed">Des tissus micro-perforés naturellement pour une respiration optimale du corps.</p>
                </div>
                <div className="space-y-4">
                  <Sparkles size={32} strokeWidth={1} className="opacity-30" />
                  <h4 className="font-black text-[10px] uppercase tracking-widest">Lustre Naturel</h4>
                  <p className="text-sm text-black/40 leading-relaxed">Un éclat discret obtenu par un brossage manuel sans aucun additif chimique.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LE SAVOIR-FAIRE (L'ATELIER) */}
      <section className="py-60 bg-black text-white relative">
        <div className="max-w-[1440px] mx-auto px-8">
          <SectionHeader label="L'artisanat du futur" title="Le Savoir-Faire." align="center" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-24 mt-20">
            {[
              { icon: Scissors, label: "01", title: "Coupe Millimétrée", desc: "Chaque patron est ajusté sur mannequin vivant pour une précision anatomique absolue." },
              { icon: Layers, label: "02", title: "Entoilage Tradition", desc: "Nous utilisons le crin de cheval pour garantir une tenue qui s'ennoblit avec le temps." },
              { icon: Landmark, label: "03", title: "Héritage Certifié", desc: "Chaque pièce porte la signature de l'artisan qui a veillé sur sa confection." }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }} className="text-center group">
                <div className="w-20 h-20 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-8 text-white/40 group-hover:text-white transition-colors">
                  <item.icon strokeWidth={1} size={32} />
                </div>
                <span className="text-4xl serif italic opacity-10 mb-4 block">{item.label}</span>
                <h3 className="text-2xl serif italic font-light mb-4">{item.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed uppercase tracking-widest max-w-xs mx-auto">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GALERIE SIGNATURE */}
      <section className="py-40 bg-[#fcfaf7] px-8">
        <div className="max-w-[1440px] mx-auto">
          <SectionHeader label="Visualisation Curatée" title="La Galerie Signature." align="left" />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:h-[1200px]">
            <div className="md:col-span-8 h-[400px] md:h-full overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1490481651871-ab68624d5517?auto=format&fit=crop&q=100&w=1600" className="w-full h-full object-cover grayscale brightness-90" />
              <div className="absolute bottom-10 left-10 text-white">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-2 block">Saison 2024</span>
                <p className="text-4xl serif italic">Le Minimalisme Radical</p>
              </div>
            </div>
            <div className="md:col-span-4 grid grid-rows-2 gap-8 h-full">
              <div className="overflow-hidden bg-stone-200">
                <img src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale" />
              </div>
              <div className="overflow-hidden bg-stone-200">
                <img src="https://images.unsplash.com/photo-1551834907-393288f57f6d?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NOS STRUCTURES (PRODUITS) */}
      <section className="py-40 bg-white">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="flex justify-between items-end mb-24 border-b border-black/5 pb-12">
            <h2 className="text-7xl serif italic font-light tracking-tighter">les archives.</h2>
            <Link to="/shop" className="text-[10px] font-black uppercase tracking-[0.5em] mb-4 hover:opacity-50 transition-all">Tout voir</Link>
          </div>
          <div className="flex overflow-x-auto no-scrollbar gap-12 pb-12">
            {newest.map((p, i) => (
              <div key={p.id} className="flex-shrink-0 w-[300px] md:w-[450px]">
                <ProductCard 
                  product={p} 
                  idx={i} 
                  onQuickView={setQuickViewProduct}
                  isWishlisted={wishlist.includes(p.id)}
                  onToggleWishlist={toggleWishlist}
                />
              </div>
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
