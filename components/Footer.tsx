
import React from 'react';
import { Instagram, Twitter, Facebook, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-8">
            <span className="text-3xl font-bold tracking-tighter">L'ÉLÉGANCE</span>
            <p className="text-white/60 font-light leading-relaxed">
              L'art de vivre à la française. Des pièces intemporelles conçues pour durer et sublimer votre quotidien.
            </p>
            <div className="flex space-x-6">
              <Instagram className="hover:opacity-60 cursor-pointer transition-opacity" size={20} />
              <Twitter className="hover:opacity-60 cursor-pointer transition-opacity" size={20} />
              <Facebook className="hover:opacity-60 cursor-pointer transition-opacity" size={20} />
            </div>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-white/40">Boutique</h4>
            <ul className="space-y-4 font-light">
              <li><Link to="/shop?segment=Homme" className="hover:text-white/60 transition-colors">Homme</Link></li>
              <li><Link to="/shop?segment=Femme" className="hover:text-white/60 transition-colors">Femme</Link></li>
              <li><Link to="/shop?type=Montres" className="hover:text-white/60 transition-colors">Montres</Link></li>
              <li><Link to="/shop" className="hover:text-white/60 transition-colors">Toutes les collections</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-white/40">Assistance</h4>
            <ul className="space-y-4 font-light">
              <li><Link to="/support" className="hover:text-white/60 transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-white/60 transition-colors">Expédition</Link></li>
              <li><Link to="/returns" className="hover:text-white/60 transition-colors">Retours</Link></li>
              <li><Link to="/contact" className="hover:text-white/60 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-white/40">Journal</h4>
            <p className="text-sm font-light text-white/60 mb-6 leading-relaxed">
              Inscrivez-vous pour recevoir nos dernières collections et actualités exclusives.
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="votre@email.com" 
                className="w-full bg-white/5 border-b border-white/20 py-3 focus:outline-none focus:border-white transition-colors font-light text-sm"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2">
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
          <div className="flex flex-col gap-2">
            <p>© 2024 L'ÉLÉGANCE MODERNE. TOUS DROITS RÉSERVÉS.</p>
            <Link to="/admin" className="text-white/20 hover:text-white transition-colors w-fit">Accès Professionnel</Link>
          </div>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-white transition-colors">Conditions</a>
            <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
