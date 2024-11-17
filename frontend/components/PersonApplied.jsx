import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

const PersonApplied = ({clientid,projectid})=>{
    const [userdata,setuserdata] = useState(null);
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
                        <span style={{color:'gray'}}>Skills: {userdata?.personaldetails?.skills.join(', ')}</span><br />
                        <span style={{color:'gray'}}>Description: {userdata?.personaldetails?.description}</span><br />
                        <span style={{color:'gray'}}>Linkedin: {userdata?.personaldetails?.linkedinid}</span><br />
                        <span style={{color:'gray'}}>Gender: {userdata?.personaldetails?.gender}</span><br />
                        <span style={{color:'gray'}}>Rating: {userdata?.personaldetails?.rating===null?0:userdata?.personaldetails?.rating}</span><br />
                        <div style={{textAlign:'center'}}>
                            <button onClick={shortlistuser}>Shortlist</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PersonApplied;