import { Link } from 'react-router-dom'
import { ShoppingCart, Trash2 } from 'lucide-react'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image_url: string
}

// Mock data for now
const mockItems: CartItem[] = []

export default function Cart() {
  const items = mockItems
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Seu carrinho está vazio</h2>
        <p className="text-gray-600 mb-8">Adicione produtos para continuar comprando.</p>
        <Link to="/" className="btn-primary inline-block">
          Ver Ofertas
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Carrinho de Compras</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="card flex p-4 gap-4">
              <img
                src={item.image_url}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <p className="text-orange-500 font-bold mt-1">
                  R$ {item.price.toFixed(2)}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button className="px-3 py-1 hover:bg-gray-100">-</button>
                    <span className="px-4 py-1 border-x border-gray-300">{item.quantity}</span>
                    <button className="px-3 py-1 hover:bg-gray-100">+</button>
                  </div>
                  <button className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resumo */}
        <div className="card p-6 h-fit">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Resumo do Pedido</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">R$ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Frete</span>
              <span className="text-green-600 font-semibold">Grátis</span>
            </div>
            <div className="border-t pt-2 flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold text-orange-500">R$ {subtotal.toFixed(2)}</span>
            </div>
          </div>
          <Link to="/checkout" className="btn-primary w-full text-center block">
            Finalizar Compra
          </Link>
        </div>
      </div>
    </div>
  )
}
