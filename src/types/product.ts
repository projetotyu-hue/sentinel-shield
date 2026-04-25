export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  original_price: number | null
  discount_percent: number | null
  image_url: string | null
  badge: string | null
  sales_count: number
  free_shipping: boolean
  category: string | null
  section: string
  position: number
  featured: boolean
  created_at: string
  updated_at: string
}

export interface CartItem {
  id: string
  name: string
  price: number
  image_url: string | null
  quantity: number
}
