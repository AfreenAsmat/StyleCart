import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Hero from './components/Hero/Hero'
import ProductsList from './components/ProductsList/ProductsList'
import Home from './pages/Home'


function App() {
 

  return (
    <>
      <Navbar />
      <Home />
      <Footer />
      
    </>
  )
}

export default App
