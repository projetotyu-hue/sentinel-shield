import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { createOrder } from '../lib/orders'
import { CreditCard, MapPin, User, Mail } from 'lucide-react'

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

  const handleSubmit = async (e: React.FormEvent) => {
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
      <div className="px-4 py-16 text-center">
        <p className="text-base font-medium text-gray-600 mb-1">Nenhum item no carrinho</p>
        <p className="text-sm text-gray-400">Adicione produtos antes de finalizar</p>
      </div>
    )
  }

  return (
    <div className="px-4 py-6">
      <h1 className="text-xl font-bold mb-6">Finalizar Compra</h1>

      <div className="space-y-6">
        {/* Delivery Data */}
        <div>
          <h2 className="text-base font-bold mb-4">Dados de Entrega</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Nome Completo</label>
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-rose-500 focus-within:border-transparent">
                <User size={16} className="text-gray-400 mr-2 shrink-0" />
                <input
                  type="text"
                  required
                  placeholder="Seu nome completo"
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">E-mail</label>
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-rose-500 focus-within:border-transparent">
                <Mail size={16} className="text-gray-400 mr-2 shrink-0" />
                <input
                  type="email"
                  required
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Endereço Completo</label>
              <div className="flex items-start bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-rose-500 focus-within:border-transparent">
                <MapPin size={16} className="text-gray-400 mr-2 shrink-0 mt-0.5" />
                <textarea
                  required
                  placeholder="Rua, número, complemento, bairro, cidade - Estado"
                  value={form.address}
                  onChange={(e) => setForm({...form, address: e.target.value})}
                  className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 resize-none"
                  rows={3}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div>
          <h2 className="text-base font-bold mb-4">Pagamento</h2>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Número do Cartão (Simulado)</label>
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-rose-500 focus-within:border-transparent">
              <CreditCard size={16} className="text-gray-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={form.card}
                onChange={(e) => setForm({...form, card: e.target.value})}
                className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          onClick={handleSubmit}
          className="w-full bg-rose-600 text-white py-3 rounded-xl font-medium hover:bg-rose-700 transition-colors disabled:bg-rose-400 text-sm"
        >
          {loading ? 'Processando...' : `Pagar R$ ${total.toFixed(2)}`}
        </button>
      </div>

      {/* Order Summary */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 mt-6">
        <h2 className="text-base font-bold mb-3">Resumo</h2>
        {items.map(item => (
          <div key={item.id} className="flex justify-between py-2 text-sm">
            <span className="text-gray-600 truncate mr-2">{item.name} (x{item.quantity})</span>
            <span className="font-medium shrink-0">R$ {(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-100 mt-2">
          <span>Total:</span>
          <span className="text-rose-600">R$ {total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
