import { useState } from 'react'
import { Play, X } from 'lucide-react'

interface YouTubeEmbedProps {
  videoId: string
  title?: string
}

export default function YouTubeEmbed({ videoId, title = 'Vídeo do produto' }: YouTubeEmbedProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Button to open video */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-medium hover:bg-rose-700 transition-colors"
      >
        <Play size={16} />
        Ver vídeo no YouTube
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setIsOpen(false)}>
          <div className="relative w-full max-w-2xl aspect-video bg-black rounded-xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 z-10"
            >
              <X size={16} />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title={title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  )
}
