import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Product } from '../types'
import { Loader2, ArrowLeft, ShoppingCart } from 'lucide-react'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (id) fetchProduct()
  }, [id])

  async function fetchProduct() {
    setLoading(true)
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Erro ao buscar produto:', error)
    } else {
      setProduct(data)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Produto não encontrado</h2>
        <Link to="/" className="text-orange-500 hover:underline">
          Voltar para a loja
        </Link>
      </div>
    )
  }

  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Imagem */}
        <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div>
          <span className="text-sm text-gray-500 uppercase">{product.category}</span>
          <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-4">{product.name}</h1>

          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold text-orange-500">
              R$ {product.price.toFixed(2)}
            </span>
            {product.original_price && (
              <>
                <span className="text-xl text-gray-400 line-through">
                  R$ {product.original_price.toFixed(2)}
                </span>
                <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
                  -{discount}%
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-4 mb-6">
            <label className="text-gray-700">Qtd:</label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-1 border-x border-gray-300">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-3 py-1 hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <span className="text-sm text-gray-500">
              {product.stock} em estoque
            </span>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => {
                // TODO: Add to cart
                alert('Adicionado ao carrinho!')
              }}
              className="flex-1 btn-primary flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
