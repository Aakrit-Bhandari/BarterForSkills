import React, { useEffect, useState } from "react";
import '../src/Userprofile.css';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/Backbutton";

export default function Userprofile() {
  const navigate = useNavigate();
  const { username } = useParams();
  const [userdata, setuserdata] = useState(null);
  const [error, setError] = useState("");
  const [seterror, isError] = useState(false);
  const [date, setdata] = useState(0);
  const [skill, setskill] = useState("");
  const [workprovider,setworkprovider] = useState(false);
  const [workprovied,setworkprovied] = useState(0);

  useEffect(() => {
    const getDatausername = async () => {
      try {
        const userData = await axios.get(`http://localhost:5000/user/username/${username}`, {
          withCredentials: true,
        });

        if (userData.data.userprofilefound) {
          isError(false);
          const userProfile = userData.data.userProfiledata;
          setuserdata(userProfile);
          if(userProfile.usertype==="workprovider"){
            setworkprovider(true);
            //getworkcount
            const getcount = await axios.get(`http://localhost:5000/getCount/${userData.data._id}`,{
              withCredentials:true
            });
            setworkprovied(getcount.data.count);
            console.log(getcount.data.count);
          }

          const getdate = new Date().getDate() - new Date(userProfile?.createdAt).getDate();
          setdata(getdate);

          // Extract skills from the API response directly
          const skills = userProfile?.personaldetails?.skills
            ?.map((skill) => skill.skill)
            .filter(Boolean) // Ensures no null/undefined values
            .join(", ");
          setskill(skills);
        } else {
          isError(true);
          setError("No such user with this username exists.");
        }
      } catch (error) {
        isError(true);
        setError("An error occurred while fetching user data.");
      }
    };

    getDatausername();
  }, [username]); // Add `username` as a dependency to re-fetch data when it changes

  return (
    <>
      {error && <span>{error}</span>}
      <BackButton/>
      <div className="profile-container">
        {/* Photo Card with Rating */}
        <div className="profile-photo-card">
          <img
            src={userdata?.personaldetails?.profilephoto}
            alt="User Avatar"
            className="profile-avatar"
          />
          <h3 className="profile-name">{userdata?.personaldetails?.name}</h3>
          <p className="profile-email">{userdata?.username}</p>
          <p className="profile-email"><a style={{color:'black',textDecoration:'none'}} href={`mailto:${userdata?.email}`}>{userdata?.email}</a></p>
          <p style={{ color: 'purple',marginBottom:'2px' }}>
            {userdata?.usertype === "freelance" ? "Freelancer" : "Work Provider"}
          </p>
          <p style={{ color: 'purple',marginBottom:'2px'  }}>
            {userdata?.usertype === "freelance"?(userdata?.subscription === "freelance-basic" ? "Basic" : (userdata?.subscription === "freelance-mid")?"Premium":"Pro Premium"):(userdata?.subscription === "workprovider-basic" ? "Basic" : (userdata?.subscription === "workprovider-mid")?"Premium":"Pro Premium")}
          </p>
          {/* Rating Section */}
          <div className="profile-rating">
            <span className="rating-number">{userdata?.personaldetails?.rating}</span>
            <div className="rating-stars">
              {userdata?.personaldetails?.rating === 0
                ? '✔️'
                : '⭐'.repeat(userdata?.personaldetails?.rating)}
            </div>
          </div>
        </div>

        {/* Profile Details Card */}
        <div className="profile-details-card">
          <h3 className="profile-title" style={{overflow:'hidden'}}>Profile</h3>
          <ul className="profile-menu" style={{overflow:"hidden"}}>
            {!workprovider&&<li>
              <span className="menu-icon">Skills: &nbsp;</span>
              <span className="menu-skill">{skill || "No skills available"}</span>
            </li>}
            {workprovider&&<li>
              <span className="menu-icon">Location: &nbsp;</span>
              <span className="menu-skill">{userdata?.personaldetails?.location}</span>
            </li>}
            <li>
              <span className="menu-icon">LinkedinID: &nbsp;</span>
              <span className="menu-skill">{userdata?.personaldetails?.linkedinid}</span>
            </li>
            {!workprovider && <li>
              <span className="menu-icon">Gender: &nbsp;</span>
              <span className="menu-skill">
                {userdata?.personaldetails?.gender === "male"
                  ? "Male"
                  : userdata?.personaldetails?.gender === "female"
                  ? "Female"
                  : "Others"}
              </span>
            </li>}
            <li>
              <span className="menu-icon">Description: &nbsp;</span>
              <span className="menu-skill">{userdata?.personaldetails?.description===""?"No Description Available":userdata?.personaldetails?.description}</span>
            </li>
            {!workprovider&&<li>
              <span className="menu-icon">Tasks Done: &nbsp;</span>
              <span className="menu-skill">{userdata?.projectsworkedon.length}</span>
            </li>}
            {workprovider&&<li>
              <span className="menu-icon">Work Provided: &nbsp;</span>
              <span className="menu-skill">{workprovied}</span>
            </li>}
            <li>
              <span className="menu-icon">Joined On: &nbsp;</span>
              <span className="menu-skill">{new Date(userdata?.createdAt).getDate()+"-"+(new Date(userdata?.createdAt).getMonth()+1)+"-"+new Date(userdata?.createdAt).getFullYear()}</span>
            </li>
          </ul>
          {!workprovider && <div style={{width:'100%',textAlign:'center',overflow:'hidden'}}>
            <button className="primary-btn" style={{marginTop:'30px',padding:'8px',borderRadius:'5px',backgroundColor:'purple'}}>Download CV</button>
          </div>}

        </div>
      </div>
    </>
  );
}
