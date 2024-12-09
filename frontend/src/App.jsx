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
import Peopleapplied from '../pages/Peopleapplied';
import Userprofile from '../pages/Userprofile';
import Rating from '../pages/Rating';
import Admin from '../pages/Admin';
import Editprofile from '../pages/Editprofile';
import SubscriptionPage from '../pages/Subscriptionpage';
import Contactus from '../pages/Contactus';
import Error from '../pages/Error';
import SubscriptionPageFreelance from '../pages/SubscriptionPageFreelance';
import Success from '../pages/Success';
import Subscriptionpage from '../pages/Subscriptionpage';
import HireFreelancerPage from '../pages/HireFreelancerPage';
import EditUserProfile from '../pages/EditUserProfile';


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
        const response = await axios.get('https://barter-5cky.onrender.com/check-token', {
          withCredentials: true,
        });
        console.log(response);
        if (response.data.tokenalreadypresent) {
          console.log(response.data.userData)
          // If token is valid, navigate to the welcome page if on login
          if (location.pathname === '/login/freelance' && response.data.userData.userData.usertype==="freelance"){
            navigate(`/welcome/freelance/in23x/${response.data.userData.username}`);
          }else if(location.pathname==='/login/workprovider' && response.data.userData.userData.usertype==="workprovider") {
            navigate(`/welcome/workprovider/wpd78x/${response.data.userData.username}`);
          }
        } else {
          // If token is not valid, redirect to login
          if(!(['/login/freelance','/login/workprovider','/'].includes(location.pathname))){
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
    const proroute = location.pathname.startsWith('/barter4skills');
    const proroutee = location.pathname.startsWith('/subscription');
    const prorouteee = location.pathname.startsWith('/hire');

    if (!protectedRoutes.includes(location.pathname) && !routespro && !proroute && !proroutee && !prorouteee) {
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
        <Route path='/welcome/:usertype/:logic/:username' element={<Welcome />} />
        <Route path='/add-project/:userid/:username' element={<Addnewproject/>} />
        <Route path='/applied/:userid/:projectid/barter4skills/console' element={<Peopleapplied />} />
        <Route path='/barter4skills/:username' element={<Userprofile />} />
        <Route path='/rate/:userid/:projectid' element={<Rating/>}/>
        <Route path='/admin/barter4skills' element={<Admin/>}/>
        <Route path='/editprofile/:userId/:username' element={<EditUserProfile/>} />
        <Route path='/editprofilee/:userId/:username' element={<Editprofile/>}/>
        <Route path='/subscription/workprovider/wpd78x/:username/:userid' element={<Subscriptionpage/>} />
        <Route path='/subscription/freelance/wpd78x/:username/:userid' element={<SubscriptionPageFreelance/>} />
        <Route path='/contactus' element={<Contactus/>}/>
        <Route path='/success/:id/:userId/:subscriptiontype/:username/:usertype' element={<Success/>}/>
        <Route path='/hire' element={<HireFreelancerPage/>}/>
        <Route path='*' element={<Error/>}/>
      </Routes>
    </>
  );
}

export default App;
