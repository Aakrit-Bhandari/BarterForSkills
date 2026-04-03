import { useNavigate } from "react-router-dom";
import Backbutton from "../backButton/Backbutton.jsx";
import "./Login.css"; // Add a separate CSS file for styles

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="login-container">
      <div className="login-box">
        <Backbutton />
        <h1 className="login-title" style={{ overflow: "hidden" }}>
          Welcome to Barter4Skills
        </h1>
        <p className="login-subtitle">Please Proceed</p>
        <div className="login-buttons">
          <button
            className="login-button freelance-button"
            onClick={() => navigate("/login/freelance")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
