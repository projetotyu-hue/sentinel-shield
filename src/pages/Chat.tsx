import { useState, useRef, useEffect } from 'react'
import { Send, MessageCircle, X, Bot, User } from 'lucide-react'

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
  time: string
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Olá! 👋 Sou o assistente virtual da Sentinel Shield Store. Como posso ajudar você hoje?',
      sender: 'bot',
      time: getCurrentTime()
    }
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  function getCurrentTime() {
    const now = new Date()
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const botReplies: Record<string, string> = {
    'oi': 'Olá! Como posso ajudar? 😊',
    'olá': 'Olá! Seja bem-vindo à Sentinel Shield Store! Como posso ajudar?',
    'preço': 'Nossos preços são especiais! Confira nossos produtos em destaque na página inicial.',
    'frete': 'Oferecemos frete grátis para compras acima de R$ 99,00. Para calcular o frete, adicione um produto ao carrinho.',
    'pagamento': 'Aceitamos cartões de crédito, débito, PIX e boleto bancário. Todos os pagamentos são seguros.',
    'troca': 'Nossa política de trocas permite devoluções em até 7 dias após o recebimento. Veja os detalhes em /trocas.',
    'entrega': 'O prazo de entrega varia de 3 a 15 dias úteis, dependendo da sua região. Você receberá um código de rastreio por e-mail.',
    'promoção': 'Confira nossos produtos em promoção na seção "Ofertas Imperdíveis" da página inicial! 🔥',
    'contato': 'Você pode entrar em contato conosco pelo e-mail contato@sentinelshield.com ou pelo telefone (11) 99999-9999.',
    'obrigado': 'De nada! Estamos aqui para ajudar. Tenha uma ótima compra! 🛍️',
    'tamanho': 'Cada produto tem sua tabela de medidas na página de detalhes. Confira antes de comprar!',
    'default': 'Entendi! Se precisar de ajuda com pedidos, entregas, trocas ou produtos, é só perguntar. Nossa equipe também está disponível pelo e-mail: contato@sentinelshield.com 📧'
  }

  const getBotReply = (text: string): string => {
    const lowerText = text.toLowerCase()
    for (const [key, reply] of Object.entries(botReplies)) {
      if (lowerText.includes(key)) return reply
    }
    return botReplies['default']
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
      time: getCurrentTime()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')

    // Simulate bot typing delay
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: getBotReply(input),
        sender: 'bot',
        time: getCurrentTime()
      }
      setMessages(prev => [...prev, botMessage])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const quickQuestions = [
    'Como funciona o frete?',
    'Qual o prazo de entrega?',
    'Posso trocar um produto?',
    'Formas de pagamento'
  ]

  return (
    <div className="flex flex-col h-[calc(100vh-57px)]">
      {/* Header */}
      <div className="bg-rose-600 text-white px-4 py-3 flex items-center gap-3">
        <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
          <Bot size={20} />
        </div>
        <div>
          <h1 className="font-bold text-sm">Atendimento Online</h1>
          <p className="text-xs text-white/80">Normalmente responde em minutos</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] ${msg.sender === 'user' ? 'order-2' : 'order-1'}`}>
              {msg.sender === 'bot' && (
                <div className="flex items-center gap-1 mb-1">
                  <Bot size={14} className="text-rose-600" />
                  <span className="text-xs text-gray-500">Sentinel Shield</span>
                </div>
              )}
              <div className={`rounded-2xl px-4 py-2.5 text-sm ${
                msg.sender === 'user'
                  ? 'bg-rose-600 text-white rounded-br-md'
                  : 'bg-white border border-gray-200 text-gray-800 rounded-bl-md'
              }`}>
                {msg.text}
              </div>
              <p className={`text-[10px] text-gray-400 mt-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                {msg.time}
              </p>
            </div>
            {msg.sender === 'user' && (
              <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center shrink-0 ml-2 order-1">
                <User size={14} className="text-gray-600" />
              </div>
            )}
          </div>
        ))}

        {/* Quick Questions */}
        {messages.length === 1 && (
          <div className="mt-4">
            <p className="text-xs text-gray-400 mb-2">Perguntas frequentes:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setInput(q)
                  }}
                  className="bg-white border border-gray-200 px-3 py-1.5 rounded-full text-xs text-gray-600 hover:border-rose-300 hover:text-rose-600 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-100 px-4 py-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Digite sua mensagem..."
            className="flex-1 px-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:bg-gray-50 border border-transparent focus:border-rose-300 transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-10 h-10 bg-rose-600 text-white rounded-full flex items-center justify-center hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
          >
            <Send size={16} />
          </button>
        </div>
        <p className="text-[10px] text-gray-400 text-center mt-2">
          Atendimento automático. Para falar com humano, e-mail: contato@sentinelshield.com
        </p>
      </div>
    </div>
  )
}
