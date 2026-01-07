
import React, { useState } from 'react';
import { motion as motionBase } from 'framer-motion';
import { Send, MapPin, Phone, Mail, Globe } from 'lucide-react';

const motion = motionBase as any;

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <div className="max-w-[1024px] mx-auto px-6 pt-32 pb-24">
      <div className="flex flex-col lg:flex-row gap-20">
        
        {/* Contact Info */}
        <div className="lg:w-1/3">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-5xl font-bold tracking-tight mb-8">Contact.</h1>
            <p className="text-lg text-[#6e6e73] mb-12">Nos conseillers sont à votre entière disposition pour toute demande particulière ou conseil personnalisé.</p>
            
            <div className="space-y-10">
              <div className="flex items-start gap-6">
                <div className="w-10 h-10 bg-white apple-card-shadow rounded-xl flex items-center justify-center text-black/40">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest mb-1">Siège Social</h4>
                  <p className="text-[#6e6e73]">12 Place Vendôme<br />75001 Paris, France</p>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <div className="w-10 h-10 bg-white apple-card-shadow rounded-xl flex items-center justify-center text-black/40">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest mb-1">Téléphone</h4>
                  <p className="text-[#6e6e73]">+33 (0) 1 45 67 89 00</p>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <div className="w-10 h-10 bg-white apple-card-shadow rounded-xl flex items-center justify-center text-black/40">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest mb-1">Email</h4>
                  <p className="text-[#6e6e73]">conciergerie@elegancemoderne.com</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Contact Form */}
        <div className="lg:w-2/3">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-10 md:p-16 rounded-[2.5rem] apple-card-shadow"
          >
            {isSent ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe size={40} />
                </div>
                <h2 className="text-2xl font-bold mb-2">Message Envoyé.</h2>
                <p className="text-[#6e6e73]">Un conseiller reviendra vers vous sous 24h.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/40 ml-4">Nom Complet</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-[#f5f5f7] border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-black/5 transition-all outline-none"
                      placeholder="Jean Dupont"
                      value={formState.name}
                      onChange={e => setFormState({...formState, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/40 ml-4">Email</label>
                    <input 
                      required
                      type="email" 
                      className="w-full bg-[#f5f5f7] border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-black/5 transition-all outline-none"
                      placeholder="jean@exemple.com"
                      value={formState.email}
                      onChange={e => setFormState({...formState, email: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-black/40 ml-4">Votre Message</label>
                  <textarea 
                    required
                    rows={5}
                    className="w-full bg-[#f5f5f7] border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-black/5 transition-all outline-none resize-none"
                    placeholder="Comment pouvons-nous vous aider ?"
                    value={formState.message}
                    onChange={e => setFormState({...formState, message: e.target.value})}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-black text-white py-5 rounded-full font-bold uppercase tracking-[0.2em] text-sm hover:opacity-90 transition-all flex items-center justify-center gap-3 group"
                >
                  Envoyer ma demande
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
