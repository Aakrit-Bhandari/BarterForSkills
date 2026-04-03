import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";

// USER STORE
// Importing pages
import Addnewproject from "./components/addNewProject/Addnewproject.jsx";
import Admin from "./components/admin/Admin.jsx";
import Contactus from "./components/contactUs/Contactus.jsx";
import Editprofile from "./components/editProfile/Editprofile.jsx";
import Error from "./components/error/Error.jsx";
import HireFreelancerPage from "./components/hireFreeLancer/HireFreelancerPage.jsx";
import Home from "./components/homePage/Home.jsx";
import Login from "./components/login/Login.jsx";
import Loginfreelance from "./components/login/loginFreeLancer/Loginfreelance.jsx";
// import Loginworkprovider from "./components/login/loginWorkProvider/Loginworkprovider.jsx";
import Peopleapplied from "./components/peopleApplied/Peopleapplied.jsx";
import Rating from "./components/rating/Rating.jsx";
import SignUp from "./components/signUp/SignUp.jsx";
import Subscriptionpage from "./components/subscription/Subscriptionpage.jsx";
import SubscriptionPageFreelance from "./components/subscription/SubscriptionPageFreelance.jsx";
import Success from "./components/success/Success.jsx";
import EditUserProfile from "./components/userProfile/EditUserProfile.jsx";
import Userprofile from "./components/userProfile/Userprofile.jsx";
import Welcome from "./components/welcome/Welcome.jsx";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Function to check the token

  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/freelance" element={<Loginfreelance />} />
      <Route path="/signUp" element={<SignUp />} />
      {/* <Route path="/login/workprovider" element={<Loginworkprovider />} /> */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/welcome/:usertype/:logic/:username" element={<Welcome />} />
      <Route
        path="/add-project/:userid/:username"
        element={<Addnewproject />}
      />
      <Route
        path="/applied/:userid/:projectid/barter4skills/console"
        element={<Peopleapplied />}
      />
      <Route path="/barter4skills/:username" element={<Userprofile />} />
      <Route path="/rate/:userid/:projectid" element={<Rating />} />
      <Route path="/admin/barter4skills" element={<Admin />} />

      <Route
        path="/editprofile/:userId/:username"
        element={<EditUserProfile />}
      />
      <Route path="/editprofilee/:userId/:username" element={<Editprofile />} />
      <Route
        path="/subscription/workprovider/wpd78x/:username/:userid"
        element={<Subscriptionpage />}
      />
      <Route
        path="/subscription/freelance/wpd78x/:username/:userid"
        element={<SubscriptionPageFreelance />}
      />
      <Route path="/contactus" element={<Contactus />} />
      <Route
        path="/success/:id/:userId/:subscriptiontype/:username/:usertype"
        element={<Success />}
      />
      <Route path="/hire" element={<HireFreelancerPage />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
