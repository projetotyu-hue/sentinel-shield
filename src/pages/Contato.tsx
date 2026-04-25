import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Contato() {
  return (
    <div className="px-4 py-6">
      <h1 className="text-xl font-bold mb-6">Contato</h1>

      <div className="space-y-4">
        {/* Info Cards */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center shrink-0">
              <Phone size={18} className="text-rose-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800 text-sm">Telefone</h3>
              <p className="text-sm text-gray-600 mt-0.5">(11) 99999-9999</p>
              <p className="text-xs text-gray-400 mt-1">Seg a Sex, 9h às 18h</p>
            </div>
          </div>

          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center shrink-0">
              <Mail size={18} className="text-rose-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800 text-sm">E-mail</h3>
              <p className="text-sm text-gray-600 mt-0.5">contato@sentinelshield.com</p>
              <p className="text-xs text-gray-400 mt-1">Resposta em até 24h</p>
            </div>
          </div>

          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center shrink-0">
              <MapPin size={18} className="text-rose-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800 text-sm">Endereço</h3>
              <p className="text-sm text-gray-600 mt-0.5">Rua das Flores, 123</p>
              <p className="text-xs text-gray-500">São Paulo, SP - 01234-567</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center shrink-0">
              <Clock size={18} className="text-rose-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800 text-sm">Horário de Atendimento</h3>
              <p className="text-sm text-gray-600 mt-0.5">Segunda a Sexta: 9h às 18h</p>
              <p className="text-sm text-gray-600">Sábado: 9h às 13h</p>
            </div>
          </div>
        </div>

        {/* Chat Button */}
        <Link
          to="/chat"
          className="flex items-center justify-center gap-2 bg-rose-600 text-white py-3 rounded-xl text-sm font-medium hover:bg-rose-700 transition-colors"
        >
          <MessageCircle size={18} />
          Falar com Atendente
        </Link>

        {/* Social Media */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="font-medium text-gray-800 text-sm mb-3">Redes Sociais</h3>
          <div className="flex gap-3">
            <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-rose-100 transition-colors">
              <span className="text-gray-600 text-xs font-bold">IG</span>
            </a>
            <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-rose-100 transition-colors">
              <span className="text-gray-600 text-xs font-bold">FB</span>
            </a>
          </div>
        </div>

        {/* FAQ Link */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="font-medium text-gray-800 text-sm mb-1">Dúvidas Frequentes</h3>
          <p className="text-xs text-gray-500 mb-3">Encontre respostas rápidas na nossa central de ajuda</p>
          <Link to="/chat" className="text-sm text-rose-600 font-medium">
            Ver perguntas frequentes →
          </Link>
        </div>
      </div>
    </div>
  )
}
