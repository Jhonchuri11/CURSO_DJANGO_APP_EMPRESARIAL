import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import MainHeader from './common/MainHeader';
import MainFooter from './common/MainFooter';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListCurso from './componentes/ListCurso';

function App() {

  return (
    <>
      <Router>
        <MainHeader/>
        <Routes>
          <Route path='/semestre/:semestre_id' element={<ListCurso/>}/>
        </Routes>
        <MainFooter/>
      </Router>
    </>
  )
}

export default App
