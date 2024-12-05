import React, { useEffect, useState } from "react";
import Searchconsole from "../components/Searchconsole";
import Joboption from "../components/Joboption";
import Jobdisplay from "../components/Jobdisplay";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Setsearchbar from "../components/Setsearchbar";
import Projectsadded from "../components/Projectsadded";
import SetWorkprovderbar from "../components/SetWorkprovderbar";
import EmployeeNavbar from "../navbars/EmployeeNavbar";
import WorkproviderNavbar from "../navbars/WorkproviderNavbar";
import Breadcrumb from "../components/Breadcrumb";

const Welcome = ()=>{
    const navigate = useNavigate();
    const [projectdata,setprojectdata] = useState([]);
    const [filtercount,setfiltercount] = useState(0);

    const [uploadprojects,setuploaded] = useState([]);
    const [uploadcount,setuploadcount] = useState(0);

    const [status,setstatus] = useState("all");

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
                //only finding people wors find
                const projectsss = projectdata.data.projectdatafetched.filter(pro=>pro.projectdetails.projectstatusstatus==='findingpeople');
                setprojectdata(projectsss);
            }
        }
        getdata();
    },[])

    const performlogout = async()=>{
        const logout = await axios.get('http://localhost:5000/logout',{
            withCredentials:true
        })
        if(logout.data.logoutdone){
            navigate('/');
        }
        else{
            alert("Logout not done... Some Error occured..");
        }
    }
    
    return(
        <>
            <div className="welcome-box">
                {/* <button onClick={performlogout}>Logout</button> */}
                {
                    localstoragedata?.userData?.usertype === 'freelance' && 
                    <div>
                        
                        <EmployeeNavbar userdata={localstoragedata} performlogout={performlogout}/>
                        <Searchconsole setprojectdata={setprojectdata} setfiltercount={setfiltercount}/>
                        <Setsearchbar setprojectdata={setprojectdata} setfiltercount={setfiltercount} userid={localstoragedata?.userData?._id} setstatus={setstatus}/>
                        <Jobdisplay projectdata={projectdata} filtercount={filtercount} worker={worker} userid={localstoragedata?.userData?._id} status={status}/>
                    </div>
                }
                {
                    localstoragedata?.userData?.usertype === 'workprovider' && 
                    <div>
                        <EmployeeNavbar userdata={localstoragedata} performlogout={performlogout} worker={worker}/>
                        {/* display jobs that are posted by this user */}
                        {/* <Projectsadded setprojectdata={setuploaded} setfiltercount={setuploadcount} userid={localstoragedata?.userData?._id}/> */}
                        <SetWorkprovderbar setprojectdata={setuploaded} setfiltercount={setuploadcount} userid={localstoragedata?.userData?._id}/>
                        <Jobdisplay projectdata={uploadprojects} filtercount={uploadcount} worker={!worker} userid={localstoragedata?.userData?._id}/>
                    </div>
                }
            </div>
        </>
    )
}

export default Welcome;