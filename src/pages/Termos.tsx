import { Link } from 'react-router-dom'
import { FileText, AlertTriangle, CheckCircle } from 'lucide-react'

export default function Termos() {
  return (
    <div className="px-4 py-6">
      <h1 className="text-xl font-bold mb-1">Termos de Uso</h1>
      <p className="text-xs text-gray-400 mb-6">Última atualização: Abril de 2026</p>

      <div className="space-y-4">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-3">
            <FileText size={18} className="text-rose-600" />
            <h2 className="font-bold text-gray-800 text-sm">1. Aceitação dos Termos</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Ao acessar e usar a Sentinel Shield Store, você concorda com estes Termos de Uso.
            Se não concordar com qualquer parte destes termos, não utilize nossos serviços.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="font-bold text-gray-800 text-sm mb-2">2. Cadastro e Conta</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-2">
            Para realizar compras, você deve:
          </p>
          <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
            <li>Fornecer informações verdadeiras e atualizadas</li>
            <li>Manter a confidencialidade de sua senha</li>
            <li>Ser maior de 18 anos ou ter autorização dos pais</li>
            <li>Notificar-nos sobre uso não autorizado de sua conta</li>
          </ul>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="font-bold text-gray-800 text-sm mb-2">3. Produtos e Preços</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Nos esforçamos para manter informações precisas sobre produtos e preços.
            No entanto, erros podem ocorrer. Reservamo-nos o direito de corrigir preços
            incorretos e cancelar pedidos afetados.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={18} className="text-rose-600" />
            <h2 className="font-bold text-gray-800 text-sm">4. Trocas e Devoluções</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Você tem até 7 dias após o recebimento para solicitar troca ou devolução.
            O produto deve estar em perfeito estado, na embalagem original.
            Consulte nossa <Link to="/trocas" className="text-rose-600">Política de Trocas</Link> completa.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle size={18} className="text-rose-600" />
            <h2 className="font-bold text-gray-800 text-sm">5. Propriedade Intelectual</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Todo o conteúdo deste site (textos, imagens, logos, layout) é propriedade
            da Sentinel Shield Store e protegido por leis de propriedade intelectual. É proibida
            a reprodução sem autorização prévia.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="font-bold text-gray-800 text-sm mb-2">6. Limitação de Responsabilidade</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            A Sentinel Shield Store não se responsabiliza por danos indiretos, incidentais ou
            consequenciais relacionados ao uso de nossos serviços. Nossa responsabilidade
            limita-se ao valor da compra realizada.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="font-bold text-gray-800 text-sm mb-2">7. Alterações nos Termos</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Reservamo-nos o direito de modificar estes termos a qualquer momento.
            As alterações entram em vigor na data de publicação. Recomendamos
            revisar periodicamente esta página.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="font-bold text-gray-800 text-sm mb-2">8. Contato</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Dúvidas sobre estes termos? Entre em contato:{' '}
            <a href="mailto:contato@sentinelshield.com" className="text-rose-600">
              contato@sentinelshield.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
