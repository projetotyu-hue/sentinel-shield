import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreditCard, Truck, CheckCircle } from 'lucide-react'

export default function Checkout() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('credit')

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Finalizar Compra</h1>

      {/* Steps */}
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                s <= step ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}
            >
              {s < step ? <CheckCircle className="w-5 h-5" /> : s}
            </div>
            {s < 3 && (
              <div className={`w-20 h-1 ${s < step ? 'bg-orange-500' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {step === 1 && (
        <div className="card p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Truck className="w-5 h-5" />
            Endereço de Entrega
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
              <input type="text" className="input-field" placeholder="00000-000" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rua</label>
                <input type="text" className="input-field" placeholder="Rua das Flores" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Número</label>
                <input type="text" className="input-field" placeholder="123" />
              </div>
            </div>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="btn-primary w-full"
            >
              Continuar
            </button>
          </form>
        </div>
      )}

      {step === 2 && (
        <div className="card p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Pagamento
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              {['credit', 'pix', 'boleto'].map((method) => (
                <button
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`flex-1 py-3 rounded-lg border-2 transition-colors ${
                    paymentMethod === method
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {method === 'credit' && 'Cartão'}
                  {method === 'pix' && 'Pix'}
                  {method === 'boleto' && 'Boleto'}
                </button>
              ))}
            </div>

            {paymentMethod === 'credit' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Número do Cartão</label>
                  <input type="text" className="input-field" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Validade</label>
                    <input type="text" className="input-field" placeholder="MM/AA" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input type="text" className="input-field" placeholder="123" />
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="btn-secondary flex-1"
              >
                Voltar
              </button>
              <button
                onClick={() => setStep(3)}
                className="btn-primary flex-1"
              >
                Revisar Pedido
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="card p-6 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Pedido Confirmado!</h2>
          <p className="text-gray-600 mb-6">
            Seu pedido foi realizado com sucesso. Você receberá um e-mail com os detalhes.
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Voltar às Compras
          </button>
        </div>
      )}
    </div>
  )
}
