import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";


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

    const addUserToDatabase = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (!file) {
            alert("Please upload your profile image.");
            return;
        }

        try {
            const checkUsername = await axios.get(
                `http://localhost:5000/check-username/${userData.username}`,
                { withCredentials: true }
            );
            if (checkUsername.data.usernameavailable) {
                const formData = new FormData();
                formData.append("image", file);

                const uploadResponse = await axios.post(
                    "http://localhost:5000/upload-image",
                    formData,
                    { withCredentials: true }
                );

                if (uploadResponse.data.imageuploaded) {
                    userData.personaldetails.profilephoto = uploadResponse.data.imageurl;

                    const newUserResponse = await axios.post(
                        "http://localhost:5000/register",
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
                        setErrorMessage(
                            "An error occurred while adding the user. Please try again."
                        );
                    }
                } else {
                    setErrorMessage("Image upload failed. Please try again.");
                }
            } else {
                setErrorMessage("Username already exists. Please choose a different one.");
            }
        } catch (error) {
            setErrorMessage("An error occurred: " + error.message);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-content">
                <div className="welcome-back">
                    <h2>Welcome Back!</h2>
                    <p>To keep connected with us please login with your personal info</p>
                    <button
                        className="sign-in-button"
                        onClick={() => navigate("/login")}
                    >
                        Sign In
                    </button>
                </div>
                <div className="create-account">
                    <h2>Create Account</h2>
                    {/* <div className="social-login">
                        <button>f</button>
                        <button>G+</button>
                        <button>in</button>
                    </div> */}
                    
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
                            type="text"
                            name="personaldetails.conatactno"
                            value={userData.personaldetails.conatactno}
                            onChange={handleChange}
                            required
                            placeholder="Contact No*"
                        />
                         <input type="text" placeholder="LinkedIn ID" name="personaldetails.linkedinid" value={userData.personaldetails?.linkedinid || ''} onChange={handleChange} />
                         <select name="personaldetails.gender" value={userData.personaldetails?.gender || ''} onChange={handleChange} required>
                        <option value="">Gender*</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select >
                        <label style={{overflow:'hidden'}}>Upload Profile Photo*</label>
                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            required
                        />
                        {errorMessage && (
                            <p style={{ color: "red" }}>{errorMessage}</p>
                        )}
                        <button type="submit" style={{width:'100%',overflow:'hidden'}}>Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;