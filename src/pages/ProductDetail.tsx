import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useCart } from '../hooks/useCart'
import LoadingSkeleton from '../components/LoadingSkeleton'
import ErrorMessage from '../components/ErrorMessage'
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

  if (loading) return <div className="container mx-auto px-4 py-12"><LoadingSkeleton count={1} /></div>
  if (error) return <div className="container mx-auto px-4 py-12"><ErrorMessage message={error} onRetry={fetchProduct} /></div>
  if (!product) return <p className="text-center py-12">Produto não encontrado.</p>

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/produtos" className="text-purple-600 hover:underline mb-4 inline-block">
        ← Voltar para produtos
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        <img
          src={product.image_url || 'https://via.placeholder.com/500'}
          alt={product.name}
          className="w-full rounded-xl"
        />
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <p className="text-3xl font-bold text-purple-600 mb-6">
            R$ {product.price.toFixed(2)}
          </p>

          <div className="flex items-center gap-4 mb-6">
            <label className="text-sm text-gray-600">Quantidade:</label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border rounded-lg px-3 py-2"
            >
              {[1,2,3,4,5,6,7,8,9,10].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition mb-4"
          >
            Adicionar ao Carrinho
          </button>

          {product.free_shipping && (
            <p className="text-sm text-green-600">Frete grátis</p>
          )}
        </div>
      </div>
    </div>
  )
}
