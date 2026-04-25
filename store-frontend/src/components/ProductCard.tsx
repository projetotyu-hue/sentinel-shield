import { Link } from 'react-router-dom'
import { Product } from '../types'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  return (
    <Link to={`/produto/${product.id}`} className="card group">
      <div className="relative overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.discount_percent > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{product.discount_percent}%
          </div>
        )}
        {product.badge && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
            {product.badge}
          </div>
        )}
        {product.free_shipping && (
          <div className="absolute bottom-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
            FRETE GRÁTIS
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-sm text-gray-600 mb-1">{product.category}</h3>
        <h2 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h2>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-bold text-orange-500">
            R$ {product.price.toFixed(2)}
          </span>
          {product.original_price > product.price && (
            <span className="text-sm text-gray-400 line-through">
              R$ {product.original_price.toFixed(2)}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {product.sales_count} vendas
          </span>
          <button
            onClick={(e) => {
              e.preventDefault()
              alert('Adicionado ao carrinho!')
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm py-1 px-3 rounded transition-colors"
          >
            Comprar
          </button>
        </div>
      </div>
    </Link>
  )
}
