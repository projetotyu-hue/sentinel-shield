export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  discount?: number;
  image_url: string;
  category: string;
  stock: number;
  featured?: boolean;
  created_at?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
