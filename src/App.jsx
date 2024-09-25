import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login/Login'
import Home from './pages/Home'
import { EcommerceAuthProvider } from './context/AuthContext'
import { ProductProvider } from './context/ProductContext'

function App() {
  return (
    <EcommerceAuthProvider>
      <ProductProvider>
      <Router>
       <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </Router>
      </ProductProvider>
    </EcommerceAuthProvider>
  )
}

export default App