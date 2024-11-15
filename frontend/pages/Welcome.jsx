import React, { useEffect, useState } from "react";
import Searchconsole from "../components/Searchconsole";
import Joboption from "../components/Joboption";
import Jobdisplay from "../components/Jobdisplay";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Setsearchbar from "../components/Setsearchbar";
import Projectsadded from "../components/Projectsadded";

const Welcome = ()=>{
    const navigate = useNavigate();
    const [projectdata,setprojectdata] = useState([]);
    const [filtercount,setfiltercount] = useState(0);

    const [uploadprojects,setuploaded] = useState([]);
    const [uploadcount,setuploadcount] = useState(0);

    const[worker,setworker] = useState(true);

    const [localstoragedata, setLocalstoragedata] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("response-userdata")) || {};
        } catch (error) {
            console.error("Error parsing localStorage data:", error);
            return {};
        }
    });
    //get project data
    useEffect(()=>{
        const getdata = async()=>{
            const projectdata = await axios.get('http://localhost:5000/getworks',{
                withCredentials:true
            });
            if(projectdata.data.projectdatapresent){
                setprojectdata(projectdata.data.projectdatafetched);
            }
        }
        getdata();
    },[])

    console.log(localstoragedata);
    return(
        <>
            {
                localstoragedata?.userData?.usertype === 'freelance' && 
                <div>
                    <Searchconsole setprojectdata={setprojectdata} setfiltercount={setfiltercount}/>
                    <Setsearchbar setprojectdata={setprojectdata} setfiltercount={setfiltercount} userid={localstoragedata?.userData?._id}/>
                    <Jobdisplay projectdata={projectdata} filtercount={filtercount} worker={worker}/>
                </div>
            }
            {
                localstoragedata?.userData?.usertype === 'workprovider' && 
                <div>
                    <button onClick={()=>navigate(`/add-project/${localstoragedata?.userData?._id}/${localstoragedata?.userData?.username}`)}>add new project temp</button>
                    {/* display jobs that are posted by this user */}
                    <Projectsadded setprojectdata={setuploaded} setfiltercount={setuploadcount} userid={localstoragedata?.userData?._id}/>
                    <Jobdisplay projectdata={uploadprojects} filtercount={filtercount} worker={!worker}/>
                </div>
            }
        </>
    )
}

export default Welcome;