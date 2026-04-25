import { Link, useNavigate } from 'react-router-dom'
import { House, Search, User, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Product } from '../types/product'

export default function Navbar() {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [showResults, setShowResults] = useState(false)
  const navigate = useNavigate()

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)

    if (value.length > 2) {
      const { data } = await supabase
        .from('products')
        .select('*')
        .or(`name.ilike.%${value}%,description.ilike.%${value}%`)
        .limit(5)

      setResults(data || [])
      setShowResults(true)
    } else {
      setResults([])
      setShowResults(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      setShowResults(false)
      navigate(`/produtos?search=${encodeURIComponent(search.trim())}`)
    }
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 w-full">
      <div className="px-4 py-3 flex items-center gap-3">
        {/* Logo */}
        <Link to="/" className="shrink-0">
          <span className="text-lg font-bold text-rose-600 tracking-tight flex items-center gap-1">
            <House size={20} />
          </span>
        </Link>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="flex-1 relative">
          <div className="flex items-center bg-gray-100 rounded-full px-3 py-2 gap-2">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Pesquisar"
              value={search}
              onChange={handleSearch}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
              onFocus={() => results.length > 0 && setShowResults(true)}
              className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Search Results Dropdown */}
          {showResults && results.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto">
              {results.map(product => (
                <Link
                  key={product.id}
                  to={`/produto/${product.id}`}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    setShowResults(false)
                    setSearch('')
                  }}
                >
                  <img
                    src={product.image_url || 'https://via.placeholder.com/40'}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-800 truncate">{product.name}</p>
                    <p className="text-sm font-bold text-rose-600">
                      R$ {product.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </form>

        {/* User & Cart Icons */}
        <div className="flex items-center gap-1 shrink-0">
          <Link to="/minha-conta" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <User size={20} className="text-gray-600" />
          </Link>
          <Link to="/carrinho" className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
            <ShoppingCart size={20} className="text-gray-600" />
          </Link>
        </div>
      </div>
    </header>
  )
}
