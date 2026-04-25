export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Achadinhos da Vitrine</h3>
            <p className="text-sm">
              As melhores ofertas com frete grátis. Até 97% OFF em produtos selecionados.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Informações</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-white">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-white">Termos de Uso</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Atendimento</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Central de Ajuda</a></li>
              <li><a href="#" className="hover:text-white">Prazos de Entrega</a></li>
              <li><a href="#" className="hover:text-white">Trocas e Devoluções</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Pagamento</h4>
            <p className="text-sm">Aceitamos: Cartões de Crédito, Pix, Boleto</p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2026 Achadinhos da Vitrine. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
