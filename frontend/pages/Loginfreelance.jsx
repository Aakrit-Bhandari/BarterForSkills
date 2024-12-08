import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "../src/Login.css";
import Backbutton from "../components/Backbutton";

const Loginfreelance = () => {
    const [hiddenOtpBox, setHiddenOtpBox] = useState(false);
    const [hiddenPasswordBox, sethiddenPasswordBox] = useState(false);
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: '',
        usertype: 'freelance',
        email: '',
        password: '',
        subscription: 'freelance-basic',
        personaldetails: {
            name: '',
            conatactno: '',
            skills: [],
            location: '',
            description: '',
            linkedinid: '',
            gender: '',
            rating: '',
            projectsworkedon: ''
        },
    });
    const [error, seterror] = useState(false);
    const [otperror, setotperror] = useState(false);
    const [otp, setOtp] = useState('');
    const [password, setpassword] = useState('');
    const [passerror, setpasserror] = useState(false); // Password error state

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };
    const handlePassChange = (e) => {
        setpassword(e.target.value);
    };

    const manageChanges = (e) => {
        setUserData((oldData) => ({
            ...oldData,
            [e.target.name]: e.target.value
        }));
    };

    function isValidEmail(email) {
        // Regex for email validation with period in domain
        const emailRegex = /^[^\s@]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }
    

    const checkData = async (e) => {
        e.preventDefault();
        seterror(false);
        setotperror(false);
        setpasserror(false); // Reset password error on form submit
        try {
            const otpVerResponse = await axios.post('https://barter-5cky.onrender.com/login', {
                email: userData.email,
                otp: otp,
                usertype: 'freelance'
            }, {
                withCredentials: true
            });
            console.log(otpVerResponse);
            if (otpVerResponse.data.otpverified) {
                if (otpVerResponse.data.existinguser) {
                    localStorage.setItem("response-userdata", JSON.stringify(otpVerResponse.data));
                    navigate(`/welcome/freelance/in23x/${encodeURIComponent(otpVerResponse.data.userData.username)}`);
                } else {
                    localStorage.setItem("response-userdata", JSON.stringify(otpVerResponse.data));
                    navigate(`/signup/${userData.email}`);
                }
            } else {
                setotperror(true);
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
        }
    };

    const sendOtp = async (e) => {
        e.preventDefault();
        sethiddenPasswordBox(false);
        setotperror(false);
        setpasserror(false); // Reset password error on OTP request
        if (isValidEmail(userData.email)) {
            try {
                const response = await axios.post('https://barter-5cky.onrender.com/send-otp', { email: userData.email }, {
                    withCredentials: true
                });
                if (response.data.otpsent) {
                    setHiddenOtpBox(true);
                } else {
                    alert('Failed to send OTP');
                }
            } catch (error) {
                console.error('Error sending OTP:', error);
            }
        } else {
            seterror(true);
        }
    };

    const getPassword = async () => {
        if (isValidEmail(userData.email)) {
            sethiddenPasswordBox(true);
            setHiddenOtpBox(false);
        } else {
            //console.log("error");
            alert("Enter a valid email");
            seterror(true); // Email validation error handling
        }
    };
    function isValidPassword(password) {
        // Regex to check for at least one uppercase letter, one special character, and length > 8
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
        return passwordRegex.test(password);
    }

    const verifypass = async () => {
        // Check if password is empty or invalid
        if (!password || password.length < 1) {
            seterror(true); // Show password error
            alert("Enter password to continue.")
            return;
        }

        // Proceed with password verification if valid
        try {
            // Make API call to verify password (this is just an example)
            const passwordVerification = await axios.post('https://barter-5cky.onrender.com/verify-password', {
                email: userData.email,
                password: password,
                usertype: userData.usertype
            },{
                withCredentials:true
            });

            if (passwordVerification.data.passverified) {
                setpasserror(false); // Clear error if password is valid
                // Continue with the login process
                // navigate(`/welcome/freelance/in23x/${encodeURIComponent(userData.username)}`);
                localStorage.setItem("response-userdata", JSON.stringify(passwordVerification.data));
                navigate(`/welcome/freelance/in23x/${encodeURIComponent(passwordVerification.data.userData.username)}`);
            } else {
                setpasserror(true); // Set password error if verification fails
            }
        } catch (error) {
            console.error('Error verifying password:', error);
        }
    };

    return (
        <>
            <div className="mainbox-login">
                <div className="loginform">
                    <Backbutton/>
                    <b>Login</b>
                    <form onSubmit={checkData}>
                        <input type="email" placeholder="email*" value={userData.email} onChange={manageChanges} name="email" readOnly={hiddenOtpBox || hiddenPasswordBox} />
                        <span style={{ color: 'red', fontSize: '12px', display: error ? 'block' : 'none' }}>Enter a valid email Address</span>
                        <button onClick={getPassword} id="btn">Continue with Password</button>
                        <button onClick={sendOtp} id="btn">Continue with Otp</button>
                        {hiddenPasswordBox && (
                            <div className="otpcentre">
                                <b>Verify with Password</b>
                                <input type="password" placeholder="Password*" name="password" value={password} onChange={handlePassChange} />
                                <span style={{ color: 'red', fontSize: '12px', display: passerror ? 'block' : 'none' }}>Wrong Password or Invalid User</span>
                                <button onClick={verifypass} id="btn">Continue</button>
                            </div>
                        )}
                        {hiddenOtpBox && (
                            <div className="otpcentre">
                                <b>Verify with OTP</b>
                                <input type="number" placeholder="otp*" name="otp" value={otp} onChange={handleOtpChange} />
                                <span style={{ color: 'red', fontSize: '12px', display: otperror ? 'block' : 'none' }}>Wrong OTP</span>
                                <button type="submit" id="btn">Continue</button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
};

export default Loginfreelance;
