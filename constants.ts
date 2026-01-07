
import { Product } from './types';

export const PRODUCTS: Product[] = [
  // --- HOMME ---
  {
    id: 'h-1',
    name: 'Manteau d\'Hiver Signature',
    type: 'Habits',
    segment: 'Homme',
    season: 'Hiver',
    price: 850,
    description: 'Confectionné en laine vierge italienne avec une doublure en soie pour un confort thermique absolu.',
    images: [
      'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&q=90&w=2000',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=90&w=2000',
      'https://images.unsplash.com/photo-1539533330585-643cf2fe5279?auto=format&fit=crop&q=90&w=2000'
    ],
    specs: ['Laine Vierge 100%', 'Coupe Droite Classique', 'Poches Intérieures Invisibles']
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
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=90&w=2000',
      'https://images.unsplash.com/photo-1547996160-81dfa63595dd?auto=format&fit=crop&q=90&w=2000',
      'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=90&w=2000'
    ],
    specs: ['Titane Grade 5', 'Verre Saphir Antireflet', 'Bracelet en Cuir d\'Alligator']
  },
  {
    id: 'h-3',
    name: 'Oxford Héritage',
    type: 'Chaussures',
    segment: 'Homme',
    season: 'Printemps',
    price: 420,
    description: 'Une chaussure de ville raffinée, assemblée selon la méthode traditionnelle Goodyear.',
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=90&w=2000',
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=90&w=2000',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=90&w=2000'
    ],
    specs: ['Cuir Pleine Fleur', 'Semelle Goodyear', 'Tannage Végétal']
  },
  {
    id: 'h-4',
    name: 'Chino Lin & Coton',
    type: 'Pantalons',
    segment: 'Homme',
    season: 'Été',
    price: 180,
    description: 'Léger et infroissable, le compagnon idéal pour vos escapades estivales.',
    images: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=90&w=2000',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=90&w=2000'
    ],
    specs: ['Mélange Lin-Coton Premium', 'Fermeture à Boutons Nacre', 'Coupe Ajustée']
  },

  // --- FEMME ---
  {
    id: 'f-1',
    name: 'Robe du Soir Aurora',
    type: 'Habits',
    segment: 'Femme',
    season: 'Été',
    price: 1200,
    description: 'Une création éthérée en mousseline de soie qui capture la lumière de manière spectaculaire.',
    images: [
      'https://images.unsplash.com/photo-1539008835279-43467f5fd983?auto=format&fit=crop&q=90&w=2000',
      'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&q=90&w=2000',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=90&w=2000'
    ],
    specs: ['Mousseline de Soie', 'Broderies Main Perles', 'Doublure Douce']
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
      'https://images.unsplash.com/photo-1508685096489-7aac291ba597?auto=format&fit=crop&q=90&w=2000',
      'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&q=90&w=2000'
    ],
    specs: ['Or Rose 18 Carats', 'Index Diamants Certifiés', 'Mouvement Suisse Quartz']
  },
  {
    id: 'f-3',
    name: 'Bottes Cavalier Nappa',
    type: 'Chaussures',
    segment: 'Femme',
    season: 'Hiver',
    price: 950,
    description: 'Une ligne épurée en cuir Nappa ultra-souple pour une élégance quotidienne.',
    images: [
      'https://images.unsplash.com/photo-1551107643-7c16f80d015b?auto=format&fit=crop&q=90&w=2000',
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=90&w=2000'
    ],
    specs: ['Cuir Nappa Italien', 'Hauteur Genou', 'Fermeture Éclair invisible']
  },
  {
    id: 'f-4',
    name: 'Palazzo Lin Sauvage',
    type: 'Pantalons',
    segment: 'Femme',
    season: 'Printemps',
    price: 350,
    description: 'Une coupe ample et structurée pour une allure souveraine.',
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=90&w=2000',
      'https://images.unsplash.com/photo-1584305116359-ef8145a18a55?auto=format&fit=crop&q=90&w=2000'
    ],
    specs: ['Lin Sauvage Organique', 'Taille Haute Élastiquée', 'Poches Latérales']
  },

  // --- ENFANT ---
  {
    id: 'e-1',
    name: 'Parka Grand Nord',
    type: 'Habits',
    segment: 'Enfant',
    season: 'Hiver',
    price: 220,
    description: 'Technicité et style pour les petits explorateurs. Protection thermique optimale.',
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bbe18d5d67?auto=format&fit=crop&q=90&w=2000',
      'https://images.unsplash.com/photo-1604467794349-0b74285de7e7?auto=format&fit=crop&q=90&w=2000'
    ],
    specs: ['Matelassage Éco-Responsable', 'Tissu Coupe-vent', 'Éléments Réfléchissants']
  },
  {
    id: 'e-2',
    name: 'Smart Pulse Junior',
    type: 'Montres',
    segment: 'Enfant',
    season: 'Automne',
    price: 150,
    description: 'La montre connectée conçue pour les enfants, mêlant sécurité et éveil.',
    images: [
      'https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&q=90&w=2000',
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=90&w=2000'
    ],
    specs: ['Écran Tactile Antichoc', 'Autonomie 4 Jours', 'Jeux Éducatifs']
  },
  {
    id: 'e-3',
    name: 'Runners Air Light',
    type: 'Chaussures',
    segment: 'Enfant',
    season: 'Été',
    price: 95,
    description: 'La basket la plus légère du marché pour une liberté de mouvement totale.',
    images: [
      'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&q=90&w=2000',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=90&w=2000'
    ],
    specs: ['Tissu Mesh Ultra-respirant', 'Semelle Flex-Zone', 'Lavage en machine']
  },
  {
    id: 'e-4',
    name: 'Pantalon Cargo Explorer',
    type: 'Pantalons',
    segment: 'Enfant',
    season: 'Automne',
    price: 65,
    description: 'Un pantalon robuste et pratique avec de multiples poches pour les trésors.',
    images: [
      'https://images.unsplash.com/photo-1519457431-75731d7b8cbb?auto=format&fit=crop&q=90&w=2000',
      'https://images.unsplash.com/photo-1551834907-393288f57f6d?auto=format&fit=crop&q=90&w=2000'
    ],
    specs: ['Twill de Coton Épais', 'Genoux Articulés', 'Taille Ajustable']
  }
];

export const FAQS = [
  {
    question: "Quelle est votre politique de retour ?",
    answer: "Vous disposez de 14 jours pour retourner vos articles gratuitement dans nos boutiques ou par voie postale."
  },
  {
    question: "Où puis-je essayer les collections ?",
    answer: "Nos collections sont disponibles dans nos 25 Apple Store partenaires à travers la France."
  }
];
