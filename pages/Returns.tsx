
import React from 'react';
import { motion as motionBase } from 'framer-motion';
import { RefreshCcw, CheckCircle2, FileText, PackageCheck, CreditCard } from 'lucide-react';

const motion = motionBase as any;

const Returns: React.FC = () => {
  return (
    <div className="max-w-[1024px] mx-auto px-6 pt-32 pb-24">
      <motion.header 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-20 text-center"
      >
        <div className="w-20 h-20 bg-orange-50 text-[#bf4800] rounded-full flex items-center justify-center mx-auto mb-8">
          <RefreshCcw size={40} />
        </div>
        <h1 className="text-5xl font-bold tracking-tight mb-6">Retours & Échanges.</h1>
        <p className="text-xl text-[#6e6e73] max-w-2xl mx-auto leading-relaxed">
          Si votre pièce ne vous apporte pas une satisfaction totale, vous disposez de 30 jours pour la retourner gratuitement.
        </p>
      </motion.header>

      <section className="mb-24">
        <h2 className="text-3xl font-bold mb-12 text-center">Comment effectuer un retour ?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-white apple-card-shadow rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText size={24} className="text-black/40" />
            </div>
            <h4 className="font-bold mb-2">1. Demande</h4>
            <p className="text-xs text-[#6e6e73]">Remplissez le formulaire de retour dans votre espace client.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white apple-card-shadow rounded-2xl flex items-center justify-center mx-auto mb-6">
              <PackageCheck size={24} className="text-black/40" />
            </div>
            <h4 className="font-bold mb-2">2. Emballage</h4>
            <p className="text-xs text-[#6e6e73]">Replacez l'article dans son écrin d'origine avec les étiquettes.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white apple-card-shadow rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={24} className="text-black/40" />
            </div>
            <h4 className="font-bold mb-2">3. Expédition</h4>
            <p className="text-xs text-[#6e6e73]">Utilisez l'étiquette de retour prépayée fournie.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white apple-card-shadow rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CreditCard size={24} className="text-black/40" />
            </div>
            <h4 className="font-bold mb-2">4. Remboursement</h4>
            <p className="text-xs text-[#6e6e73]">Crédit sur votre compte sous 7 jours après réception.</p>
          </div>
        </div>
      </section>

      <div className="bg-stone-50 rounded-[2.5rem] p-12 md:p-16">
        <h3 className="text-2xl font-bold mb-8">Conditions de retour</h3>
        <ul className="space-y-6">
          <li className="flex gap-4">
            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0" />
            <p className="text-[#6e6e73]">Les articles doivent être retournés dans leur état d'origine, non portés et avec toutes les protections plastiques intactes.</p>
          </li>
          <li className="flex gap-4">
            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0" />
            <p className="text-[#6e6e73]">Les montres gravées ou les costumes personnalisés ne peuvent faire l'objet d'un retour, sauf défaut de fabrication.</p>
          </li>
          <li className="flex gap-4">
            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0" />
            <p className="text-[#6e6e73]">Les échanges en boutique sont possibles sur présentation de votre facture numérique.</p>
          </li>
        </ul>
        <div className="mt-12">
          <button className="bg-black text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:opacity-90 transition-all">
            Démarrer un retour en ligne
          </button>
        </div>
      </div>
    </div>
  );
};

export default Returns;
