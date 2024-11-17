import React, { useEffect, useState } from "react";
import Joboption from "../components/Joboption";
import { useParams } from "react-router-dom";
import axios from "axios";
import PersonApplied from "../components/PersonApplied";

const Peopleapplied = () => {
    const { userid, projectid } = useParams(); // Get URL parameters
    const [datapro, setDatapro] = useState(null); // State for storing project data

    // Fetch project data based on project ID
    useEffect(() => {
        const getProjectData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/getproject/${projectid}`, {
                    withCredentials: true
                });

                if (response.data.projectdatapresent) {
                    setDatapro(response.data.projectdatafetched);
                    console.log(datapro);
                }
            } catch (error) {
                console.error("Error fetching project data:", error);
            }
        };

        getProjectData();
    }, [projectid]);

    return (
        <>
            <br/>
            {datapro ? (
                <Joboption data={datapro} userid={userid} />
            ) : (
                <p>Loading project data...</p>
            )}
            <div className="people-applied">
                <span style={{color:'red',textAlign: 'center'}}>{datapro?.projectofficials?.clientsapplied.length} Person Applied</span>
                {datapro?.projectofficials?.clientsapplied.length>0 && 
                datapro?.projectofficials?.clientsapplied.map((data,index)=>(
                    <PersonApplied clientid={data?.cliendid} projectid={projectid}/>
                ))}
            </div>
        </>
    );
};

export default Peopleapplied;
