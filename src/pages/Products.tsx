import { useEffect, useState, useLocation } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import LoadingSkeleton from '../components/LoadingSkeleton'
import ErrorMessage from '../components/ErrorMessage'
import type { Product } from '../types/product'

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [categories, setCategories] = useState<string[]>([])
  const location = useLocation()

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
      setProducts(data || [])
      const cats = [...new Set((data || []).map(p => p.category).filter(Boolean))]
      setCategories(cats as string[])
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchProducts()

    // Check if there's a search query in the URL
    const params = new URLSearchParams(location.search)
    const searchParam = params.get('search')
    if (searchParam) {
      setSearch(searchParam)
    }
  }, [location.search])

  useEffect(() => {
    let filtered = products

    if (search) {
      const searchLower = search.toLowerCase()
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchLower) ||
        (p.description && p.description.toLowerCase().includes(searchLower))
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    setFilteredProducts(filtered)
  }, [products, search, selectedCategory])

  return (
    <div className="px-4 py-6">
      <h1 className="text-xl font-bold mb-6">Todos os Produtos</h1>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Pesquisar produtos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"
        >
          <option value="">Todas as categorias</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {error && (
        <ErrorMessage message={error} onRetry={fetchProducts} />
      )}

      {loading ? (
        <LoadingSkeleton count={8} />
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-gray-400 py-12">
          {search || selectedCategory ? 'Nenhum produto encontrado.' : 'Nenhum produto disponível.'}
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map(product => (
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
          ))}
        </div>
      )}
    </div>
  )
}
