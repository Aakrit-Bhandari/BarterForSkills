import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LOGIN_URL,
  SEND_OTP_URL,
  TYPE_POST,
  VERIFY_PASSWORD_URL,
} from "../../../fetchers/constants.js";
import { pokeBarterForSkillsServer } from "../../../fetchers/fetchers.jsx";
import Backbutton from "../../backButton/Backbutton.jsx";
import "../Login.css";
const initialState = {
  email: "",
  usertype: "",
  subscription: "",
};
const updateUserData = (state, action) => {
  switch (action.type) {
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "userType":
      return {
        ...state,
        usertype: action.payload,
        subscription: action.payload + "-basic",
      };
    default:
      return state;
  }
};

export default function Loginfreelance() {
  const [hiddenOtpBox, setHiddenOtpBox] = useState(false);
  const [hiddenPasswordBox, sethiddenPasswordBox] = useState(false);
  const navigate = useNavigate();
  const [userData, dispatch] = useReducer(updateUserData, initialState);
  const [error, seterror] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false); // Password error state

  function isValidEmail(email) {
    // Regex for email validation with period in domain
    const emailRegex = /^[^\s@]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  const checkData = async (e) => {
    e.preventDefault();
    seterror(false);
    setOtpError(false);
    setPasswordError(false); // Reset password error on form submit
    try {
      const options = {
        withCredentials: true,
        data: { email: userData.email, otp: otp, usertype: "freelance" },
      };
      const response = await pokeBarterForSkillsServer(
        `${LOGIN_URL}`,
        options,
        TYPE_POST,
      );
      // "https://barter-5cky.onrender.com/login",

      if (response.otpverified) {
        if (response.existinguser) {
          if (response.userData.userType === "freelance")
            navigate(
              `/welcome/freelance/in23x/${encodeURIComponent(response.data.userData.username)}`,
            );
          else
            navigate(
              `/welcome/workprovider/wpd78x/${encodeURIComponent(response.data.userData.username)}`,
            );
        } else {
          navigate(`/signup/${userData.email}`, {
            state: { usertype: userData.usertype },
          });
        }
      } else {
        setOtpError(true);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    sethiddenPasswordBox(false);
    setOtpError(false);
    setPasswordError(false); // Reset password error on OTP request
    if (isValidEmail(userData.email)) {
      try {
        const options = {
          withCredentials: true,
          data: { email: userData.email },
        };
        const response = await pokeBarterForSkillsServer(
          `${SEND_OTP_URL}`,
          options,
          TYPE_POST,
        );
        // "https://barter-5cky.onrender.com/send-otp",
        if (response.otpsent) {
          setHiddenOtpBox(true);
        } else {
          alert("Failed to send OTP");
        }
      } catch (error) {
        console.error("Error sending OTP:", error);
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
      alert("Enter a valid email");
      seterror(true); // Email validation error handling
    }
  };
  function isValidPassword(password) {
    // Regex to check for at least one uppercase letter, one special character, and length > 8
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    return passwordRegex.test(password);
  }

  const verifypass = async () => {
    // Check if password is empty or invalid
    if (!password || password.length < 1 || !isValidPassword(password)) {
      setPasswordError(true); // Show password error
      alert("Enter a valid password to continue.");
      return;
    }

    // Proceed with password verification if valid
    try {
      const options = {
        withCredentials: true,
        data: {
          email: userData.email,
          password: password,
          usertype: userData.usertype,
        },
      };
      const response = await pokeBarterForSkillsServer(
        `${VERIFY_PASSWORD_URL}`,
        options,
        TYPE_POST,
      );
      // Make API call to verify password (this is just an example)
      // "https://barter-5cky.onrender.com/verify-password",
      if (response.passverified) {
        setPasswordError(false); // Clear error if password is valid
        localStorage.setItem(
          "response-userdata",
          JSON.stringify(response.data),
        );
        navigate(
          `/welcome/freelance/in23x/${encodeURIComponent(response.data.userData.username)}`,
        );
      } else {
        setPasswordError(true); // Set password error if verification fails
      }
    } catch (error) {
      console.error("Error verifying password:", error);
    }
  };

  return (
    <div className="mainbox-login">
      <div className="loginform">
        <Backbutton />
        <b>Login or Signup</b>
        <form onSubmit={checkData}>
          <input
            type="email"
            placeholder="email*"
            value={userData.email}
            onChange={(e) =>
              dispatch({ type: "email", payload: e.target.value })
            }
            name="email"
            readOnly={hiddenOtpBox || hiddenPasswordBox}
          />
          <select
            value={userData.usertype}
            onChange={(e) =>
              dispatch({ type: "userType", payload: e.target.value })
            }
            name="usertype"
          >
            <option value="">Select User Type</option>
            <option value="freelance">Freelance</option>
            <option value="workprovider">Work Provider</option>
          </select>
          <span
            style={{
              color: "red",
              fontSize: "12px",
              display: error ? "block" : "none",
            }}
          >
            Enter a valid email Address
          </span>
          <button onClick={getPassword} id="btn">
            Continue with Password
          </button>
          <button onClick={sendOtp} id="btn">
            Continue with Otp
          </button>
          {hiddenPasswordBox && (
            <div className="otpcentre">
              <b>Verify with Password</b>
              <input
                type="password"
                placeholder="Password*"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                style={{
                  color: "red",
                  fontSize: "12px",
                  display: passwordError ? "block" : "none",
                }}
              >
                Wrong Password or Invalid User
              </span>
              <button onClick={verifypass} id="btn">
                Continue
              </button>
            </div>
          )}
          {hiddenOtpBox && (
            <div className="otpcentre">
              <b>Verify with OTP</b>
              <input
                type="number"
                placeholder="otp*"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <span
                style={{
                  color: "red",
                  fontSize: "12px",
                  display: otpError ? "block" : "none",
                }}
              >
                Wrong OTP
              </span>
              <button type="submit" id="btn">
                Continue
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
