import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useCart } from '../hooks/useCart'
import LoadingSkeleton from '../components/LoadingSkeleton'
import ErrorMessage from '../components/ErrorMessage'
import { ArrowLeft, ShoppingCart } from 'lucide-react'
import type { Product } from '../types/product'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  const fetchProduct = async () => {
    if (!id) return

    setLoading(true)
    setError('')

    const { data, error: supabaseError } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (supabaseError) {
      setError('Erro ao carregar produto. Tente novamente.')
      console.error('Erro ao buscar produto:', supabaseError)
    } else {
      setProduct(data)
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product as any)
      }
    }
  }

  if (loading) return <div className="px-4 py-12"><LoadingSkeleton count={1} /></div>
  if (error) return <div className="px-4 py-12"><ErrorMessage message={error} onRetry={fetchProduct} /></div>
  if (!product) return <p className="text-center py-12">Produto não encontrado.</p>

  return (
    <div className="px-4 py-4">
      <Link to="/produtos" className="inline-flex items-center gap-1 text-rose-600 hover:underline mb-4 text-sm">
        <ArrowLeft size={16} /> Voltar para produtos
      </Link>

      <div className="flex flex-col gap-4">
        {/* Product Image */}
        <div className="rounded-xl overflow-hidden bg-gray-50 relative">
          <img
            src={product.image_url || 'https://via.placeholder.com/500'}
            alt={product.name}
            className="w-full aspect-square object-cover"
          />
          {product.discount_percent && (
            <span className="absolute top-3 left-3 bg-rose-600 text-white text-xs font-bold px-2 py-1 rounded-lg">
              {product.discount_percent}% OFF
            </span>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 text-sm mb-4">{product.description}</p>

          <div className="flex items-baseline gap-2 mb-4">
            <p className="text-3xl font-bold text-rose-600">
              R$ {product.price.toFixed(2)}
            </p>
            {product.original_price && (
              <p className="text-lg text-gray-400 line-through">
                R$ {product.original_price.toFixed(2)}
              </p>
            )}
          </div>

          {product.discount_percent && (
            <p className="text-sm font-bold text-rose-600 mb-4">🔥 {product.discount_percent}% OFF</p>
          )}

          {product.free_shipping && (
            <p className="text-sm text-green-600 mb-4">🚚 Frete grátis</p>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <label className="text-sm text-gray-600">Quantidade:</label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            >
              {[1,2,3,4,5,6,7,8,9,10].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-rose-600 text-white py-3 rounded-xl font-semibold hover:bg-rose-700 transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart size={18} /> Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  )
}
