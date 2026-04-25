import { useState } from 'react'
import { Mail } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <div className="bg-gradient-to-r from-rose-50 to-pink-50 px-4 py-8">
      <div className="max-w-md mx-auto text-center">
        <Mail size={32} className="text-rose-600 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-gray-800 mb-1">Receba Ofertas Exclusivas</h3>
        <p className="text-sm text-gray-600 mb-4">
          Cadastre-se e receba cupons de desconto e novidades em primeira mão!
        </p>

        {submitted ? (
          <div className="bg-green-100 text-green-700 text-sm py-2 px-4 rounded-lg">
            ✅ E-mail cadastrado com sucesso!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Seu melhor e-mail"
              className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:border-rose-600"
              required
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-rose-600 text-white rounded-full text-sm font-medium hover:bg-rose-700 transition-colors shrink-0"
            >
              Enviar
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
