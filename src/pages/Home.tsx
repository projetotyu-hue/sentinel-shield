import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
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

  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [
    { id: 1, image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=300&fit=crop', title: 'Ofertas Imperdíveis', subtitle: 'Até 70% OFF em produtos selecionados' },
    { id: 2, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=300&fit=crop', title: 'Tecnologia Premium', subtitle: 'Os melhores gadgets com frete grátis' },
    { id: 3, image: 'https://images.unsplash.com/photo-1498049794561-5f57a5a2e9b7?w=800&h=300&fit=crop', title: 'Frete Grátis', subtitle: 'Para compras acima de R$ 99,00' }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [slides.length])

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
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <Link to={`/produto/${product.id}`} className="block">
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
    </motion.div>
  )

  const renderProductCard2 = (product: Product) => (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <Link to={`/produto/${product.id}`} className="block">
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
    </motion.div>
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
            <p className="text-sm font-semibold text-gray-800">Sentinel Shield Store</p>
            <p className="text-xs text-gray-400">140.327 vendido(s)</p>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <button className="px-4 py-1.5 rounded-lg text-sm font-medium bg-rose-600 text-white hover:bg-rose-700 transition-colors">
            Seguir
          </button>
          <Link to="/chat" className="px-4 py-1.5 rounded-lg text-sm font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors text-center flex items-center justify-center gap-1">
            <MessageSquare size={14} /> Mensagem
          </Link>
        </div>
      </div>

      {/* Categories Section */}
      <div className="px-4 py-6">
        <h2 className="text-lg font-bold mb-4">Categorias</h2>
        <div className="grid grid-cols-4 gap-3">
          {[
            { name: 'Eletrodomésticos', icon: '🏠', slug: 'eletrodomesticos' },
            { name: 'Caixas de Som', icon: '🔊', slug: 'caixas-de-som' },
            { name: 'Fones de Ouvido', icon: '🎧', slug: 'fones-de-ouvido' },
            { name: 'Smartphones', icon: '📱', slug: 'smartphones' },
            { name: 'Smartwatches', icon: '⌚', slug: 'smartwatches' },
            { name: 'Notebooks', icon: '💻', slug: 'notebooks' },
            { name: 'Tablets', icon: '📱', slug: 'tablets' },
            { name: 'Consoles', icon: '🎮', slug: 'consoles' }
          ].map(cat => (
            <Link
              key={cat.slug}
              to={`/produtos?categoria=${cat.slug}`}
              className="flex flex-col items-center gap-1.5 p-3 bg-white rounded-xl border border-gray-100 hover:border-rose-200 hover:shadow-sm transition-all"
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-[10px] text-gray-600 text-center leading-tight">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Slider / Banner */}
      <div className="relative px-4 py-3">
        <div className="relative h-36 rounded-xl overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white">
                <h2 className="text-lg font-bold">{slide.title}</h2>
                <p className="text-sm mt-1">{slide.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Dots */}
        <div className="flex justify-center gap-1 mt-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? 'bg-rose-600' : 'bg-gray-300'
              }`}
            />
          ))}
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

          {/* Testimonials */}
          <div className="px-4 py-6 bg-gray-50">
            <h2 className="text-lg font-bold mb-4 text-center">O que dizem sobre nós</h2>
            <div className="grid grid-cols-1 gap-3">
              {[
                { name: 'Ana Silva', text: 'Comprei um fone de ouvido e chegou super rápido! Qualidade excelente, recomendo muito.', rating: 5 },
                { name: 'Carlos Mendes', text: 'Atendimento nota 10. Tive um problema com o frete e resolveram na hora pelo chat.', rating: 5 },
                { name: 'Juliana Costa', text: 'Os produtos são exatamente como nas fotos. Já comprei 3 vezes e nunca tive problemas.', rating: 4 }
              ].map((testimonial, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-1 mb-2">
                    {Array(testimonial.rating).fill('★').join('')}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">"{testimonial.text}"</p>
                  <p className="text-xs text-gray-400 font-medium">{testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="mt-6">
            <Newsletter />
          </div>
        </div>
      )}
    </div>
  )
}
