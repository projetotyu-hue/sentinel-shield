import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { createOrder } from '../lib/orders'

export default function Checkout() {
  const { items, total, clearCart } = useCart()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    card: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await createOrder({
        customer_name: form.name,
        customer_email: form.email,
        shipping_address: form.address,
        total_amount: total,
        items: items.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          unit_price: item.price
        }))
      })

      clearCart()
      navigate('/pedido-confirmado', { state: { name: form.name } })
    } catch (err) {
      setError('Erro ao processar pedido. Tente novamente.')
      console.error('Erro no checkout:', err)
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Nenhum item no carrinho</h1>
        <p className="text-gray-500">Adicione produtos antes de finalizar</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-6">Dados de Entrega</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Endereço Completo</label>
            <textarea
              required
              value={form.address}
              onChange={(e) => setForm({...form, address: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={3}
            />
          </div>

          <h2 className="text-xl font-bold mb-6">Pagamento</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Número do Cartão (Simulado)</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              value={form.card}
              onChange={(e) => setForm({...form, card: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400"
          >
            {loading ? 'Processando...' : `Pagar R$ ${total.toFixed(2)}`}
          </button>
        </form>

        <div className="bg-white p-6 rounded-xl shadow-sm h-fit">
          <h2 className="text-xl font-bold mb-4">Resumo</h2>
          {items.map(item => (
            <div key={item.id} className="flex justify-between py-2 border-b">
              <span>{item.name} (x{item.quantity})</span>
              <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between text-xl font-bold mt-4 pt-4 border-t">
            <span>Total:</span>
            <span className="text-purple-600">R$ {total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
