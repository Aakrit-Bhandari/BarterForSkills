import React, { useState } from "react";
import axios from "axios";

const Setsearchbar = ({setprojectdata,setfiltercount,userid}) => {
    const [activeTab, setActiveTab] = useState("all");

    const onallclick = ()=>{
        setActiveTab("all");
        //get all jobs
        const getdata = async()=>{
            const projectdata = await axios.get('http://localhost:5000/getworks',{
                withCredentials:true
            });
            if(projectdata.data.projectdatapresent){
                //only finding people wors find
                const projectsss = projectdata.data.projectdatafetched.filter(pro=>pro.projectdetails.projectstatusstatus==='findingpeople');
                setprojectdata(projectsss);
                setfiltercount(projectsss.length);
            }
        }
        getdata();
    }

    const onactiveclick = ()=>{
        setActiveTab("applied");
        //get jobs
        const getdata = async()=>{
            const projectdata = await axios.get(`http://localhost:5000/getprojects/${userid}`,{
                withCredentials:true
            });
            if(projectdata.data.projectfound){
                setprojectdata(projectdata.data.projectapplied);
                setfiltercount(projectdata.data.projectapplied.length);
            }else{
                setprojectdata([]);
                    setfiltercount(0);
            }
        }
        getdata();
    }
    const onshortlisted = async()=>{
        setActiveTab("shortlisted");
        //get jobs
        const getdata = async()=>{
            const projectdata = await axios.get(`http://localhost:5000/getprojectuseridapplied/${userid}`,{
                withCredentials:true
            });
            if(projectdata.data.projectfound){
                setprojectdata(projectdata.data.projectapplied);
                setfiltercount(projectdata.data.projectapplied.length);
            }else{
                setprojectdata([]);
                setfiltercount(0);
            }
        }
        getdata();
    }

    return (
        <div className="setbar">
            <button
                className={activeTab === "all" ? "active" : ""}
                onClick={onallclick}
            >
                All jobs
            </button>
            <button
                className={activeTab === "applied" ? "active" : ""}
                onClick={onactiveclick}
            >
                Applied jobs
            </button>
            <button
                className={activeTab === "shortlisted" ? "active" : ""}
                onClick={onshortlisted}
            >
                Shortlisted
            </button>
        </div>
    );
};

export default Setsearchbar;
