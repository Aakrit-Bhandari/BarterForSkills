import axios from "axios";
import { useState } from "react";
import { GET_SINGLE_PROJECT_URL, TYPE_GET } from "../../fetchers/constants";
import { pokeBarterForSkillsServer } from "../../fetchers/fetchers";

const JobApplied = ({ projectid, setDatapro, setshortlistedusers }) => {
  const [activeTab, setActiveTab] = useState("all");

  const onallclick = () => {
    setActiveTab("all");
    //get all jobs
    const getProjectData = async () => {
      try {
        // const response = await axios.get(`https://barter-5cky.onrender.com/getproject/${projectid}`, {
        const response = await axios.get(
          `http://localhost:3000/getproject/${projectid}`,
          {
            withCredentials: true,
          },
        );

        if (response.data.projectdatapresent) {
          setDatapro(
            response.data.projectdatafetched.projectofficials.clientsapplied,
          );
          setshortlistedusers(false);
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    getProjectData();
  };
  const onshortlisted = async () => {
    setActiveTab("shortlisted");
    //get jobs
    const getProjectData = async () => {
      try {
        // const response = await axios.get(`https://barter-5cky.onrender.com/getproject/${projectid}`, {
        // const response = await axios.get(
        //   `http://localhost:3000/getproject/${projectid}`,
        //   {
        //     withCredentials: true,
        //   },
        // );
        const options = { withCredentials: true };
        const response = await pokeBarterForSkillsServer(
          `${GET_SINGLE_PROJECT_URL}/${projectid}`,
          options,
          TYPE_GET,
        );

        if (response.data.projectdatapresent) {
          const changeddata =
            response.data.projectdatafetched.projectofficials.clientid;
          setDatapro(changeddata);
          setshortlistedusers(true);
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    getProjectData();
  };

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
