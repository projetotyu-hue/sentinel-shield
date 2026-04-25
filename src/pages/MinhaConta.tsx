import { useState } from 'react'
import { Link } from 'react-router-dom'
import { User, Package, Heart, LogOut, Edit3, MapPin, Phone, Mail } from 'lucide-react'

interface UserData {
  name: string
  email: string
  phone: string
  address: string
}

export default function MinhaConta() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [user, setUser] = useState<UserData>({
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '(11) 99999-9999',
    address: 'Rua das Flores, 123 - São Paulo, SP'
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setForm({ name: '', email: '', password: '' })
  }

  if (!isLoggedIn) {
    return (
      <div className="px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <User size={24} className="text-rose-600" />
          <h1 className="text-xl font-bold">Minha Conta</h1>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                isLogin ? 'bg-rose-600 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                !isLogin ? 'bg-rose-600 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              Cadastrar
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Nome</label>
                <input
                  type="text"
                  placeholder="Seu nome completo"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-rose-600"
                />
              </div>
            )}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">E-mail</label>
              <input
                type="email"
                placeholder="seu@email.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-rose-600"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Senha</label>
              <input
                type="password"
                placeholder="••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-rose-600"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-rose-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-rose-700 transition-colors"
            >
              {isLogin ? 'Entrar' : 'Criar Conta'}
            </button>
          </form>

          <p className="text-xs text-gray-400 text-center mt-4">
            Ao continuar, você concorda com nossos{' '}
            <Link to="/termos" className="text-rose-600">Termos de Uso</Link>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Minha Conta</h1>
        <button onClick={handleLogout} className="text-sm text-gray-500 flex items-center gap-1">
          <LogOut size={16} /> Sair
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 mb-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center">
            <User size={28} className="text-rose-600" />
          </div>
          <div>
            <h2 className="font-bold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Phone size={16} className="text-gray-400" />
            <span className="text-gray-600">{user.phone}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <MapPin size={16} className="text-gray-400" />
            <span className="text-gray-600">{user.address}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Mail size={16} className="text-gray-400" />
            <span className="text-gray-600">{user.email}</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between bg-white rounded-xl border border-gray-100 p-4 opacity-50 cursor-not-allowed">
          <div className="flex items-center gap-3">
            <Package size={20} className="text-rose-600" />
            <span className="text-sm font-medium text-gray-800">Meus Pedidos</span>
          </div>
          <span className="text-xs text-gray-400">Em breve</span>
        </div>

        <div className="flex items-center justify-between bg-white rounded-xl border border-gray-100 p-4 opacity-50 cursor-not-allowed">
          <div className="flex items-center gap-3">
            <Heart size={20} className="text-rose-600" />
            <span className="text-sm font-medium text-gray-800">Favoritos</span>
          </div>
          <span className="text-xs text-gray-400">Em breve</span>
        </div>

        <div className="flex items-center justify-between bg-white rounded-xl border border-gray-100 p-4 opacity-50 cursor-not-allowed">
          <div className="flex items-center gap-3">
            <Edit3 size={20} className="text-rose-600" />
            <span className="text-sm font-medium text-gray-800">Editar Perfil</span>
          </div>
          <span className="text-xs text-gray-400">Em breve</span>
        </div>
      </div>
    </div>
  )
}
