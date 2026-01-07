
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'h-1',
    name: 'Manteau d\'Hiver Signature',
    type: 'Habits',
    segment: 'Homme',
    season: 'Hiver',
    price: 850,
    description: 'Confectionné en laine vierge italienne avec une doublure en soie pour un confort thermique absolu.',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=90&w=1200',
      'https://images.unsplash.com/photo-1544022613-e879a7998d8f?auto=format&fit=crop&q=90&w=1200'
    ],
    specs: ['Laine Vierge 100%', 'Coupe Droite Classique', 'Doublure Soie Lyonnaise']
  },
  {
    id: 'h-2',
    name: 'Vanguard Titanium Noir',
    type: 'Montres',
    segment: 'Homme',
    season: 'Automne',
    price: 3200,
    description: 'Le summum de la technologie horlogère. Boîtier en titane brossé et mouvement automatique haute fréquence.',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=90&w=1200',
      'https://images.unsplash.com/photo-1547996160-81dfa63595dd?auto=format&fit=crop&q=90&w=1200'
    ],
    specs: ['Titane Grade 5', 'Verre Saphir Antireflet', 'Bracelet Cuir Véritable']
  },
  {
    id: 'f-1',
    name: 'Robe du Soir Aurora',
    type: 'Habits',
    segment: 'Femme',
    season: 'Été',
    price: 1200,
    description: 'Une création éthérée en mousseline de soie qui capture la lumière de manière spectaculaire.',
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=90&w=1200',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=90&w=1200'
    ],
    specs: ['Mousseline de Soie', 'Broderies Main Perles', 'Pièce Unique']
  },
  {
    id: 'f-2',
    name: 'Petite Heure Or Rose',
    type: 'Montres',
    segment: 'Femme',
    season: 'Printemps',
    price: 2800,
    description: 'Délicatesse et précision. Un cadran en nacre serti de index diamants.',
    images: [
      'https://images.unsplash.com/photo-1508685096489-7aac291ba597?auto=format&fit=crop&q=90&w=1200',
      'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&q=90&w=1200'
    ],
    specs: ['Or Rose 18 Carats', 'Index Diamants', 'Mouvement Suisse Quartz']
  }
];

export const FAQS = [
  {
    question: "Quelle est votre politique de retour ?",
    answer: "Vous disposez de 14 jours pour retourner vos articles gratuitement dans nos boutiques ou par voie postale."
  },
  {
    question: "Où puis-je essayer les collections ?",
    answer: "Nos collections sont disponibles dans nos boutiques partenaires et showrooms à travers le monde."
  }
];
