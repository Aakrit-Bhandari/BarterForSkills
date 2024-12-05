import React, { useState, useEffect } from "react";
import StatsGrid from "../components/StatsGrid.jsx";
import axios from "axios";
import Tasks from "../components/Tasks.jsx";
import Joboption from "../components/Joboption.jsx";
import BackButton from "../components/Backbutton.jsx";

const Admin = () => {
  const [data,setdata] = useState(null);
  const [recenttask,setrecenttask] = useState([]);
  const admin = true;
  const [topWorkProviders, setTopWorkProviders] = useState([]);
  const [topfreelancers,settopfreelancers] = useState([]);

  useEffect(()=>{
    const getAlldata = async()=>{
        const data = await axios.get('http://localhost:5000/getAlldata/barter4skills',{
            withCredentials:true
        });
        if(data.data.gottotaldata){
            setdata(data.data.totaldata);
            const sortedTasks = [...data.data.totaldata.projectData]
            .reverse().slice(0, 3);
            setrecenttask(sortedTasks);

            //work
            let count = [];
            data.data.totaldata.projectData.map((proj)=>{
                count[proj.projectofficials.ideaproviderid] = (count[proj.projectofficials.ideaproviderid]||0)+1;
            })
            
            let sortedCount = Object.entries(count)
            .filter(([id, count]) => count > 0) // Filter out undefined or 0 counts
            .sort(([, countA], [, countB]) => countB - countA).slice(0,3); // Sort in descending order of count

            // Format the sorted data into a readable format (optional)
            let topProviders = sortedCount.map(([id, count]) => {
                const user = data.data.totaldata.userData.find((user)=>user._id==id);
                return{
                    userData: user,
                    id: id,
                    count: count
                }
            });
            setTopWorkProviders(topProviders);

            let countfreelance = [];
            data.data.totaldata.userData.map((user)=>{
                if(user?.usertype === "freelance"){
                    countfreelance[user._id] = user?.personaldetails?.rating === null ? 0 :user?.personaldetails?.rating;
                }
            })
            
            let freelancecount = Object.entries(countfreelance)
            .filter(([id, count]) => count >= 0) // Filter out undefined or 0 counts
            .sort(([, countA], [, countB]) => countB - countA).slice(0,3); // Sort in descending order of count

            // Format the sorted data into a readable format (optional)
            let topfreelancers = freelancecount.map(([id, count]) => {
                const user = data.data.totaldata.userData.find((user)=>user._id==id);
                return{
                    userData: user,
                    id: id,
                    count: count
                }
            });
            settopfreelancers(topfreelancers);
        }
    }
    getAlldata();
  },[])
//   console.log("rec",topfreelancers);
  

  return (
    <>
        <BackButton/>
        <div className="back-dashboard">
            <br />
            <div className="dashboard-container">
                <h1 style={{fontSize:'30px',textAlign:'center',overflow:'hidden'}}>Admin Dashboard</h1>
                {data && <StatsGrid data={data} />}
            </div><br />
            <div className="dashboard-container">
                <h1 style={{fontSize:'30px',overflow:'hidden',textAlign:'center'}}>Recent Jobs Posted</h1>
                {
                    recenttask.length>0 &&
                    <table>
                        <thead>
                            <tr>
                                <th>SNo.</th>
                                <th>Job Title</th>
                                <th>Barter(y/n)</th>
                                <th>Skills</th>
                                <th>Location</th>
                                <th>Charges</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                recenttask.map((data,index)=>{
                                    return <tr>
                                        <td>{index+1}</td>
                                        <td>{data.projectdetails.position}</td>
                                        <td>{data.projectdetails.bartarsystem}</td>
                                        <td>{data.projectdetails.skillsreq.join(", ")}</td>
                                        <td>{data.projectdetails.preferedlocation}</td>
                                        <td>₹{data.projectdetails.amounttobepaid}</td>
                                    </tr>;
                                })
                            }
                        </tbody>
                    </table>
                }
            </div><br />
            <div className="dashboard-container">
                <h1 style={{fontSize:'30px',textAlign:'center',overflow:'hidden'}}>WorkProviders (Top 3 WorkProviders)</h1>
                {
                    topWorkProviders.length>0 &&
                    <table>
                        <thead>
                            <tr>
                                <th>SNo.</th>
                                <th>Username</th>
                                <th>Email Id</th>
                                <th>Contact No</th>
                                <th>Linkedinid</th>
                                <th>Jobs(Count)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                topWorkProviders.map((data,index)=>{
                                    return <tr>
                                        <td>{index+1}</td>
                                        <td>{data?.userData?.username}</td>
                                        <td>{data?.userData?.email}</td>
                                        <td>{data?.userData?.personaldetails?.conatactno}</td>
                                        <td>{data?.userData?.personaldetails?.linkedinid}</td>
                                        <td>{data.count}</td>
                                    </tr>;
                                })
                            }
                        </tbody>
                    </table>
                }
            </div><br />
            <div className="dashboard-container">
                <h1 style={{fontSize:'30px',textAlign:'center',overflow:'hidden'}}>Freelanceers (Top 3 Freelancers Rating)</h1>
                {
                    topfreelancers.length>0 &&
                    <table>
                        <thead>
                            <tr>
                                <th>SNo.</th>
                                <th>Username</th>
                                <th>Email Id</th>
                                <th>Contact No</th>
                                <th>Linkedinid</th>
                                <th>Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                topfreelancers.map((data,index)=>{
                                    return <tr>
                                        <td>{index+1}</td>
                                        <td>{data?.userData?.username}</td>
                                        <td>{data?.userData?.email}</td>
                                        <td>{data?.userData?.personaldetails?.conatactno}</td>
                                        <td>{data?.userData?.personaldetails?.linkedinid}</td>
                                        <td>{data.count}</td>
                                    </tr>;
                                })
                            }
                        </tbody>
                    </table>
                }
            </div>
        </div>
    </>
  );
};

export default Admin;
