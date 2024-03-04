import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import { Route,Routes} from 'react-router-dom'
import  Navbar  from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import  Alert  from './components/Alert';
import Login from './Login/Login';
import Signup from './Login/Signup';
import { useState } from 'react';



function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message ,type)=>{
   setAlert({
    msg:message,
    type:type
   })
   setTimeout(() => {
    setAlert(null)
   }, 1500);
  }
  return (
    <div>
      <NoteState>
      <Navbar/>
      <Alert alert={alert}/>
      <div className='container'>
      <Routes>
       <Route path='/' element={<Home showAlert={showAlert}/>} /> 
      <Route path='/about'  element={<About/>}/> 
      <Route path='/login'  element={<Login showAlert={showAlert}/>}/> 
      <Route path='/signup'  element={<Signup showAlert={showAlert}/>}/> 
      </Routes>
      </div>
      </NoteState>
    </div>
  );
}

export default App;
