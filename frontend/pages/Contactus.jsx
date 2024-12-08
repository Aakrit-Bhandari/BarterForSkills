import React, { useState } from "react";
import axios from "axios";
import '../src/Contactus.css'
const Contactus = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        message: "",
      });
      const handleChange=(e)=>{
        const {name,value} = e.target;
        setFormData((prevData)=>({
          ...prevData,[name]:value,
        }));
      };
    const [errors,setErrors]=useState({});
    const nameRegex = /^[A-Za-z]{2,30}$/; // Only letters, min 2, max 30
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valid email format
    const phoneRegex = /^[0-9]{10}$/; // 10-digit phone number
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    
        // Validate on Change
        switch (name) {
          case "firstName":
          case "lastName":
            if (!nameRegex.test(value)) {
              setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: "Name should only contain letters (min 2 characters).",
              }));
            } else {
              setErrors((prevErrors) => {
                const { [name]: removedError, ...rest } = prevErrors;
                return rest;
              });
            }
            break;
    
          case "email":
            if (!emailRegex.test(value)) {
              setErrors((prevErrors) => ({
                ...prevErrors,
                email: "Please enter a valid email address.",
              }));
            } else {
              setErrors((prevErrors) => {
                const { email: removedError, ...rest } = prevErrors;
                return rest;
              });
            }
            break;
    
          case "phoneNumber":
            if (!phoneRegex.test(value)) {
              setErrors((prevErrors) => ({
                ...prevErrors,
                phoneNumber: "Phone number must be 10 digits.",
              }));
            } else {
              setErrors((prevErrors) => {
                const { phoneNumber: removedError, ...rest } = prevErrors;
                return rest;
              });
            }
            break;
    
          default:
            break;
        }
      };
      const addQueryy = async()=>{
        try{
            const { firstName, lastName, email, phoneNumber, message } = formData;
            if (
            nameRegex.test(firstName) &&
            nameRegex.test(lastName) &&
            emailRegex.test(email) &&
            phoneRegex.test(phoneNumber) &&
            message.trim() !== "")
            {
                const response = await axios.post(
                    "https://barter-5cky.onrender.com/contactPage/addQuery",
                    {
                        firstName:formData.firstName,
                        lastName:formData.lastName,
                        email:formData.email,
                        phonenumber:formData.phoneNumber,
                        message:formData.message,
                    }
                );
                alert("Query Dropped");
                setFormData("");
            }
            else{
                alert("Please correct the errors before submitting.");
            }
        }
        catch(err)
        {
            alert("Query was not sent",err);
        }
      };
  return (
    <section className="contactus">
      <div className="contactus_comp_success">
        {/* Left Section */}
        <div className="contactus_successleft">
          <h1>Get in touch</h1>
          <p>OurFriendly team would love to hear you.</p>
          <div className="contactus_left_div_container">
            <div className="contactus_left_div_comp">
              <label>First Name</label>
              <input name="firstName" value={formData.firstName} onChange={handleChange} type="text" />
            </div>
            <div className="contactus_left_div_comp">
              <label>Last Name</label>
              <input name="lastName" value={formData.lastName} onChange={handleChange} type="text" />
            </div>
            <div className="contactus_left_div_comp">
              <label>Email</label>
              <input name="email" value={formData.email} onChange={handleChange} type="email" />
            </div>
            <div className="contactus_left_div_comp">
              <label>Phone Number</label>
              <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} type="number" />
            </div>
            <div className="contactus_left_div_comp">
              <label>Message</label>
              <input name="message" value={formData.message} onChange={handleChange} type="text" />
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
};

export default Contactus;