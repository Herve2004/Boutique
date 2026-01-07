
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion as motionBase, AnimatePresence } from 'framer-motion';
import { PRODUCTS } from '../constants';
import { Product, Segment, Season, ProductType } from '../types';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import { Search, X } from 'lucide-react';

const motion = motionBase as any;

const SkeletonCard = () => (
  <div className="bg-white rounded-[2.5rem] apple-card-shadow overflow-hidden h-full flex flex-col">
    <div className="aspect-square bg-[#fbfbfd] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
    </div>
    <div className="p-8 pt-6 space-y-4">
      <div className="flex gap-2">
        <div className="h-2 w-12 bg-stone-100 rounded" />
        <div className="h-2 w-8 bg-stone-100 rounded" />
      </div>
      <div className="h-6 w-3/4 bg-stone-100 rounded" />
      <div className="h-4 w-1/4 bg-stone-100 rounded" />
      <div className="h-10 w-32 bg-stone-100 rounded-full mt-4" />
    </div>
  </div>
);

const Shop: React.FC<{ addToCart: (p: Product) => void; wishlist: string[]; toggleWishlist: (id: string) => void }> = ({ addToCart, wishlist, toggleWishlist }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const segmentParam = searchParams.get('segment') || 'All';

  const [selectedSegment, setSelectedSegment] = useState<Segment | 'All'>(segmentParam as any);
  const [selectedSeason, setSelectedSeason] = useState<Season | 'All'>('All');
  const [selectedType, setSelectedType] = useState<ProductType | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [isLoading, setIsLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setSearchQuery(queryParam);
    if (segmentParam !== 'All') {
      setSelectedSegment(segmentParam as any);
    } else {
      setSelectedSegment('All');
    }
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [queryParam, segmentParam]);

  const handleFilterChange = (type: string, value: string) => {
    setIsLoading(true);
    if (type === 'segment') setSelectedSegment(value as any);
    if (type === 'season') setSelectedSeason(value as any);
    if (type === 'type') setSelectedType(value as any);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const clearSearch = () => {
    setIsLoading(true);
    setSearchQuery('');
    setSearchParams(prev => {
      prev.delete('q');
      return prev;
    });
    setTimeout(() => setIsLoading(false), 500);
  };

  const filtered = PRODUCTS.filter(p => {
    const matchesSegment = selectedSegment === 'All' || p.segment === selectedSegment;
    const matchesSeason = selectedSeason === 'All' || p.season === selectedSeason;
    const matchesType = selectedType === 'All' || p.type === selectedType;
    
    const searchLower = searchQuery.toLowerCase().trim();
    const matchesSearch = !searchLower || 
      p.name.toLowerCase().includes(searchLower) || 
      p.description.toLowerCase().includes(searchLower) ||
      p.type.toLowerCase().includes(searchLower);

    return matchesSegment && matchesSeason && matchesType && matchesSearch;
  });

  return (
    <div className="max-w-[1024px] mx-auto px-6 pt-32 pb-24">
      <header className="mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold tracking-tight mb-4"
        >
          {searchQuery ? `Résultats pour "${searchQuery}"` : 'Parcourir les collections.'}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-[#6e6e73] font-normal max-w-2xl"
        >
          {searchQuery 
            ? `Nous avons trouvé ${filtered.length} article${filtered.length > 1 ? 's' : ''} correspondant à votre recherche.`
            : 'Trouvez la pièce parfaite parmi nos sélections saisonnières pour toute la famille.'
          }
        </motion.p>

        {searchQuery && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={clearSearch}
            className="mt-6 flex items-center text-[#0066cc] font-medium text-sm hover:underline"
          >
            <X size={14} className="mr-1" /> Effacer la recherche
          </motion.button>
        )}
      </header>

      {/* Filters Section */}
      <div className="space-y-8 mb-16">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6e6e73]">Pour qui</span>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {['All', 'Homme', 'Femme', 'Enfant'].map(cat => (
              <button
                key={cat}
                onClick={() => handleFilterChange('segment', cat)}
                className={`flex-shrink-0 px-6 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                  selectedSegment === cat 
                    ? 'bg-black text-white shadow-lg' 
                    : 'bg-white text-[#1d1d1f] apple-card-shadow hover:bg-[#f5f5f7]'
                }`}
              >
                {cat === 'All' ? 'Tout' : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6e6e73]">Saison</span>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {['All', 'Printemps', 'Été', 'Automne', 'Hiver'].map(cat => (
              <button
                key={cat}
                onClick={() => handleFilterChange('season', cat)}
                className={`flex-shrink-0 px-6 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                  selectedSeason === cat 
                    ? 'bg-black text-white shadow-lg' 
                    : 'bg-white text-[#1d1d1f] apple-card-shadow hover:bg-[#f5f5f7]'
                }`}
              >
                {cat === 'All' ? 'Toutes' : cat}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6e6e73]">Catégorie</span>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {['All', 'Habits', 'Montres', 'Chaussures', 'Pantalons'].map(cat => (
              <button
                key={cat}
                onClick={() => handleFilterChange('type', cat)}
                className={`flex-shrink-0 px-6 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                  selectedType === cat 
                    ? 'bg-black text-white shadow-lg' 
                    : 'bg-white text-[#1d1d1f] apple-card-shadow hover:bg-[#f5f5f7]'
                }`}
              >
                {cat === 'All' ? 'Toutes' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[600px]">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))
        ) : (
          <AnimatePresence mode="popLayout">
            {filtered.map((product, idx) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                idx={idx} 
                onQuickView={setQuickViewProduct}
                isWishlisted={wishlist.includes(product.id)}
                onToggleWishlist={toggleWishlist}
              />
            ))}
          </AnimatePresence>
        )}
      </div>

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

      {!isLoading && filtered.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-24 text-center"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-stone-100 rounded-full mb-6">
            <Search size={32} className="text-black/20" />
          </div>
          <p className="text-[#6e6e73] text-lg">Aucun produit ne correspond à vos critères.</p>
          <button 
            onClick={() => { 
              setIsLoading(true);
              setSelectedSegment('All'); 
              setSelectedSeason('All'); 
              setSelectedType('All'); 
              setSearchQuery('');
              setTimeout(() => setIsLoading(false), 600); 
            }}
            className="text-[#0066cc] font-medium hover:underline mt-4"
          >
            Réinitialiser tous les filtres
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Shop;
