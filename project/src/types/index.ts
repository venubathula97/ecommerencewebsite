export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
}