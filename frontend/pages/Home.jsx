// Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';




import Lottie from 'lottie-react';
import { Player } from '@lottiefiles/react-lottie-player';
import image from '../public/Images/barter.png'
import Searchconsole from '../components/Searchconsole';


// import client from '../../Images/client.jpg';
// import free from '../../Images/freelancer.jpg'




const Home = () => {
  // State for mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen((prev)=>!prev);
  };

  return (
    <div>
      {/* Navbar Section */}  
      <nav className="navbar">
        <div className="navbar-left">
          <img src={image} alt="Pixelia Logo" className="logo" />
        </div>

        <ul className="navbar-menu">
          <li><a href="#browse-talents">Browse Talents</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#for-clients">For Clients</a></li>
          <li><a href="#for-talents">For Talents</a></li>
        </ul>

        <div className="navbar-right">
          <span className="location-time">Sleman, 1:29pm</span>
          <button className="menu-icon" onClick={toggleMenu}>
            <i className="fas fa-bars"></i> {/* Font Awesome icon */}
          </button>
          <button className="login-btn" onClick={()=>navigate('/login')}>Login</button>
        </div>  
      </nav>  

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="navbar-dropdown">
          <ul className="navbar-dropdown-menu">
            <li><a href="#browse-talents">Browse Talents</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#for-clients">For Clients</a></li>
            <li><a href="#for-talents">For Talents</a></li>
          </ul>
        </div>
      )} 

      {/* Hero Section */}
      <main className="hero">
        <div className="container">
          <div className="rating">
            <span>⭐ Rated 5/5 from over 700 reviews</span>
          </div>
          <h1>
            Find Top <span className="highlight">🏆 Freelancers</span> to Bring<br />
            Your Vision to Life
          </h1>
          <div className='lady'>
            {/* <Lottie animationData={animationData}/> */}
          </div>
          <p>Hire expert top talents designers for websites, apps, and more.</p>

          <div className="cta-buttons">
            <button className="primary-btn">Hire a Freelancer</button>
            <button className="secondary-btn">Work Provider</button>
          </div>
          <div className="trusted">
            <span>Trusted by</span>
            <div className="trusted-logos">
              <img src="https://res.cloudinary.com/dmcxbbr89/image/upload/v1732283981/swingv_jeuafm.png" alt="Outreach" />
              <img src="https://res.cloudinary.com/dmcxbbr89/image/upload/v1732283974/paprr_c9jncs.png" alt="Framer" />
              <img src="https://res.cloudinary.com/dmcxbbr89/image/upload/v1732283974/paper_hl2vud.png" alt="Attentive" />
              <img src="https://res.cloudinary.com/dmcxbbr89/image/upload/v1732283974/foot_vk4ik0.png" alt="Slack" />
              <img src="https://res.cloudinary.com/dmcxbbr89/image/upload/v1732283973/circle_nnq7hu.png" alt="Pipedrive" />
            </div>
          </div>
          <div className='button-down'>
          </div>

          <div className='upper'>
          <div className='joinUs'> 
            <h2>Join us for free</h2>
            <div className='pics'>
            {/* <Lottie animationData={animationDatax}/>
            <Lottie animationData={animationDataxyz}/> */}

            </div>
            <button className='account'>Create account</button>
          </div>
          </div>


        </div>
      </main>
    </div>
  );
};

export default Home;