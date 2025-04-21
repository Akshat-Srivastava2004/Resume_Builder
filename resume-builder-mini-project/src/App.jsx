
import './App.css'
import ResumeBuilderLanding from './pages/landing_page'
import { Routes, Route } from "react-router-dom";
import Register from './pages/register';
import Login from './pages/login';
import ResumeBuilder from './pages/resume';
function App() {
  

  return (
  
    <Routes>
    <Route path="/createresume" element={<ResumeBuilder />}/>
    <Route path='/' element={<ResumeBuilderLanding />}/>
    <Route path='/register' element={<Register />}/>
    <Route path='/login' element={<Login />}/>
    </Routes>
     
    
  )
}

export default App
