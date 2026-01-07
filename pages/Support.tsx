
import React from 'react';
import { motion as motionBase } from 'framer-motion';
import { ChevronDown, Truck, RefreshCcw, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FAQS } from '../constants';

const motion = motionBase as any;

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-b border-black/5">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-medium text-[#1d1d1f] group-hover:text-[#0066cc] transition-colors">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-black/30"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-[#6e6e73] leading-relaxed">
          {answer}
        </p>
      </motion.div>
    </div>
  );
};

const Support: React.FC = () => {
  return (
    <div className="max-w-[1024px] mx-auto px-6 pt-32 pb-24">
      <motion.header 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-20 text-center"
      >
        <h1 className="text-5xl font-bold tracking-tight mb-4">Centre d'Aide.</h1>
        <p className="text-xl text-[#6e6e73]">Nous sommes là pour répondre à toutes vos questions.</p>
      </motion.header>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        <Link to="/shipping" className="bg-white p-12 rounded-[2.5rem] apple-card-shadow flex items-center justify-between group">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 bg-blue-50 text-[#0066cc] rounded-2xl flex items-center justify-center">
              <Truck size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold">Livraison</h3>
              <p className="text-[#6e6e73] text-sm">Délais, suivi et emballage.</p>
            </div>
          </div>
          <motion.div whileHover={{ x: 5 }} className="text-black/20 group-hover:text-black transition-colors">
            <ChevronDown className="-rotate-90" size={24} />
          </motion.div>
        </Link>
        <Link to="/returns" className="bg-white p-12 rounded-[2.5rem] apple-card-shadow flex items-center justify-between group">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 bg-orange-50 text-[#bf4800] rounded-2xl flex items-center justify-center">
              <RefreshCcw size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold">Retours</h3>
              <p className="text-[#6e6e73] text-sm">Échanges et remboursements.</p>
            </div>
          </div>
          <motion.div whileHover={{ x: 5 }} className="text-black/20 group-hover:text-black transition-colors">
            <ChevronDown className="-rotate-90" size={24} />
          </motion.div>
        </Link>
      </div>

      {/* FAQ Section */}
      <section className="mb-32">
        <div className="flex items-center gap-4 mb-10">
          <HelpCircle className="text-black/20" size={32} />
          <h2 className="text-3xl font-bold tracking-tight">Questions Fréquentes</h2>
        </div>
        <div className="bg-white rounded-[2.5rem] apple-card-shadow px-8 md:px-12">
          {FAQS.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Support;
