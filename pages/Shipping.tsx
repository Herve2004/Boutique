
import React from 'react';
import { motion as motionBase } from 'framer-motion';
import { Truck, Box, ShieldCheck, Globe, Clock, Gift } from 'lucide-react';

const motion = motionBase as any;

const Shipping: React.FC = () => {
  return (
    <div className="max-w-[1024px] mx-auto px-6 pt-32 pb-24">
      <motion.header 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-20"
      >
        <h1 className="text-5xl font-bold tracking-tight mb-6">Expédition & Livraison.</h1>
        <p className="text-xl text-[#6e6e73] max-w-2xl leading-relaxed">
          Nous accordons autant d'importance à la livraison qu'à la confection de nos pièces. Profitez d'un service logistique de précision.
        </p>
      </motion.header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="bg-white p-10 rounded-[2.5rem] apple-card-shadow">
          <Truck className="text-[#0066cc] mb-6" size={32} />
          <h3 className="text-xl font-bold mb-3">Livraison Offerte</h3>
          <p className="text-[#6e6e73] text-sm leading-relaxed">La livraison standard est gratuite pour toutes les destinations en Europe, sans minimum d'achat.</p>
        </div>
        <div className="bg-white p-10 rounded-[2.5rem] apple-card-shadow">
          <Clock className="text-[#0066cc] mb-6" size={32} />
          <h3 className="text-xl font-bold mb-3">Délais Précis</h3>
          <p className="text-[#6e6e73] text-sm leading-relaxed">3 à 5 jours ouvrés pour la France. 24h avec l'option Express pour les commandes passées avant midi.</p>
        </div>
        <div className="bg-white p-10 rounded-[2.5rem] apple-card-shadow">
          <Gift className="text-[#0066cc] mb-6" size={32} />
          <h3 className="text-xl font-bold mb-3">Écrin Cadeau</h3>
          <p className="text-[#6e6e73] text-sm leading-relaxed">Toutes nos pièces sont expédiées dans un emballage signature, idéal pour offrir ou se faire plaisir.</p>
        </div>
      </div>

      <section className="bg-white rounded-[2.5rem] apple-card-shadow overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img 
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200" 
            className="w-full h-full object-cover min-h-[400px]" 
            alt="Packaging" 
          />
        </div>
        <div className="md:w-1/2 p-12 md:p-16 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-8">Un suivi en temps réel.</h2>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Box size={18} />
              </div>
              <div>
                <h4 className="font-bold mb-1">Préparation</h4>
                <p className="text-sm text-[#6e6e73]">Votre commande est préparée sous 24h dans nos ateliers.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Globe size={18} />
              </div>
              <div>
                <h4 className="font-bold mb-1">Transit</h4>
                <p className="text-sm text-[#6e6e73]">Suivez chaque étape du voyage via un lien de suivi sécurisé.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center flex-shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h4 className="font-bold mb-1">Réception</h4>
                <p className="text-sm text-[#6e6e73]">Livraison contre signature pour garantir la sécurité de vos achats.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shipping;
