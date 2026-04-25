import { Link } from 'react-router-dom'
import { Product } from '../types'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : product.discount || 0

  return (
    <Link to={`/produto/${product.id}`} className="card group">
      <div className="relative overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{discount}%
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
          {product.original_price && (
            <span className="text-sm text-gray-400 line-through">
              R$ {product.original_price.toFixed(2)}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className={`text-xs ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock > 0 ? `${product.stock} em estoque` : 'Esgotado'}
          </span>
          <button
            onClick={(e) => {
              e.preventDefault()
              // TODO: Add to cart
            }}
            className="btn-primary text-sm py-1 px-3"
          >
            Comprar
          </button>
        </div>
      </div>
    </Link>
  )
}
