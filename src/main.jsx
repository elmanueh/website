import ReactDOM from 'react-dom/client'
import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { Home } from './pages/Home.jsx'
import { ClashOfClans } from './pages/ClashOfClans.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Header />
    <ClashOfClans />
    <Footer />
  </>
)
