import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

import Lottie from "lottie-react";
import signup from "../../assets/sign.json";

const initialState = {
  username: "",
  usertype: "",
  email: "",
  password: "",
  subscription: "-basic", // Added password field here
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
};

const updateUserData = (state, action) => {
  switch (action.type) {
    case action.type === "username":
      return (state.username = action.payload);
    case action.type === "usertype":
      return (state.usertype = action.payload);
    case action.type === "email":
      return (state.email = action.payload);
    case action.type === "password":
      return (state.password = action.payload);
    case action.type === "subscription":
      return (state.subscription = action.payload);
    case action.type === "pDName":
      return (state.personaldetails.name = action.payload);
    case action.type === "pDContactNo":
      return (state.personaldetails.contactno = action.payload);
    case action.type === "pDLocation":
      return (state.personaldetails.location = action.payload);
    case action.type === "pDDescription":
      return (state.personaldetails.description = action.payload);
    case action.type === "pDLinkedIn":
      return (state.personaldetails.linkedinid = action.payload);
    case action.type === "pDGender":
      return (state.personaldetails.gender = action.payload);
    case action.type === "pDProfilePhoto":
      return (state.personaldetaisl.profilephoto = action.payload);
    default:
      return state;
  }
};

export default function SignUp() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [localstoragedata, setLocalstoragedata] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("response-userdata")) || {};
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      return {};
    }
  });

  const [userData, dispatch] = useReducer(updateUserData, initialState);
  const state = localStorage.userData || initialState;
  state.subscription = userData.usertype + "-basic";

  useEffect(() => {
    if (!userData || !userData.email || !userData.usertype) {
      navigate("/login");
    }
    if (localstoragedata?.anothertypeuser) {
      alert("Already registered email with another user type.");
      navigate("/login");
    }
  }, [userData, navigate]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   if (name.startsWith("personaldetails.")) {
  //     const fieldName = name.split(".")[1];
  //     setUserData((oldData) => ({
  //       ...oldData,
  //       personaldetails: {
  //         ...oldData.personaldetails,
  //         [fieldName]: value,
  //       },
  //     }));
  //   } else {
  //     setUserData((oldData) => ({
  //       ...oldData,
  //       [name]: value,
  //     }));
  //   }
  // };

  // const handleSkillsChange = (e) => {
  //   const skillsArray = e.target.value.split(",").map((skill) => skill.trim());
  //   setUserData((oldData) => ({
  //     ...oldData,
  //     personaldetails: {
  //       ...oldData.personaldetails,
  //       skills: skillsArray,
  //     },
  //   }));
  // };
  function isValidPassword(password) {
    // Regex to check for at least one uppercase letter, one special character, and length > 8
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    return passwordRegex.test(password);
  }

  const addUserToDatabase = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!isValidPassword(userData.password)) {
      alert(
        "Enter a valid password. Password must contain:\n" +
          "1. At least one uppercase letter (A-Z)\n" +
          "2. At least one special character (e.g., !, @, #, $, %, etc.)\n" +
          "3. A minimum length of 8 characters",
      );
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
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      alert("Please upload an image file (jpg or png).");
      return;
    }
    const allowedExtensions = ["jpg", "jpeg", "png"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      alert("Invalid file extension. Only jpg and png are allowed.");
      return;
    }

    try {
      const checkUsername = await axios.get(
        // `https://barter-5cky.onrender.com/check-username/${userData.username}`,
        `http://localhost:3000/check-username/${userData.username}`,
        { withCredentials: true },
      );
      if (checkUsername.data.usernameavailable) {
        const formData = new FormData();
        formData.append("image", file);

        const uploadResponse = await axios.post(
          // "https://barter-5cky.onrender.com/upload-image",
          "http://localhost:3000/upload-image",
          formData,
          { withCredentials: true },
        );

        if (uploadResponse.data.imageuploaded) {
          userData.personaldetails.profilephoto = uploadResponse.data.imageurl;

          const newUserResponse = await axios.post(
            //"https://barter-5cky.onrender.com/register",
            "http://localhost:3000/register",
            userData,
            { withCredentials: true },
          );

          if (newUserResponse.data.userAdded) {
            localStorage.setItem(
              "response-userdata",
              JSON.stringify(newUserResponse.data),
            );
            navigate(
              `/welcome/${
                userData.usertype === "freelance"
                  ? "freelance/in23x"
                  : "workprovider/wpd78x"
              }/${encodeURIComponent(userData.username)}`,
            );
          } else {
            alert("An error occurred while adding the user. Please try again.");
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
      <div className="signup-content">
        <div className="welcome-back">
          <Lottie
            animationData={signup}
            style={{ height: "800px", overflow: "hidden", width: "330px" }}
          />
        </div>
        <div className="create-account">
          <h2>Create Account</h2>

          <form onSubmit={addUserToDatabase}>
            <input
              type="email"
              value={userData.email || ""}
              readOnly
              required
            />
            <input
              type="text"
              value={userData.usertype || ""}
              readOnly
              required
            />
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={(e) =>
                dispatch({ type: "username", payload: e.target.value })
              }
              required
              placeholder="Username*"
            />
            <input
              type="text"
              name="personaldetails.name"
              value={userData.personaldetails.name}
              onChange={(e) =>
                dispatch({ type: "pDName", payload: e.target.value })
              }
              required
              placeholder="Name*"
            />
            <input
              type="Number"
              name="personaldetails.conatactno"
              value={userData.personaldetails.conatactno}
              onChange={(e) =>
                dispatch({ type: "pDContactNo", payload: e.target.value })
              }
              required
              maxLength={10}
              placeholder="Contact No*"
            />
            {userData.usertype === "workprovider" && (
              <input
                type="text"
                name="personaldetails.location"
                value={userData.personaldetails.location}
                onChange={(e) =>
                  dispatch({ type: "pDLocation", payload: e.target.value })
                }
                required
                placeholder="Location*"
              />
            )}
            <input
              type="text"
              placeholder="LinkedIn ID"
              name="personaldetails.linkedinid"
              value={userData.personaldetails?.linkedinid || ""}
              required
              onChange={(e) => dispatch("pDLinkedIn", e.target.value)}
            />
            <select
              name="personaldetails.gender"
              value={userData.personaldetails?.gender || ""}
              onChange={(e) => dispatch("pDGender", e.target.value)}
              required
            >
              <option value="">Gender*</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
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
              onChange={(e) => ({
                type: "password",
                payload: e.target.value,
              })}
              required
              placeholder="Password*"
            />
            <button type="submit" style={{ width: "100%", overflow: "hidden" }}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
