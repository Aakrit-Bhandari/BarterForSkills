import React, { useState } from "react";
import axios from "axios";

const JobApplied = ({projectid,setDatapro}) => {
    const [activeTab, setActiveTab] = useState("all");

    const onallclick = ()=>{
        setActiveTab("all");
        //get all jobs
        const getProjectData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/getproject/${projectid}`, {
                    withCredentials: true
                });

                if (response.data.projectdatapresent) {
                    setDatapro(response.data.projectdatafetched.projectofficials.clientsapplied);
                }
            } catch (error) {
                console.error("Error fetching project data:", error);
            }
        };
        getProjectData();
    }
    const onshortlisted = async()=>{
        setActiveTab("shortlisted");
        //get jobs
        const getProjectData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/getproject/${projectid}`, {
                    withCredentials: true
                });

                if (response.data.projectdatapresent) {
                    const changeddata = response.data.projectdatafetched.projectofficials.clientid;
                    console.log("data",changeddata);
                    setDatapro(changeddata);
                }
            } catch (error) {
                console.error("Error fetching project data:", error);
            }
        };
        getProjectData();
    }

    return (
        <div className="setbar">
            <button
                className={activeTab === "all" ? "active" : ""}
                onClick={onallclick}
            >
                All
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

export default JobApplied;
