import { Link } from 'react-router-dom'
import { ShieldCheck, Lock, Award, Mail, Phone, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-8">
      <div className="px-4 py-6 flex flex-col items-center gap-4">
        {/* Store Name */}
        <span className="text-base font-bold text-rose-600 tracking-tight">Sentinel Shield Store</span>

        {/* Trust Icons */}
        <div className="flex items-center justify-center gap-6 text-gray-400">
          <div className="flex flex-col items-center gap-1">
            <ShieldCheck size={20} />
            <span className="text-[10px]">Compra Segura</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Lock size={20} />
            <span className="text-[10px]">Dados Protegidos</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Award size={20} />
            <span className="text-[10px]">Compra Garantida</span>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-center text-xs text-gray-400 flex flex-col gap-0.5">
          <p className="font-medium text-gray-600">Sentinel Shield Store</p>
          <a href="mailto:contato@sentinelshield.com" className="flex items-center justify-center gap-1 hover:text-gray-600">
            <Mail size={10} /> contato@sentinelshield.com
          </a>
          <a href="https://wa.me/5511999999999" className="flex items-center justify-center gap-1 hover:text-gray-600">
            <Phone size={10} /> (11) 99999-9999
          </a>
          <p className="flex items-center justify-center gap-1">
            <Clock size={10} /> Seg-Sex: 09h-18h | Sáb: 09h-13h
          </p>
        </div>

        {/* Payment Methods */}
        <div className="flex flex-col items-center gap-1">
          <p className="text-xs text-gray-400">Formas de Pagamento</p>
          <div className="flex items-center gap-2">
            <span className="border border-gray-200 rounded px-3 py-1 text-xs font-medium text-gray-600">PIX</span>
            <span className="border border-gray-200 rounded px-3 py-1 text-xs font-medium text-gray-600">Cartão</span>
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <Link to="/termos" className="hover:text-gray-600 transition-colors">Termos de Uso</Link>
          <Link to="/privacidade" className="hover:text-gray-600 transition-colors">Privacidade</Link>
          <Link to="/trocas" className="hover:text-gray-600 transition-colors">Trocas e Devoluções</Link>
          <Link to="/contato" className="hover:text-gray-600 transition-colors">Contato</Link>
        </div>
      </div>
    </footer>
  )
}
