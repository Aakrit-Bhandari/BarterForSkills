import { useEffect, useState } from "react";
import Card from "../card/Card.jsx";

const StatsGrid = ({ data }) => {
  const [details, setdetails] = useState({
    totalsignups: 0,
    totaljobsposted: 0,
    totalfreelance: 0,
    totalworkproviders: 0,
    basicworkproviders: 0,
    proworkproviders: 0,
    propremworkproviders: 0,
    basicfreelancers: 0,
    profreelancers: 0,
    propremfreelancers: 0,
  });

  useEffect(() => {
    const performtask = () => {
      setdetails({
        totalsignups: this.data?.userData?.length,
        totaljobsposted: this.data?.projectData?.length,
        totalfreelance: this.data?.userData.filter(
          (dat) => dat.usertype === "freelance",
        ).length,
        totalworkproviders: this.data?.userData.filter(
          (dat) => dat.usertype === "workprovider",
        ).length,
        basicworkproviders: this.data?.userData.filter(
          (dat) =>
            dat.usertype === "workprovider" &&
            dat.subscription === "workprovider-basic",
        ).length,
        proworkproviders: this.data?.userData.filter(
          (dat) =>
            dat.usertype === "workprovider" &&
            dat.subscription === "workprovider-mid",
        ).length,
        propremworkproviders: this.data?.userData.filter(
          (dat) =>
            dat.usertype === "workprovider" &&
            dat.subscription === "workprovider-adv",
        ).length,
        basicfreelancers: this.data?.userData.filter(
          (dat) =>
            dat.usertype === "freelance" &&
            dat.subscription === "freelance-basic",
        ).length,
        profreelancers: this.data?.userData.filter(
          (dat) =>
            dat.usertype === "freelance" &&
            dat.subscription === "freelance-mid",
        ).length,
        propremfreelancers: this.data?.userData.filter(
          (dat) =>
            dat.usertype === "freelance" &&
            dat.subscription === "freelance-adv",
        ).length,
      });
      console.log("this", this.data);
    };
    performtask();
  }, []);
  console.log("this", this.data);
  console.log("thisdet", details);

  return (
    <>
      {data && (
        <div className="stats-grid">
          <Card title="Total Signups" value={details.totalsignups} />
          <Card title="Total Jobs Posted" value={details.totaljobsposted} />
          <Card title="Total Freelancers" value={details.totalfreelance} />
          <Card
            title="Total WorkProviders"
            value={details.totalworkproviders}
          />
          <Card
            title="Basic Plan Workproviders"
            value={details.basicworkproviders}
          />
          <Card
            title="Pro Plan Workproviders"
            value={details.proworkproviders}
          />
          <Card
            title="Pro Premium Plan Workpro."
            value={details.propremworkproviders}
          />
          <Card
            title="Basic Plan Freelancers"
            value={details.basicfreelancers}
          />
          <Card title="Pro Plan Freelancers" value={details.profreelancers} />
          <Card
            title="Pro Premium Plan Freelancers"
            value={details.propremfreelancers}
          />
          {/* <Card title="" value={maxJobsByProvider} /> */}
        </div>
      )}
    </>
  );
};

export default StatsGrid;
