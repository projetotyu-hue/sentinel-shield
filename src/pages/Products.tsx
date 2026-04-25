import { useEffect, useState } from 'react'
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
  }, [])

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Todos os Produtos</h1>

      {/* Busca e Filtro */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Buscar produtos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
        <p className="text-center text-gray-500 py-12">
          {search || selectedCategory ? 'Nenhum produto encontrado.' : 'Nenhum produto disponível.'}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <Link to={`/produto/${product.id}`} key={product.id} className="group">
              <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition p-4">
                <img
                  src={product.image_url || 'https://via.placeholder.com/300'}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold text-gray-800 group-hover:text-purple-600 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-2xl font-bold text-purple-600 mt-2">
                  R$ {product.price.toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
