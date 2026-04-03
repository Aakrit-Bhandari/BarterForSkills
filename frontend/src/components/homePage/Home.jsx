// App.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import animationData from "../../assets/card.json";
import animationData1 from "../../assets/women.json";
import AboutUs from "../aboutUs/Aboutus.jsx";
import Lady from "../lady/Lady.jsx";
import "./Home.css"; // Import the CSS file

import Lottie from "lottie-react";
import image from "../../assets/barter.png";

export default function Home() {
  // State for mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div>
      {/* Navbar Section */}
      <nav className="navbar">
        <div className="navbar-left">
          <img
            src={image}
            alt="Pixelia Logo"
            className="logo"
            style={{ cursor: "pointer" }}
          />
        </div>

        <ul className="navbar-menu">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a onClick={() => navigate("/contactus")}>Contact</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a onClick={() => navigate("/login/workprovider")}>For Clients</a>
          </li>
          <li>
            <a onClick={() => navigate("/login/freelance")}>For Talents</a>
          </li>
          {/* <li><a onClick={()=>navigate('/subscription')}>Plans</a></li> */}
        </ul>

        <div className="navbar-right">
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
        <div className="">
          <button className="login-btn" onClick={() => navigate("/signUp")}>
            SignUp
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="navbar-dropdown">
          <ul className="navbar-dropdown-menu">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a onClick={() => navigate("/contactus")}>Contact</a>
            </li>
            <li>
              <a href="#how-it-works">About</a>
            </li>
            <li>
              <a onClick={() => navigate("/login/workprovider")}>For Clients</a>
            </li>
            <li>
              <a onClick={() => navigate("/login/freelance")}>For Talents</a>
            </li>
            <li>
              <a>Pricing</a>
            </li>
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
            Find Top <span className="highlight">🏆 Freelancers</span> to Bring
            <br />
            Your Vision to Life
          </h1>
          <div className="lady">
            <Lottie animationData={animationData} />
          </div>
          <p>Hire expert top talents designers for websites, apps, and more.</p>

          <div className="cta-buttons">
            <button
              className="primary-btn"
              onClick={() => navigate("/login/workprovider")}
            >
              Hire a Freelancer
            </button>
            <button
              className="secondary-btn"
              onClick={() => navigate("/login/freelance")}
            >
              Freelance
            </button>
          </div>
          <div className="trusted">
            <span>Trusted by</span>
            <div className="trusted-logos">
              <img
                src="https://res.cloudinary.com/dmcxbbr89/image/upload/v1732283981/swingv_jeuafm.png"
                alt="Outreach"
              />
              <img
                src="https://res.cloudinary.com/dmcxbbr89/image/upload/v1732283974/paprr_c9jncs.png"
                alt="Framer"
              />
              <img
                src="https://res.cloudinary.com/dmcxbbr89/image/upload/v1732283974/paper_hl2vud.png"
                alt="Attentive"
              />
              <img
                src="https://res.cloudinary.com/dmcxbbr89/image/upload/v1732283974/foot_vk4ik0.png"
                alt="Slack"
              />
              <img
                src="https://res.cloudinary.com/dmcxbbr89/image/upload/v1732283973/circle_nnq7hu.png"
                alt="Pipedrive"
              />
            </div>
          </div>
          {/* <div className='button-down'>
            <h1>Search Icon</h1>
          </div> */}

          <div className="upper" style={{ border: "0px" }}>
            <div
              className="joinUs"
              style={{ marginTop: "0px", overflow: "hidden" }}
            >
              <Lottie
                animationData={animationData1}
                style={{
                  overflow: "hidden",
                  border: "0px",
                  width: "500px",
                  height: "400px",
                }}
              />
            </div>
          </div>
        </div>
        <div className="text">
          <h1 className="heading">Up your work game, it’s easy</h1>
          <div className="features">
            <div className="feature-item">
              <h3>No cost to join</h3>
              <p>
                Register and browse talent profiles, explore projects, or even
                book a consultation.
              </p>
            </div>
            <div className="feature-item">
              <h3>Post a job and hire top talent</h3>
              <p>
                Finding talent doesn’t have to be a chore. Post a job or we can
                search for you!
              </p>
            </div>
            <div className="feature-item">
              <h3>Work with the best—without breaking the bank</h3>
              <p>
                Upwork makes it affordable to up your work and take advantage of
                low transaction rates.
              </p>
            </div>
          </div>
          <div className="actions">
            <button className="btn sign-up" onClick={() => navigate("/signUp")}>
              Sign up for free
            </button>
            <button
              className="btn learn-more"
              onClick={() => navigate("/hire")}
            >
              Learn how to hire
            </button>
          </div>
        </div>
      </main>

      <AboutUs />
      <Lady />
    </div>
  );
}
