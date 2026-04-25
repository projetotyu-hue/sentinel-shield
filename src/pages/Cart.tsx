import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react'

export default function Cart() {
  const { items, total, updateQuantity, removeFromCart, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="px-4 py-20 flex flex-col items-center justify-center">
        <ShoppingCart size={48} className="text-gray-200 mb-4" />
        <p className="text-base font-medium text-gray-600 mb-1">Seu carrinho está vazio</p>
        <p className="text-sm text-gray-400 mb-6">Adicione produtos para continuar</p>
        <Link to="/produtos" className="bg-rose-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-rose-700 transition-colors">
          Ver produtos
        </Link>
      </div>
    )
  }

  return (
    <div className="px-4 py-6">
      <h1 className="text-xl font-bold mb-6">Carrinho</h1>

      <div className="space-y-3 mb-6">
        {items.map(item => (
          <div key={item.id} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100">
            <img
              src={item.image_url || item.image || 'https://via.placeholder.com/60'}
              alt={item.name}
              className="w-15 h-15 object-cover rounded-lg shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-800 truncate">{item.name}</p>
              <p className="text-sm font-bold text-rose-600">R$ {item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-7 h-7 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200"
              >
                <Minus size={14} />
              </button>
              <span className="w-5 text-center text-sm">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-7 h-7 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200"
              >
                <Plus size={14} />
              </button>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-400 hover:text-red-600 shrink-0"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="bg-white p-4 rounded-xl border border-gray-100">
        <h2 className="text-base font-bold mb-3">Resumo do Pedido</h2>
        <div className="flex justify-between mb-2 text-sm">
          <span className="text-gray-600">Itens:</span>
          <span className="font-medium">{items.reduce((s, i) => s + i.quantity, 0)}</span>
        </div>
        <div className="flex justify-between text-xl font-bold pt-3 border-t border-gray-100">
          <span>Total:</span>
          <span className="text-rose-600">R$ {total.toFixed(2)}</span>
        </div>
        <Link
          to="/checkout"
          className="block w-full bg-rose-600 text-white text-center py-3 rounded-xl font-medium hover:bg-rose-700 transition-colors mt-4 text-sm"
        >
          Finalizar Compra
        </Link>
        <button
          onClick={clearCart}
          className="w-full bg-gray-100 text-gray-600 py-2 rounded-lg hover:bg-gray-200 transition-colors mt-2 text-sm"
        >
          Limpar Carrinho
        </button>
      </div>
    </div>
  )
}
