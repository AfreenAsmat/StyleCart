import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'flowbite';
import { createBrowserRouter, createRoutesFromElements, RouterProvider , Route} from 'react-router-dom'
import Layout from './Layout.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Home from './pages/Home.jsx';
import { CartProvider } from './contexts/CartContext.jsx';
import { SearchProvider } from './contexts/SearchContext.jsx';
import Products from './pages/Products.jsx';
import { products } from './data/productsData.js';
import Checkout from './pages/Checkout.jsx';

const router = createBrowserRouter(createRoutesFromElements(
  <>
  <Route path='/' element={<Layout/>}>
    <Route path='/' element={<Home/>}/>
    <Route path='/products/:id' element={<ProductDetails />}/>
    <Route path='/products' element={<Products allProducts={products}/>}/>
    <Route path='/products/:gender/:category' element={<Products allProducts={products}/>}/>
    <Route path='/checkout' element={<Checkout />}/>
  </Route>
  </>
))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SearchProvider>
    <CartProvider>
    <RouterProvider router={router}/>
    </CartProvider>
    </SearchProvider>
  </StrictMode>,
)
