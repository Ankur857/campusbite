export interface MenuItem {
  id: string;
  name: string;
  category?: string; // Optional since category is defined at parent level
  description?: string;
  price: number | null;
  veg?: boolean;
  popular?: boolean;
  rating?: number;
  preparationTime?: string;
  available?: boolean;
  image?: string;
}

export interface MenuCategory {
  category: string;
  items: MenuItem[];
}

export interface MenuData extends Array<MenuCategory> {}

export type SortOption = 'default' | 'price-low' | 'price-high' | 'rating';

export interface FilterState {
  searchQuery: string;
  vegOnly: boolean;
  popularOnly: boolean;
  sortBy: SortOption;
}
