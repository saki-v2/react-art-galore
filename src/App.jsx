import './App.css'
import { BrowserRouter, Routes ,Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Footer from './components/Footer'
import NavBar from './components/NavBar'
import ErrorPage from './pages/ErrorPage'
import Shop from './pages/Shop'
import { CartProvider } from './context/CartContext'
import ArtworkDetail from './pages/ArtworkDetail'

export default function App() {
  
  return (
    <BrowserRouter>
      <CartProvider>

        <NavBar />

        <main>
          <Routes>
            <Route path='/' element={<Landing />}/>
            <Route path='/shop' element={<Shop />} />
            <Route path='artwork/:id' element={<ArtworkDetail />}/>
            <Route path='*' element={<ErrorPage />} />
          </Routes>

          <Footer />
        </main>
      </CartProvider>

    </BrowserRouter>
    
  )
}
