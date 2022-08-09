import { HashRouter, Routes, Route } from 'react-router-dom'
import { Home, Login, ProductDetail, Purchases } from './pages/index'
import { LoadingScreen, NavBar, ProtectedRoutes } from "./Components/Index";
import './App.css'
import { useSelector } from 'react-redux'




function App() {

  const isLoading = useSelector(state => state.isLoading)


  return (
    <HashRouter >
      <NavBar />
      {isLoading && <LoadingScreen />}
      <Routes >
        <Route path='/' element={<Home />} />
        <Route path='/products/:id' element={<ProductDetail />} />
        <Route path='/login' element={<Login />} />
        <Route element={<ProtectedRoutes />} >
           <Route path='/purchases' element={<Purchases />} />
        </Route>
    </Routes>
    </HashRouter >
  )
}

export default App
