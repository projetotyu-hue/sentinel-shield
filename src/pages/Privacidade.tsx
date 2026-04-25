import { Link } from 'react-router-dom'
import { Shield, Lock, Database, UserCheck } from 'lucide-react'

export default function Privacidade() {
  return (
    <div className="px-4 py-6">
      <h1 className="text-xl font-bold mb-1">Política de Privacidade</h1>
      <p className="text-xs text-gray-400 mb-6">Última atualização: Abril de 2026</p>

      <div className="space-y-4">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Shield size={18} className="text-rose-600" />
            <h2 className="font-bold text-gray-800 text-sm">1. Coleta de Informações</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Coletamos informações que você nos fornece diretamente, como nome, e-mail, telefone,
            endereço e dados de pagamento quando realiza uma compra ou cria uma conta em nossa loja.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Database size={18} className="text-rose-600" />
            <h2 className="font-bold text-gray-800 text-sm">2. Uso das Informações</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed mb-2">
            Utilizamos suas informações para:
          </p>
          <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
            <li>Processar e entregar seus pedidos</li>
            <li>Enviar atualizações sobre compras</li>
            <li>Melhorar sua experiência de compra</li>
            <li>Enviar ofertas e promoções (com seu consentimento)</li>
            <li>Prevenir fraudes e garantir segurança</li>
          </ul>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Lock size={18} className="text-rose-600" />
            <h2 className="font-bold text-gray-800 text-sm">3. Proteção de Dados</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Seus dados são protegidos com criptografia SSL e armazenados em servidores seguros.
            Não compartilhamos suas informações pessoais com terceiros, exceto quando necessário
            para processar pagamentos ou entregar produtos (transportadoras, por exemplo).
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-3">
            <UserCheck size={18} className="text-rose-600" />
            <h2 className="font-bold text-gray-800 text-sm">4. Seus Direitos</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed mb-2">
            Você tem direito a:
          </p>
          <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
            <li>Acessar seus dados pessoais</li>
            <li>Corrigir dados incorretos</li>
            <li>Solicitar a exclusão de seus dados</li>
            <li>Revogar consentimento de marketing</li>
          </ul>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="font-bold text-gray-800 text-sm mb-2">5. Cookies</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Utilizamos cookies para melhorar sua experiência, analisar tráfego e personalizar
            conteúdo. Você pode gerenciar suas preferências de cookies nas configurações do navegador.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="font-bold text-gray-800 text-sm mb-2">6. Contato</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Para questões sobre privacidade, entre em contato pelo e-mail:{' '}
            <a href="mailto:contato@sentinelshield.com" className="text-rose-600">
              contato@sentinelshield.com
            </a>
          </p>
        </div>
      </div>

      <p className="text-xs text-gray-400 text-center mt-6">
        Esta política está em conformidade com a LGPD (Lei Geral de Proteção de Dados)
      </p>
    </div>
  )
}
