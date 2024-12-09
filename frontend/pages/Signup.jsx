import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import Lottie from 'lottie-react';
import { Player } from '@lottiefiles/react-lottie-player';
import signup from "../Images/sign.json"

const Signup = () => {
    const [file, setFile] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [localstoragedata, setLocalstoragedata] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("response-userdata")) || {};
        } catch (error) {
            console.error("Error parsing localStorage data:", error);
            return {};
        }
    });

    const [userData, setUserData] = useState(localstoragedata.userData || {
        username: "",
        usertype: "",
        email: "",
        password: "",
        subscription: userData.usertype+"-basic", // Added password field here
        personaldetails: {
            name: "",
            conatactno: "",
            skills: [],
            location: "",
            description: "",
            linkedinid: "",
            gender: "",
            profilephoto: "",
        },
    });

    useEffect(() => {
        if (!userData || !userData.email || !userData.usertype) {
            navigate("/login");
        }
        if (localstoragedata?.anothertypeuser) {
            alert("Already registered email with another user type.");
            navigate("/login");
        }
    }, [userData, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("personaldetails.")) {
            const fieldName = name.split(".")[1];
            setUserData((oldData) => ({
                ...oldData,
                personaldetails: {
                    ...oldData.personaldetails,
                    [fieldName]: value,
                },
            }));
        } else {
            setUserData((oldData) => ({
                ...oldData,
                [name]: value,
            }));
        }
    };

    const handleSkillsChange = (e) => {
        const skillsArray = e.target.value.split(",").map((skill) => skill.trim());
        setUserData((oldData) => ({
            ...oldData,
            personaldetails: {
                ...oldData.personaldetails,
                skills: skillsArray,
            },
        }));
    };
    function isValidPassword(password) {
        // Regex to check for at least one uppercase letter, one special character, and length > 8
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
        return passwordRegex.test(password);
    }
    

    const addUserToDatabase = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        if(!isValidPassword(userData.password)){
            alert("Enter a valid password. Password must contain:\n" + 
                "1. At least one uppercase letter (A-Z)\n" + 
                "2. At least one special character (e.g., !, @, #, $, %, etc.)\n" + 
                "3. A minimum length of 8 characters");
            return;
        }
        if (!/^\d{10}$/.test(userData.personaldetails.conatactno)) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        if (!file) {
            alert("Please upload your profile image.");
            return;
        }

        try {
            const checkUsername = await axios.get(
                `https://barter-5cky.onrender.com/check-username/${userData.username}`,
                { withCredentials: true }
            );
            if (checkUsername.data.usernameavailable) {
                const formData = new FormData();
                formData.append("image", file);

                const uploadResponse = await axios.post(
                    "https://barter-5cky.onrender.com/upload-image",
                    formData,
                    { withCredentials: true }
                );

                if (uploadResponse.data.imageuploaded) {
                    userData.personaldetails.profilephoto = uploadResponse.data.imageurl;

                    const newUserResponse = await axios.post(
                        "https://barter-5cky.onrender.com/register",
                        userData,
                        { withCredentials: true }
                    );

                    if (newUserResponse.data.userAdded) {
                        localStorage.setItem(
                            "response-userdata",
                            JSON.stringify(newUserResponse.data)
                        );
                        navigate(
                            `/welcome/${
                                userData.usertype === "freelance"
                                    ? "freelance/in23x"
                                    : "workprovider/wpd78x"
                            }/${encodeURIComponent(userData.username)}`
                        );
                    } else {
                        alert(
                            "An error occurred while adding the user. Please try again."
                        );
                        return;
                    }
                } else {
                    alert("Image upload failed. Please try again.");
                    return;
                }
            } else {
                alert("Username already exists. Please choose a different one.");
                return;
            }
        } catch (error) {
            alert("An error occurred: " + error.message);
            return;
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-content" >
                <div className="welcome-back" >
                    <Lottie animationData={signup} style={{height:'800px',overflow:'hidden', width:'330px'}}/>
                </div>
                <div className="create-account">
                    <h2>Create Account</h2>
                    
                    <form onSubmit={addUserToDatabase}>
                        <input type="email" value={userData.email || ''} readOnly required />
                        <input type="text" value={userData.usertype || ''} readOnly required />
                        <input
                            type="text"
                            name="username"
                            value={userData.username}
                            onChange={handleChange}
                            required
                            placeholder="Username*"
                        />
                        <input
                            type="text"
                            name="personaldetails.name"
                            value={userData.personaldetails.name}
                            onChange={handleChange}
                            required
                            placeholder="Name*"
                        />
                        <input
                            type="Number"
                            name="personaldetails.conatactno"
                            value={userData.personaldetails.conatactno}
                            onChange={handleChange}
                            required
                            maxLength={10}
                            placeholder="Contact No*"
                        />
                        {userData.usertype === "workprovider" &&<input
                            type="text"
                            name="personaldetails.location"
                            value={userData.personaldetails.location}
                            onChange={handleChange}
                            required
                            placeholder="Location*"
                        />}
                        <input type="text" placeholder="LinkedIn ID" name="personaldetails.linkedinid" value={userData.personaldetails?.linkedinid || ''} required onChange={handleChange} />
                        <select name="personaldetails.gender" value={userData.personaldetails?.gender || ''} onChange={handleChange} required>
                            <option value="">Gender*</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        {/* <label style={{overflow:'hidden'}}>Upload Profile Photo*</label> */}
                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            required
                        />
                        
                        {/* Password Input */}
                        <input
                            type="password"
                            name="password"
                            value={userData.password}
                            onChange={handleChange}
                            required
                            placeholder="Password*"
                        />
                        
                        {/* {errorMessage && (
                            <p style={{ color: "red" }}>{errorMessage}</p>
                        )} */}
                        <button type="submit" style={{width:'100%',overflow:'hidden'}}>Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
