import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderConfirmed from './pages/OrderConfirmed'
import MinhaConta from './pages/MinhaConta'
import WhatsAppFloat from './components/WhatsAppFloat'
import Chat from './pages/Chat'
import Contato from './pages/Contato'
import Privacidade from './pages/Privacidade'
import Termos from './pages/Termos'
import Trocas from './pages/Trocas'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col shadow-sm overflow-x-hidden">
          {/* Freight Banner */}
          <div className="bg-rose-600 text-white text-center text-xs py-1.5 font-medium">
            🚚 FRETE GRÁTIS para compras acima de R$ 99,00
          </div>
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/produtos" element={<Products />} />
              <Route path="/produto/:id" element={<ProductDetail />} />
              <Route path="/carrinho" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/pedido-confirmado" element={<OrderConfirmed />} />
              <Route path="/minha-conta" element={<MinhaConta />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="/privacidade" element={<Privacidade />} />
              <Route path="/termos" element={<Termos />} />
              <Route path="/trocas" element={<Trocas />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppFloat />
        </div>
      </div>
    </Router>
  )
}

export default App
