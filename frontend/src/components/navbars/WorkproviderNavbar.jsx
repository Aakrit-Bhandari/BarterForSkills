import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";


import logo from "../Images/barter.png"
export default function WorkproviderNavbar()
{
    const navigate = useNavigate();
    const handleSelectChange =(e)=>{
        const selectedValue = e.target.value;
        if(selectedValue==="Employee")
        {
            navigate("/employee")
        }
    }
    return (
        <section className="NavRec_Page_Main_Container">
            <div className="NavRec_Page_Main_ContComp">
                <div className="NavRec_Page_Logo_Industry">
                    <div className="NavRec_Page_Logo">
                        <img src={logo} about="Company_logo"/>
                    </div>
                    <div className="NavRec_Page_Searching">
                        <span>Find CVS</span>
                        <span>Post a Job</span>
                        <span>About</span>
                    </div>
                </div> 
                <div className="NavRec_Page_Registration">
                    <div className="NavRec_Page_Button">
                        <button className="NavRec_button">Login</button>
                    </div>
                    <div className="NavRec_Page_Register">
                        <select className="NavEmp_Page_Select" onChange={handleSelectChange}>
                            <option value="Employer">Employer</option>
                            <option value="Employee">Employee</option>
                        </select>
                    </div>
                </div>
            </div>
        </section>
    );
}