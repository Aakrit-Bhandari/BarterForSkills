import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import "./Contactus.css";
import { isValidForm } from "./utils";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  message: "",
};

function changeState(state, action) {
  switch (action.type) {
    case "firstName":
      return { ...state, firstName: action.payload };
    case "lastName":
      return { ...state, lastName: action.payload };
    case "email":
      return { ...state, email: action.payload };
    case "phoneNumber":
      return { ...state, phoneNumber: action.payload };
    case "message":
      return { ...state, message: action.payload };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

export default function Contactus() {
  const [state, dispatch] = useReducer(changeState, initialState);
  const [errors, setErrors] = useState("");

  const addQueryy = async () => {
    const validation = isValidForm(state);
    if (validation.error) {
      setErrors(validation.message);
      return;
    }
    try {
      const { firstName, lastName, email, phoneNumber, message } = state;
      await axios.post(
        "https://barter-5cky.onrender.com/contactPage/addQuery",
        {
          firstName,
          lastName,
          email,
          phonenumber: phoneNumber,
          message,
        },
      );
      dispatch({ type: "reset" });
      alert("Query Dropped");
    } catch (err) {
      console.error(err);
      alert("Query was not sent", err);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      alert(errors);
    }
  }, [errors]);

  return (
    <section className="contactus">
      <div className="contactus_comp_success">
        <div className="contactus_successleft">
          <h1>Get in touch</h1>
          <p>OurFriendly team would love to hear you.</p>
          <div className="contactus_left_div_container">
            <div className="contactus_left_div_comp">
              <label>First Name</label>
              <input
                name="firstName"
                value={state.firstName}
                onChange={(e) =>
                  dispatch({ type: "firstName", payload: e.target.value })
                }
                type="text"
              />
            </div>
            <div className="contactus_left_div_comp">
              <label>Last Name</label>
              <input
                name="lastName"
                value={state.lastName}
                onChange={(e) =>
                  dispatch({ type: "lastName", payload: e.target.value })
                }
                type="text"
              />
            </div>
            <div className="contactus_left_div_comp">
              <label>Email</label>
              <input
                name="email"
                value={state.email}
                onChange={(e) =>
                  dispatch({ type: "email", payload: e.target.value })
                }
                type="email"
              />
            </div>
            <div className="contactus_left_div_comp">
              <label>Phone Number</label>
              <input
                name="phoneNumber"
                value={state.phoneNumber}
                onChange={(e) =>
                  dispatch({ type: "phoneNumber", payload: e.target.value })
                }
                type="number"
              />
            </div>
            <div className="contactus_left_div_comp">
              <label>Message</label>
              <input
                name="message"
                value={state.message}
                onChange={(e) =>
                  dispatch({ type: "message", payload: e.target.value })
                }
                type="text"
              />
            </div>
            <div className="contactus_left_btn">
              <button onClick={addQueryy}>Send</button>
            </div>
          </div>
        </div>
        {/* Right Section */}
        <div className="contactus_sucess_right">
          <div className="contact_sucees_right_img">
            <img
              src="https://res.cloudinary.com/dyerj85ll/image/upload/v1732604482/bacha_vfuwag.png"
              alt="Illustration"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
