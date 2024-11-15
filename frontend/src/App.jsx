import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Importing pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import Loginfreelance from '../pages/Loginfreelance';
import Loginworkprovider from '../pages/Loginworkprovider';
import Welcome from '../pages/Welcome';
import Signup from '../pages/Signup';
import Addnewproject from '../pages/Addnewproject';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve localStorage data
  const [localstoragedata, setLocalstoragedata] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("response-userdata")) || {};
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      return {};
    }
  });

  // Function to check the token
  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await axios.get('http://localhost:5000/check-token', {
          withCredentials: true,
        });
        console.log(response);
        if (response.data.tokenalreadypresent) {
          console.log(response.data.userData)
          // If token is valid, navigate to the welcome page if on login
          if (location.pathname === '/login/freelance' && response.data.userData.userData.usertype==="freelance"){
            navigate(`/welcome/freelance/${response.data.userData.username}`);
          }else if(location.pathname==='/login/workprovider' && response.data.userData.userData.usertype==="workprovider") {
            navigate(`/welcome/workprovider/${response.data.userData.username}`);
          }
        } else {
          // If token is not valid, redirect to login
          if(!(['/login/freelance','/login/workprovider'].includes(location.pathname))){
            navigate('/login');
          }
        }
      } catch (error) {
        console.error('Error checking token:', error);
        navigate('/login');
      }
    };

    // Check token only for protected routes
    const protectedRoutes = ['/login'];
    const routespro = location.pathname.startsWith('/signup');

    if (!protectedRoutes.includes(location.pathname) && !routespro) {
      checkToken();
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/login/freelance' element={<Loginfreelance />} />
        <Route path='/login/workprovider' element={<Loginworkprovider />} />
        <Route path='/signup/:email' element={<Signup />} />
        <Route path='/welcome/:usertype/:username' element={<Welcome />} />
        <Route path='/add-project/:userid/:username' element={<Addnewproject/>} />
      </Routes>
    </>
  );
}

export default App;
