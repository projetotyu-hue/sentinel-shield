export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  original_price: number;
  discount_percent: number;
  image_url: string;
  badge: string | null;
  sales_count: number;
  free_shipping: boolean;
  category: string;
  section: string;
  position: number;
  featured: boolean;
  created_at: string;
  updated_at: string;
  category_id: string | null;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
