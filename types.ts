
export type Segment = 'Homme' | 'Femme' | 'Enfant';
export type Season = 'Printemps' | 'Été' | 'Automne' | 'Hiver';
export type ProductType = 'Habits' | 'Montres' | 'Chaussures' | 'Pantalons';

export interface Product {
  id: string;
  name: string;
  type: ProductType;
  segment: Segment;
  season: Season;
  price: number;
  description: string;
  images: string[];
  specs: string[];
}

export interface CartItem extends Product {
  quantity: number;
}
