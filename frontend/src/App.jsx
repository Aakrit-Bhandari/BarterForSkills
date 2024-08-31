import './App.css'

import { useState } from 'react'
import { Navigate, Route,Routes } from 'react-router-dom'

//importing pages
import Home from '../pages/Home'
import Login from '../pages/Login'
import Loginfreelance from '../pages/Loginfreelance'
import Loginworkprovider from '../pages/Loginworkprovider'
import Welcome from '../pages/Welcome'

//importing routes for routing

function App() {
  const [login,setlogin] = useState(false);

  const responsedata = {
    username: 'abhishek'
  }

  return (
    <>
      <Routes>
        <Route index path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/login/freelance' element={<Loginfreelance/>} />
        <Route path='/login/workprovider' element={<Loginworkprovider/>} />
        <Route path={`/welcome`} element={login?<Welcome/>:<Navigate to={'/login'}/>}/>  
      </Routes>
    </>
  )
}

export default App
