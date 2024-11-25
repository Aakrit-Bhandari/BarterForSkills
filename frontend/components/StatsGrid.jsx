import React, { useEffect, useState } from "react";
import Card from "./Card.jsx";

const StatsGrid = ({ data }) => {
  const [details,setdetails] = useState({
    totalsignups: 0,
    totaljobsposted: 0,
    totalfreelance: 0,
    totalworkproviders: 0
  });


  useEffect(()=>{
    const performtask = ()=>{
        setdetails({
            'totalsignups': data?.userData?.length,
            'totaljobsposted': data?.projectData?.length,
            'totalfreelance': data?.userData.filter((dat) => dat.usertype === "freelance").length,
            'totalworkproviders': data?.userData.filter((dat) => dat.usertype === "workprovider").length
        })
        console.log("this",data);
    }
    performtask();
  },[])
  console.log("this",data);
  console.log("thisdet",details);


  return (
    <>
    {data && 
        <div className="stats-grid">
        <Card title="Total Signups" value={details.totalsignups} />
        <Card title="Total Jobs Posted" value={details.totaljobsposted} />
        <Card title="Total Freelancers" value={details.totalfreelance} />
        <Card title="Total WorkProviders" value={details.totalworkproviders} />
        {/* <Card title="" value={maxJobsByProvider} /> */}
    </div>
    }
    </>
  );
};

export default StatsGrid;
