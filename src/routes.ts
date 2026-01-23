import { createBrowserRouter } from 'react-router'
import Layout from './layouts/Layout'
import ClashOfClans from './pages/ClashOfClans'
import Error404 from './pages/Error404'
import Home from './pages/Home'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'clashofclans', Component: ClashOfClans },
      { path: '*', Component: Error404 }
    ]
  }
])
