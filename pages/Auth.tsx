
import React, { useState, useEffect } from 'react';
import { motion as motionBase, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Mail, Lock, User, CheckCircle2 } from 'lucide-react';

const motion = motionBase as any;

interface AuthProps {
  mode: 'login' | 'signup';
}

const Auth: React.FC<AuthProps> = ({ mode: initialMode }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setMode(location.pathname === '/signup' ? 'signup' : 'login');
  }, [location.pathname]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulation d'authentification
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-20 flex flex-col lg:flex-row bg-[#fcfaf7]">
      {/* Visual Side - Editorial Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-[#121212]">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ duration: 2 }}
          src={mode === 'login' 
            ? "https://images.unsplash.com/photo-1490481651871-ab68624d5517?auto=format&fit=crop&q=90&w=1200" 
            : "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=90&w=1200"
          }
          className="absolute inset-0 w-full h-full object-cover grayscale brightness-50"
          alt="Atmosphere"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-20 text-white">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] mb-6 block opacity-60">L'Héritage Moderne</span>
            <h2 className="text-7xl serif italic font-light leading-tight mb-8">
              {mode === 'login' ? "L'élégance vous attend." : "Rejoignez la Maison."}
            </h2>
            <div className="w-24 h-px bg-white/20" />
          </motion.div>
        </div>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-24 lg:p-32 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="w-24 h-24 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl">
                <CheckCircle2 size={40} strokeWidth={1} />
              </div>
              <h3 className="text-4xl serif italic mb-4">Bienvenue.</h3>
              <p className="text-black/40 font-light">Accès en cours à votre atelier personnel...</p>
            </motion.div>
          ) : (
            <motion.div
              key={mode}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-md w-full mx-auto"
            >
              <div className="mb-16">
                <h1 className="text-6xl font-light tracking-tighter serif italic mb-4">
                  {mode === 'login' ? "Connexion" : "Inscription"}
                </h1>
                <p className="text-black/40 font-light">
                  {mode === 'login' 
                    ? "Accédez à vos commandes et à votre sélection personnalisée." 
                    : "Créez votre profil pour une expérience de couture sur mesure."}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-12">
                {mode === 'signup' && (
                  <div className="relative group">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-black/40 block mb-2 transition-colors group-focus-within:text-black">Nom Complet</label>
                    <div className="flex items-center border-b border-black/10 py-3 group-focus-within:border-black transition-all">
                      <User size={18} className="text-black/20 mr-4" />
                      <input 
                        required 
                        type="text" 
                        placeholder="Votre identité" 
                        className="bg-transparent border-none outline-none w-full serif italic text-xl placeholder:text-black/10" 
                      />
                    </div>
                  </div>
                )}

                <div className="relative group">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-black/40 block mb-2 transition-colors group-focus-within:text-black">Adresse Email</label>
                  <div className="flex items-center border-b border-black/10 py-3 group-focus-within:border-black transition-all">
                    <Mail size={18} className="text-black/20 mr-4" />
                    <input 
                      required 
                      type="email" 
                      placeholder="votre@mail.com" 
                      className="bg-transparent border-none outline-none w-full serif italic text-xl placeholder:text-black/10" 
                    />
                  </div>
                </div>

                <div className="relative group">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-black/40 block mb-2 transition-colors group-focus-within:text-black">Mot de passe</label>
                  <div className="flex items-center border-b border-black/10 py-3 group-focus-within:border-black transition-all">
                    <Lock size={18} className="text-black/20 mr-4" />
                    <input 
                      required 
                      type="password" 
                      placeholder="••••••••" 
                      className="bg-transparent border-none outline-none w-full text-xl placeholder:text-black/10" 
                    />
                  </div>
                </div>

                <div className="pt-8">
                  <button 
                    disabled={isLoading}
                    className="w-full bg-black text-white h-20 rounded-full font-bold uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-4 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-all active:scale-[0.98] group relative overflow-hidden"
                  >
                    {isLoading ? (
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full"
                      />
                    ) : (
                      <>
                        {mode === 'login' ? "Se connecter" : "Créer mon compte"}
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-16 text-center">
                <p className="text-sm font-light text-black/40">
                  {mode === 'login' ? "Pas encore de profil ?" : "Déjà membre de la Maison ?"}
                  <button 
                    onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                    className="ml-2 text-black font-bold uppercase tracking-widest text-[10px] hover:opacity-50 transition-opacity border-b border-black/10 pb-0.5"
                  >
                    {mode === 'login' ? "S'inscrire" : "Se connecter"}
                  </button>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating background graphic element */}
        <div className="absolute top-10 right-10 opacity-[0.03] pointer-events-none">
          <span className="text-[20vw] serif italic">É</span>
        </div>
      </div>
    </div>
  );
};

export default Auth;
