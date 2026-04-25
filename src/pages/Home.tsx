import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import LoadingSkeleton from '../components/LoadingSkeleton'
import ErrorMessage from '../components/ErrorMessage'
import type { Product } from '../types/product'
import { MessageSquare } from 'lucide-react'

export default function Home() {
  const [featured, setFeatured] = useState<Product[]>([])
  const [recommended, setRecommended] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchProducts = async () => {
    setLoading(true)
    setError('')

    const { data, error: supabaseError } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (supabaseError) {
      setError('Erro ao carregar produtos. Tente novamente.')
      console.error('Erro ao buscar produtos:', supabaseError)
    } else {
      const all = data || []
      setFeatured(all.filter(p => p.featured).slice(0, 6))
      setRecommended(all.slice(0, 8))
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const renderProductCard3 = (product: Product) => (
    <Link to={`/produto/${product.id}`} key={product.id} className="block">
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-sm transition-shadow">
        <div className="relative aspect-square bg-gray-50">
          <img
            src={product.image_url || 'https://via.placeholder.com/300'}
            alt={product.name}
            className="object-cover"
            style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0 }}
          />
          {product.featured && (
            <div className="absolute top-1.5 left-1.5 bg-rose-600 text-white rounded-md flex flex-col items-center leading-none px-1.5 py-1">
              <span className="text-[7px] font-bold">TOP</span>
              <span className="text-[10px] font-bold">1</span>
            </div>
          )}
        </div>
        <div className="p-1.5">
          <p className="text-[10px] text-gray-700 line-clamp-2 leading-tight mb-1">{product.name}</p>
          <p className="text-xs font-bold text-rose-600">R$ {product.price.toFixed(2)}</p>
          {product.original_price && (
            <p className="text-[10px] text-gray-400 line-through">R$ {product.original_price.toFixed(2)}</p>
          )}
          {product.discount_percent && (
            <p className="text-[9px] font-bold text-rose-600">🔥 {product.discount_percent}% OFF</p>
          )}
          {product.free_shipping && (
            <p className="text-[9px] text-green-600">Frete grátis</p>
          )}
        </div>
      </div>
    </Link>
  )

  const renderProductCard2 = (product: Product) => (
    <Link to={`/produto/${product.id}`} key={product.id} className="block">
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-sm transition-shadow">
        <div className="aspect-square bg-gray-50 relative">
          <img
            src={product.image_url || 'https://via.placeholder.com/300'}
            alt={product.name}
            className="object-cover w-full h-full"
          />
          {product.discount_percent && (
            <span className="absolute top-2 left-2 bg-rose-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md z-10">
              {product.discount_percent}% OFF
            </span>
          )}
        </div>
        <div className="p-2.5">
          <p className="text-xs text-gray-600 line-clamp-2 mb-1 leading-tight">{product.name}</p>
          <p className="text-sm font-bold text-rose-600">R$ {product.price.toFixed(2)}</p>
          {product.original_price && (
            <p className="text-[10px] text-gray-400 line-through">R$ {product.original_price.toFixed(2)}</p>
          )}
        </div>
      </div>
    </Link>
  )

  return (
    <div>
      {/* Store Info Bar */}
      <div className="px-4 py-4 flex items-center justify-between border-b border-gray-50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-rose-100 overflow-hidden flex items-center justify-center shrink-0">
            <img src="https://via.placeholder.com/48" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Achadinhos do Momento 123</p>
            <p className="text-xs text-gray-400">140.327 vendido(s)</p>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <button className="px-4 py-1.5 rounded-lg text-sm font-medium bg-rose-600 text-white hover:bg-rose-700 transition-colors">
            Seguir
          </button>
          <a href="/chat.html" className="px-4 py-1.5 rounded-lg text-sm font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors text-center flex items-center justify-center gap-1">
            <MessageSquare size={14} /> Mensagem
          </a>
        </div>
      </div>

      {/* Promo Banners */}
      <div className="px-4 py-3 flex gap-2">
        <div className="flex-1 bg-gray-50 rounded-xl px-3 py-2.5 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-700">Cupom de frete grátis</p>
            <p className="text-[10px] text-gray-400">Em produtos selecionados</p>
          </div>
          <button className="text-xs font-medium px-3 py-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition-colors">
            Resgatar
          </button>
        </div>
        <div className="flex-1 bg-gray-50 rounded-xl px-3 py-2.5 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-700">Cupom 10% OFF</p>
            <p className="text-[10px] text-gray-400">Na primeira compra</p>
          </div>
          <button className="text-xs font-medium px-3 py-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition-colors">
            Resgatar
          </button>
        </div>
      </div>

      {/* Main Content */}
      {error ? (
        <div className="px-4 py-12">
          <ErrorMessage message={error} onRetry={fetchProducts} />
        </div>
      ) : loading ? (
        <div className="px-4 py-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-4 px-1">Principais produtos</h2>
            <LoadingSkeleton count={6} />
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4 px-1">Recomendado para você</h2>
            <LoadingSkeleton count={8} />
          </div>
        </div>
      ) : (
        <div className="px-4 py-6">
          {/* Featured Products - Grid 3 cols */}
          {featured.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4 px-1">Principais produtos</h2>
              <div className="grid grid-cols-3 gap-2">
                {featured.map(renderProductCard3)}
              </div>
            </div>
          )}

          {/* Recommended Products - Grid 2 cols */}
          <div>
            <h2 className="text-lg font-bold mb-4 px-1">Recomendado para você</h2>
            <div className="grid grid-cols-2 gap-3">
              {recommended.map(renderProductCard2)}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
