import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Success = ()=>{
    const {userId,subscriptiontype,username,usertype} = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        const makeChangestodb = async(userId,subscriptiontype)=>{
            const getResponse = await axios.get(`http://localhost:5000/subscription/${userId}/${subscriptiontype}`,{
              withCredentials:true
            })
            if(getResponse.data.subscriptionchanged){
              if(usertype === "freelance"){
                navigate(`/welcome/freelance/in23x/${username}`);
              }
              else{
                navigate(`/welcome/workprovider/wpd78x/${username}`);
              }
              return;
            }
            else{
              alert(`Some error occured. Try after sometime or contact us.`);
              return;
            }
          }
          console.log(userId,subscriptiontype,username);
          makeChangestodb(userId,subscriptiontype);
    },[])
    return(
        <>
            <span>Success🎉. You upgraded your plan to ${subscriptiontype}. Redirecting back to home page....</span>
        </>
    )
}

export default Success;