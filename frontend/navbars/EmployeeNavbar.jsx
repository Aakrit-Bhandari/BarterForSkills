import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../public/Images/barter.png"
export default function EmployeeNavbar({userdata,performlogout,worker})
{
    const data = userdata?.userData;
    const navigate = useNavigate();
    const handleSelectChange =(e)=>{
        const selectedValue = e.target.value;
        if(selectedValue==="Employer")
        {
            navigate("/recruiter");
        }
    }
    console.log("this",userdata);
    return (
        <section className="NavEmp_Page_Main_Container">
            <div className="NavEmp_Page_Main_ContComp">
                <div className="NavEmp_Page_Logo_Industry">
                    <div className="NavEmp_Page_Logo">
                        <img src={logo} alt="Company_logo" onClick={()=>navigate('/')}></img>
                    </div>
                    <div className="NavEmp_Page_Industry">
                        <span>Jobs</span>
                        <span>Services</span>
                        <span>Compaines</span>
                    </div>
                </div>
                {/* this is the second protion */}
                <div className="NavEmp_Page_Registration">
                    <div className="NavEmp_Page_Buttons">
                        {data && <span>Welcome <b style={{color:'purple'}}>{data?.username}😊</b></span>}
                        {data && <img src={data?.personaldetails?.profilephoto} alt="" onClick={()=>navigate(`/barter4skills/${data?.username}`)} style={{borderRadius:'150px',width:'40px',height:'40px'}}/>}
                    </div>
                    <div className="NavEmp_Page_Register" style={{width: worker?'300px':'200px'}}>
                        {<button className="NavPage_buttons" onClick={()=>navigate(`/editprofile/${data?._id}/${data?.username}`)}>Edit Profile</button>}
                        {worker && <button className="NavPage_buttons" onClick={()=>navigate(`/add-project/${data?._id}/${data?.username}`)}>Add Task</button>}
                        <button onClick={performlogout} className="NavPage_buttons">Logout</button>
                    </div>
                </div>
            </div>
        </section>
    );
}