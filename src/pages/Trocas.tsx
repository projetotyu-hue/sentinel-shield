import { Link } from 'react-router-dom'
import { RefreshCw, Package, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react'

export default function Trocas() {
  return (
    <div className="px-4 py-6">
      <h1 className="text-xl font-bold mb-6">Trocas e Devoluções</h1>

      <div className="space-y-4">
        {/* Highlight Box */}
        <div className="bg-rose-50 border border-rose-100 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <RefreshCw size={18} className="text-rose-600" />
            <h2 className="font-bold text-rose-800 text-sm">Prazo de 7 dias</h2>
          </div>
          <p className="text-sm text-rose-700">
            Você tem até 7 dias após o recebimento para solicitar troca ou devolução.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="font-bold text-gray-800 text-sm mb-3">Como solicitar uma troca</h2>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-rose-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-bold text-rose-600">1</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Acesse sua conta</p>
                <p className="text-xs text-gray-500">Vá em "Minha Conta" → "Meus Pedidos"</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-rose-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-bold text-rose-600">2</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Selecione o pedido</p>
                <p className="text-xs text-gray-500">Clique no pedido com o item que deseja trocar</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-rose-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-bold text-rose-600">3</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Escolha o motivo</p>
                <p className="text-xs text-gray-500">Selecione o motivo da troca/devolução</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-rose-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-bold text-rose-600">4</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Enviaremos uma etiqueta</p>
                <p className="text-xs text-gray-500">Enviamos por e-mail a etiqueta de devolução gratuita</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Package size={18} className="text-rose-600" />
            <h2 className="font-bold text-gray-800 text-sm">Condições para troca</h2>
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-green-500 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600">Produto em perfeito estado</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-green-500 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600">Embalagem original intacta</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-green-500 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600">Nota fiscal inclusa</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-green-500 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600">Solicitação em até 7 dias</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle size={18} className="text-amber-500" />
            <h2 className="font-bold text-gray-800 text-sm">Não aceitamos trocas para:</h2>
          </div>
          <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
            <li>Produtos com sinais de uso inadequado</li>
            <li>Itens de higiene pessoal abertos</li>
            <li>Produtos fora do prazo de 7 dias</li>
            <li>Itens personalizados ou sob encomenda</li>
          </ul>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="font-bold text-gray-800 text-sm mb-2">Reembolso</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            O reembolso é processado em até 5 dias úteis após recebermos o produto devolvido.
            O valor é estornado na mesma forma de pagamento utilizada na compra.
          </p>
        </div>

        <Link
          to="/chat"
          className="flex items-center justify-center gap-2 bg-rose-600 text-white py-3 rounded-xl text-sm font-medium hover:bg-rose-700 transition-colors"
        >
          Precisa de ajuda com uma troca?
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}
