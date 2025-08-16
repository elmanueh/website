import { createBrowserRouter } from 'react-router'
import Layout from '../components/Layout'
import Home from '../pages/Home'
import ClashOfClans from '../pages/ClashOfClans'
import Error404 from '../pages/Error404'

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
