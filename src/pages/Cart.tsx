import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'

export default function Cart() {
  const { items, total, updateQuantity, removeFromCart, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Seu Carrinho está Vazio</h1>
        <p className="text-gray-500 mb-8">Adicione produtos para continuar comprando</p>
        <Link to="/produtos" className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700">
          Ver Produtos
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Carrinho de Compras</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {items.map(item => (
            <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm mb-4">
              <img
                src={item.image_url || item.image || 'https://via.placeholder.com/100'}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-grow">
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-purple-600 font-bold">R$ {item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300"
                >
                  -
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remover
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm h-fit">
          <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
          <div className="flex justify-between mb-2">
            <span>Itens:</span>
            <span>{items.reduce((s, i) => s + i.quantity, 0)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold mb-6">
            <span>Total:</span>
            <span className="text-purple-600">R$ {total.toFixed(2)}</span>
          </div>
          <Link
            to="/checkout"
            className="block w-full bg-purple-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-purple-700 mb-4"
          >
            Finalizar Compra
          </Link>
          <button
            onClick={clearCart}
            className="w-full bg-gray-200 text-gray-600 py-2 rounded-lg hover:bg-gray-300"
          >
            Limpar Carrinho
          </button>
        </div>
      </div>
    </div>
  )
}
