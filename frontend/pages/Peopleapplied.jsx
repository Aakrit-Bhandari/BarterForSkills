import React, { useEffect, useState } from "react";
import Joboption from "../components/Joboption";
import { useParams } from "react-router-dom";
import axios from "axios";
import PersonApplied from "../components/PersonApplied";
import JobApplied from "../components/JobApplied";
import BackButton from "../components/Backbutton";

const Peopleapplied = () => {
    const { userid, projectid } = useParams(); // Get URL parameters
    const [datapro, setDatapro] = useState(null); // State for storing project 
    const [people,setPeople] = useState(null);

    const [shortlistedusers,setshortlistedusers] = useState(false);

    const[mailsection,setmailsection] = useState(false);
    const [usermaildata,setmailuserdata] = useState(null);
    const [usermailData , setusermaildata] = useState({
        email: usermaildata?.email,
        title: '',
        description: ''
    })

    // Fetch project data based on project ID
    useEffect(() => {
        const getProjectData = async () => {
            try {
                const response = await axios.get(`https://barter-5cky.onrender.com/getproject/${projectid}`, {
                    withCredentials: true
                });

                if (response.data.projectdatapresent) {
                    setDatapro(response.data.projectdatafetched);
                    setPeople(response.data.projectdatafetched.projectofficials.clientsapplied);
                }
            } catch (error) {
                console.error("Error fetching project data:", error);
            }
        };

        getProjectData();
    }, [projectid]);

    const performtask = async()=>{
        const mailsending = await axios.post('https://barter-5cky.onrender.com/sendmail',usermailData,{
            withCredentials:true
        });
        if(mailsending.data.mailsent){
            alert("Mail was successfully sent");
            setmailsection(false);
            return;
        }
        else{
            alert("Some Error occured sending mail");
            return;
        }
    }

    return (
        <>
            <BackButton/>
            {mailsection && <div className="mail-section"><br />
                    <input type="email" value={usermaildata?.email} readOnly/>
                    <input type="text" placeholder="Title*" name="title" id="title"/>
                    <textarea name="description" id="description" placeholder="Enter the content..."></textarea><br />
                    <button onClick={performtask}>Send Mail</button>
            </div>}
            <br/>
            {datapro ? (
                <Joboption data={datapro} userid={userid} />
            ) : (
                <p>Loading project data...</p>
            )}

            {/* pop up for sending mail */}

            <div className="people-applied">
                <JobApplied projectid={projectid} setDatapro={setPeople} setshortlistedusers={setshortlistedusers}/>
                <span style={{color:'red',textAlign: 'center'}}>{people===null?0:people.length} Person Applied</span>
                {people&&people.length>0 && 
                people.map((data,index)=>(
                    <PersonApplied clientid={data?.cliendid} projectid={projectid} setmailsection={setmailsection} setmailuserdata={setmailuserdata} shortlistedusers={shortlistedusers}/>
                ))}
            </div>
        </>
    );
};

export default Peopleapplied;
