import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { Layout } from './components/Layout.jsx'
import { Home } from './pages/Home.jsx'
import { ClashOfClans } from './pages/ClashOfClans.jsx'
import { Minecraft } from './pages/Minecraft.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/clashofclans" element={<ClashOfClans />} />
        <Route path="/minecraft" element={<Minecraft />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
