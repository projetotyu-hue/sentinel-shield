import { supabase } from './supabase'
import { CartItem } from '../hooks/useCart'

export interface OrderData {
  customer_name: string
  customer_email: string
  shipping_address: string
  total_amount: number
  items: Array<{
    product_id: string
    quantity: number
    unit_price: number
  }>
}

export async function createOrder(orderData: OrderData) {
  // Inserir o pedido
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      customer_name: orderData.customer_name,
      customer_email: orderData.customer_email,
      shipping_address: orderData.shipping_address,
      total_amount: orderData.total_amount,
      status: 'confirmed'
    })
    .select()
    .single()

  if (orderError) {
    throw new Error(`Erro ao criar pedido: ${orderError.message}`)
  }

  // Inserir os itens do pedido
  const orderItems = orderData.items.map(item => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    unit_price: item.unit_price
  }))

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems)

  if (itemsError) {
    throw new Error(`Erro ao criar itens do pedido: ${itemsError.message}`)
  }

  return order
}
