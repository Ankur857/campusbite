export interface QuickReorderItem {
  id: number;
  name: string;
  price: number;
  image: string;
  lastOrdered: string;
}

export interface Offer {
  id: number;
  title: string;
  description: string;
  code: string;
}

export interface TrendingItem {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  badge: string;
}