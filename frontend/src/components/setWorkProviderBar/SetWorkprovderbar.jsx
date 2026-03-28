import React, { useState, useEffect } from "react";
import axios from "axios";

const SetWorkProviderBar = ({ setprojectdata, setfiltercount, userid }) => {
    const [activeTab, setActiveTab] = useState("findingpeople");

    // Function to fetch and filter projects based on status
    const fetchProjects = async (status) => {
        try {
            const projectdata = await axios.get(`http://localhost:3000/getprojects-all/${userid}`, {
                // const projectdata = await axios.get(`https://barter-5cky.onrender.com/getprojects-all/${userid}`, {
                withCredentials: true,
            });
            if (projectdata.data.projectfound) {
                const filteredProjects = projectdata.data.projectdatafetched.filter(
                    (pro) => pro.projectdetails.projectstatusstatus === status
                );
                console.log("filtered",filteredProjects);
                setprojectdata(filteredProjects);
                setfiltercount(filteredProjects.length);
            }
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    // Fetch projects whenever the active tab changes
    useEffect(() => {
        fetchProjects(activeTab);
    }, [activeTab]);

    return (
        <div className="setbar">
            <button
                className={activeTab === "findingpeople" ? "active" : ""}
                onClick={() => setActiveTab("findingpeople")}
            >
                Finding People
            </button>
            <button
                className={activeTab === "inprogress" ? "active" : ""}
                onClick={() => setActiveTab("inprogress")}
            >
                In Progress
            </button>
            <button
                className={activeTab === "completed" ? "active" : ""}
                onClick={() => setActiveTab("completed")}
            >
                Completed
            </button>
        </div>
    );
};

export default SetWorkProviderBar;
