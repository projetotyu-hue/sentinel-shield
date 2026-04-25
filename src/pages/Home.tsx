import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import LoadingSkeleton from '../components/LoadingSkeleton'
import ErrorMessage from '../components/ErrorMessage'
import type { Product } from '../types/product'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchProducts = async () => {
    setLoading(true)
    setError('')

    const { data, error: supabaseError } = await supabase
      .from('products')
      .select('*')
      .limit(8)

    if (supabaseError) {
      setError('Erro ao carregar produtos. Tente novamente.')
      console.error('Erro ao buscar produtos:', supabaseError)
    } else {
      setProducts(data || [])
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Bem-vindo à Faber Shop</h1>
          <p className="text-xl mb-8">Achadinhos incríveis com os melhores preços</p>
          <Link to="/produtos" className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Ver Produtos
          </Link>
        </div>
      </section>

      {/* Produtos em destaque */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Produtos em Destaque</h2>

        {error ? (
          <ErrorMessage message={error} onRetry={fetchProducts} />
        ) : loading ? (
          <LoadingSkeleton count={8} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
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
      </section>
    </div>
  )
}
