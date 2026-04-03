import Lottie from "lottie-react";
import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import signup from "../../assets/sign.json";
import {
  REGISTER_URL,
  TYPE_POST,
  UPLOAD_IMAGE_URL,
} from "../../fetchers/constants";
import { pokeBarterForSkillsServer } from "../../fetchers/fetchers";

const initialState = {
  username: "",
  usertype: "",
  email: "",
  password: "",
  subscription: "-basic",
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
    case "username":
      return { ...state, username: action.payload };
    case "usertype":
      return {
        ...state,
        usertype: action.payload,
        subscription: action.payload + "-basic",
      };
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "subscription":
      return { ...state, subscription: action.payload };
    case "pDName":
      return {
        ...state,
        personaldetails: { ...state.personaldetails, name: action.payload },
      };
    case "pDContactNo":
      return {
        ...state,
        personaldetails: {
          ...state.personaldetails,
          conatactno: action.payload,
        },
      };
    case "pDLocation":
      return {
        ...state,
        personaldetails: { ...state.personaldetails, location: action.payload },
      };
    case "pDDescription":
      return {
        ...state,
        personaldetails: {
          ...state.personaldetails,
          description: action.payload,
        },
      };
    case "pDLinkedIn":
      return {
        ...state,
        personaldetails: {
          ...state.personaldetails,
          linkedinid: action.payload,
        },
      };
    case "pDGender":
      return {
        ...state,
        personaldetails: { ...state.personaldetails, gender: action.payload },
      };
    case "pDProfilePhoto":
      return {
        ...state,
        personaldetails: {
          ...state.personaldetails,
          profilephoto: action.payload,
        },
      };
    default:
      return state;
  }
};

function isValidPassword(password) {
  // Regex to check for at least one uppercase letter, one special character, and length > 8
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
  return passwordRegex.test(password);
}

export default function SignUp() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const [userData, dispatch] = useReducer(updateUserData, initialState);

  const addUserToDatabase = async (e) => {
    e.preventDefault();

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
      // `https://barter-5cky.onrender.com/check-username/${userData.username}`,
      const options = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      // const response = await pokeBarterForSkillsServer(
      //   `${CHECK_USERNAME_URL}/${userData.username},${options},${TYPE_GET}`,
      // );
      const formData = new FormData();
      formData.append("image", file);
      options.withCredentials = true;
      options.data = formData;
      const uploadResponse = await pokeBarterForSkillsServer(
        UPLOAD_IMAGE_URL,
        options,
        TYPE_POST,
      );
      //   // "https://barter-5cky.onrender.com/upload-image",

      if (uploadResponse.imageuploaded) {
        userData.personaldetails.profilephoto = uploadResponse.imageurl;

        //"https://barter-5cky.onrender.com/register",

        const newUserResponse = await pokeBarterForSkillsServer(
          REGISTER_URL,
          { data: userData, withCredentials: true },
          TYPE_POST,
        );
        if (newUserResponse.userAdded) {
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
              onChange={(e) =>
                dispatch({ type: "email", payload: e.target.value })
              }
              placeholder="email"
              required
            />
            <select
              value={userData.userType}
              onChange={(e) =>
                dispatch({ type: "usertype", payload: e.target.value })
              }
              required
            >
              <option value="">Select User Type</option>
              <option value="freelance">Freelance</option>
              <option value="workprovider">Work Provider</option>
            </select>
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
              value={userData.personaldetails.linkedinid || ""}
              required
              onChange={(e) =>
                dispatch({ type: "pDLinkedIn", payload: e.target.value })
              }
            />
            <select
              name="personaldetails.gender"
              value={userData.personaldetails?.gender || ""}
              onChange={(e) =>
                dispatch({ type: "pDGender", payload: e.target.value })
              }
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
              onChange={(e) =>
                dispatch({ type: "password", payload: e.target.value })
              }
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
