import { Route, Routes,Navigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import HomePage from './pages/HomePage'

import Dashboard from './pages/Dashboard'
import './App.css'
import Navigation from "../../frontend/src/pages/components/Navigation"
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'


function App() {
 
  const {isSignedIn} = useUser()
 
  return (
     <>
   <Navigation/>
   <Routes>
    <Route path='/' element={<HomePage/>}/>
   <Route path="/" element={isSignedIn ? <Navigate to="/dashboard" /> : <HomePage />}
        />
   <Route path='/dashboard' element={isSignedIn ? <Dashboard/>: <Navigate to="/"/> }/>
   <Route path="/product/:id" element={<ProductPage/>}/>
   <Route path='/cart' element={isSignedIn ? <CartPage/>:<Navigate to="/"/>}/>
  
  </Routes>


    </>
  )
}

export default App
