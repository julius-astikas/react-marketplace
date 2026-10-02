import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Cart from './pages/Cart/Cart'
import NotFound from './pages/NotFound/NotFound'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import Products from './pages/Products/Products'
import './App.css'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Products /> },
        { path: 'products/:id', element: <ProductDetails /> },
        { path: 'cart', element: <Cart /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
)

function App() {
  return <RouterProvider router={router} />
}

export default App
