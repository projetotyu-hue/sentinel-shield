import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'

export default function Navbar() {
  const { items } = useCart()
  const count = items.reduce((s, i) => s + i.quantity, 0)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-purple-600">Faber Shop</Link>
        <div className="flex items-center gap-6">
          <Link to="/produtos" className="text-gray-600 hover:text-purple-600">Produtos</Link>
          <Link to="/carrinho" className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 3.7a1 1 0 001.1 1.5h9.2a1 1 0 00.9-1.5L13 13H7z" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}
