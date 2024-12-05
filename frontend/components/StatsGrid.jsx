import React, { useEffect, useState } from "react";
import Card from "./Card.jsx";

const StatsGrid = ({ data }) => {
  const [details,setdetails] = useState({
    totalsignups: 0,
    totaljobsposted: 0,
    totalfreelance: 0,
    totalworkproviders: 0,
    basicworkproviders:0,
    proworkproviders:0,
    propremworkproviders:0,
    basicfreelancers:0,
    profreelancers:0,
    propremfreelancers:0
  });


  useEffect(()=>{
    const performtask = ()=>{
        setdetails({
            'totalsignups': data?.userData?.length,
            'totaljobsposted': data?.projectData?.length,
            'totalfreelance': data?.userData.filter((dat) => dat.usertype === "freelance").length,
            'totalworkproviders': data?.userData.filter((dat) => dat.usertype === "workprovider").length,
            'basicworkproviders': data?.userData.filter((dat) => dat.usertype === "workprovider" && dat.subscription === "workprovider-basic").length,
            'proworkproviders': data?.userData.filter((dat) => dat.usertype === "workprovider" && dat.subscription === "workprovider-mid").length,
            'propremworkproviders': data?.userData.filter((dat) => dat.usertype === "workprovider" && dat.subscription === "workprovider-adv").length,
            'basicfreelancers': data?.userData.filter((dat) => dat.usertype === "freelance" && dat.subscription === "freelance-basic").length,
            'profreelancers': data?.userData.filter((dat) => dat.usertype === "freelance" && dat.subscription === "freelance-mid").length,
            'propremfreelancers': data?.userData.filter((dat) => dat.usertype === "freelance" && dat.subscription === "freelance-adv").length,
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
        <Card title="Basic Plan Workproviders" value={details.basicworkproviders} />
        <Card title="Pro Plan Workproviders" value={details.proworkproviders} />
        <Card title="Pro Premium Plan Workpro." value={details.propremworkproviders} />
        <Card title="Basic Plan Freelancers" value={details.basicfreelancers} />
        <Card title="Pro Plan Freelancers" value={details.profreelancers} />
        <Card title="Pro Premium Plan Freelancers" value={details.propremfreelancers} />
        {/* <Card title="" value={maxJobsByProvider} /> */}
    </div>
    }
    </>
  );
};

export default StatsGrid;
