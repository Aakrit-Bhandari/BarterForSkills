import axios from "axios";
import { useEffect, useState } from "react";
import {useNavigate, useParams} from 'react-router-dom'

export default function Userprofile()
{
    const navigate = useNavigate();
    const {username} = useParams();

    const [userdata,setuserdata] = useState(null);
    const [error,setError] = useState("");
    const [seterror,isError] = useState(false);
    const [date,setdata] = useState(0);

    useEffect(()=>{
        const getDatausername = async()=>{
            const userData = await axios.get(`http://localhost:5000/user/username/${username}`,{
                withCredentials:true
            })
            if(userData.data.userprofilefound){
                isError(false);
                setuserdata(userData.data.userProfiledata);
                const getdate = new Date().getDate()-new Date(userData.data.userProfiledata?.createdAt).getDate();
                setdata(getdate);
            }
            else{
                isError(true);
                setError("No such user with this username exist.");
            }
        }
        getDatausername();
    },[])

    return(
        <>
            {setError && <span>{error}</span>}
            <div className="userprofile">
                <div className="upperside">
                    <img src={userdata?.personaldetails?.profilephoto} alt="" /><br />
                    <span><b style={{color:'purple'}}>{userdata?.username}</b></span><br />
                    <span style={{color:'black',fontSize:'14px'}}>{userdata?.usertype==='workprovider'?'Work Provider':'Freelancer'}</span>
                </div>
                <div className="downside">
                    <span>Skills: <b style={{color:'purple'}}>{userdata?.personaldetails?.skills.join(', ')}</b></span><br />
                    <span>Email: <b style={{color:'purple'}}>{userdata?.email}</b></span><br />
                    <span>Rating: {userdata?.personaldetails?.rating===1?'⭐':userdata?.personaldetails?.rating===2?'⭐⭐':userdata?.personaldetails?.rating===3?'⭐⭐⭐':userdata?.personaldetails?.rating===4?'⭐⭐⭐⭐':userdata?.personaldetails?.rating===5?'⭐⭐⭐⭐⭐':'0'}</span>
                </div>
            </div>
        </>
    );
}