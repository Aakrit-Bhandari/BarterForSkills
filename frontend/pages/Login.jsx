import React from "react";
import { useNavigate } from "react-router-dom";
import "../src/Login.css"; // Add a separate CSS file for styles
import Breadcrumb from "../components/Breadcrumb";
import Backbutton from "../components/Backbutton";

const Login = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="login-container">
                <div className="login-box">
                <Backbutton/>
                    <h1 className="login-title" style={{overflow:'hidden'}}>Welcome to Barter4Skills</h1>
                    <p className="login-subtitle">Choose your role to proceed</p>
                    <div className="login-buttons">
                        <button 
                            className="login-button freelance-button" 
                            onClick={() => navigate('/login/freelance')}
                        >
                            Login or Signup as Freelancer
                        </button>
                        <button 
                            className="login-button workprovider-button" 
                            onClick={() => navigate('/login/workprovider')}
                        >
                            Login or Signup as Work Provider
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
