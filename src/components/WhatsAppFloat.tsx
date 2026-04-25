import { useState } from 'react'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {/* Popup */}
      {isOpen && (
        <div className="mb-3 bg-white rounded-xl shadow-lg border border-gray-100 p-4 w-64 animate-fade-in-up">
          <p className="text-sm text-gray-800 font-medium mb-1">Precisa de ajuda?</p>
          <p className="text-xs text-gray-500 mb-3">Fale conosco pelo WhatsApp</p>
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-green-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
          >
            <MessageCircle size={16} />
            Chamar no WhatsApp
          </a>
        </div>
      )}

      {/* Float Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all hover:scale-110"
        aria-label="WhatsApp"
      >
        <MessageCircle size={22} />
      </button>
    </div>
  )
}
