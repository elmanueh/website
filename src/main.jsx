import { Route, Routes, BrowserRouter, Outlet } from 'react-router-dom'
import ReactDOM from 'react-dom/client'

import { Home } from './pages/Home.jsx'
import { Error404 } from './pages/Error404.jsx'
import { ClashOfClans } from './pages/ClashOfClans.jsx'
import { Minecraft } from './pages/Minecraft.jsx'

import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import './index.css'

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="clashofclans" element={<ClashOfClans />} />
        <Route path="minecraft" element={<Minecraft />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
