import ReactDOM from 'react-dom/client'
import { Header } from './Header.jsx'
import { Footer } from './Footer.jsx'
import { PageHome } from './PageHome.jsx'
import { PageClashOfClans } from './PageClashOfClans.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Header />
    <PageClashOfClans />
    <Footer />
  </>
)
