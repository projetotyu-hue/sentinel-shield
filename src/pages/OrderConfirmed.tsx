import { useLocation, Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

export default function OrderConfirmed() {
  const location = useLocation()
  const name = location.state?.name || 'Cliente'

  return (
    <div className="px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Pedido Confirmado!</h1>
        <p className="text-gray-600 mb-2">Obrigado, {name}!</p>
        <p className="text-gray-500 mb-8 text-sm">Seu pedido foi recebido e está sendo processado.</p>
        <Link
          to="/produtos"
          className="bg-rose-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-rose-700 inline-block text-sm transition-colors"
        >
          Continuar Comprando
        </Link>
      </div>
    </div>
  )
}
