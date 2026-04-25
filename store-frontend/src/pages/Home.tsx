import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Product } from '../types'
import ProductCard from '../components/ProductCard'
import { Loader2 } from 'lucide-react'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('todos')

  const categories = [
    { id: 'todos', name: 'Todos' },
    { id: 'eletronicos', name: 'Eletrônicos' },
    { id: 'casa', name: 'Casa' },
    { id: 'moda', name: 'Moda' },
    { id: 'esportes', name: 'Esportes' },
  ]

  useEffect(() => {
    fetchProducts()
  }, [activeCategory])

  async function fetchProducts() {
    setLoading(true)
    let query = supabase.from('products').select('*')

    if (activeCategory !== 'todos') {
      query = query.eq('category', activeCategory)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao buscar produtos:', error)
    } else {
      setProducts(data || [])
    }
    setLoading(false)
  }

  return (
    <div>
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Ofertas Imperdíveis
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Até 97% OFF em produtos selecionados
          </p>
          <a
            href="#produtos"
            className="bg-white text-orange-500 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors inline-block"
          >
            Ver Ofertas
          </a>
        </div>
      </section>

      {/* Categorias */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-2 overflow-x-auto pb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Produtos */}
      <section id="produtos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            Nenhum produto encontrado nesta categoria.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
