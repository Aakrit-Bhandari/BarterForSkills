import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PersonApplied = ({clientid,projectid,setmailsection,setmailuserdata,rating,setRate,setUser,setid,shortlistedusers})=>{
    const navigate = useNavigate();
    const [userdata,setuserdata] = useState(null);
    const [shortlistedtab,setshortlistedtab] = useState(false);
    useEffect(()=>{
        const performtask = async()=>{
            const getuserData = await axios.get(`http://localhost:5000/user/${clientid}`,{
                withCredentials:true
            })
            if(getuserData.data.userprofilefound){
                setuserdata(getuserData.data.userProfiledata)
            }
            
        }
        performtask();
    },[])
    const shortlistuser = async()=>{
        const performshortlisting = await axios.get(`http://localhost:5000/shortlist/${clientid}/${projectid}`,{
            withCredentials:true
        })
        if(performshortlisting.data.userApplied){
            alert("User Shortlisted Successfully...");
            return;
        }
        alert("User Already Shortlisted...");
        return;
    }
    const sendEmailtouser = async()=>{
        setmailsection(true);
        setmailuserdata(userdata);
    }
    const rateUser = async()=>{
        setRate(true);
        setUser(userdata);
        setid(userdata._id);
        console.log(userdata._id);
    }
    return(
        <>
            <div className="small-divs-applied">
                <div className="left-applied">
                    <div className="img-logo">
                        <img src={userdata?.personaldetails?.profilephoto} alt="img" />
                    </div>
                    <div className="text-logo">
                        <span>{userdata?.personaldetails?.name}</span><br />
                        <span style={{color:'gray'}}>Mob No. +91 {userdata?.personaldetails?.conatactno}</span>
                    </div>
                </div>
                <div className="right-applied">
                    <div className="text-right">
                        <span style={{color:'gray'}}>UserType: <span style={{color:'purple'}}>{userdata?.subscription==="freelance-basic"?"Basic":(userdata?.subscription==="freelance-mid"?"Premium":"Pro Premium")}</span></span><br />
                        <span style={{color:'gray'}}>Skills: {userdata?.personaldetails?.skills?.map(skill => skill.skill)?.join(', ')||"Not provided"}</span><br />
                        <span style={{color:'gray'}}>Linkedin: {userdata?.personaldetails?.linkedinid}</span><br />
                        <span style={{color:'gray'}}>Gender: {userdata?.personaldetails?.gender}</span><br />
                        <span style={{color:'gray'}}>Rating: {userdata?.personaldetails?.rating===null?0:userdata?.personaldetails?.rating}</span><br />
                        <div style={{textAlign:'center'}}>
                            {!rating && !shortlistedusers &&<button onClick={shortlistuser}>Shortlist</button>}
                            {rating && <button onClick={rateUser}>Rate User</button>}{!rating && !shortlistedusers && <span>&emsp;</span>}
                            <button onClick={()=>navigate(`/barter4skills/${userdata?.username}`)}>User Profile</button>
                            &emsp;
                            {!rating && shortlistedusers &&<button onClick={shortlistuser}>Project Cont.</button>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PersonApplied;