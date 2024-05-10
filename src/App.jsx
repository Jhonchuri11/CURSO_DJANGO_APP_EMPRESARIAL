import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import MainHeader from './common/MainHeader';
import MainFooter from './common/MainFooter';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Listproductos from './componentes/Listproductos';
import ListaCategorias from './componentes/ListCategorias';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <MainHeader/>
        <Routes>
          <Route path='/' element={<Listproductos/>}/>
          <Route path='/categoria' element={<ListaCategorias/>}/>
        </Routes>
        <MainFooter/>
      </Router>
    </>
  )
}

export default App