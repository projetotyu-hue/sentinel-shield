import { ShieldCheck, Lock, Award, Mail, Phone, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-8">
      <div className="px-4 py-6 flex flex-col items-center gap-4">
        {/* Store Name */}
        <span className="text-base font-bold text-rose-600 tracking-tight">Achadinhos do Momento 123</span>

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
          <p className="font-medium text-gray-600">Achadinhos do Momento 123</p>
          <p>CNPJ: 55.012.266/0001-46</p>
          <p>AV CELSO GARCIA 3220, São Paulo-SP</p>
          <a href="mailto:achadinhoscontato@gmail.com" className="flex items-center justify-center gap-1 hover:text-gray-600">
            <Mail size={10} /> achadinhoscontato@gmail.com
          </a>
          <a href="https://wa.me/5511996586625" className="flex items-center justify-center gap-1 hover:text-gray-600">
            <Phone size={10} /> (11) 99658-6625
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
          <a href="/termos.html" className="hover:text-gray-600 transition-colors">Termos de Uso</a>
          <a href="/privacidade.html" className="hover:text-gray-600 transition-colors">Privacidade</a>
          <a href="/trocas-e-devolucoes.html" className="hover:text-gray-600 transition-colors">Trocas e Devoluções</a>
          <a href="/contato.html" className="hover:text-gray-600 transition-colors">Contato</a>
        </div>
      </div>
    </footer>
  )
}
