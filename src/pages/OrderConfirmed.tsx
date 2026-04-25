import { useLocation, Link } from 'react-router-dom'

export default function OrderConfirmed() {
  const location = useLocation()
  const name = location.state?.name || 'Cliente'

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-4">Pedido Confirmado!</h1>
        <p className="text-gray-600 mb-2">Obrigado, {name}!</p>
        <p className="text-gray-500 mb-8">Seu pedido foi recebido e está sendo processado.</p>
        <Link
          to="/produtos"
          className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 inline-block"
        >
          Continuar Comprando
        </Link>
      </div>
    </div>
  )
}
