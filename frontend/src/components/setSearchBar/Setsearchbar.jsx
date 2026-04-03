import { useState } from "react";
import {
  GET_PROJECTS_URL,
  GET_PROJECTS_USERID_APPLIED_URL,
  GET_WORKS_URL,
  TYPE_GET,
} from "../../fetchers/constants";
import { pokeBarterForSkillsServer } from "../../fetchers/fetchers";

const Setsearchbar = ({
  setprojectdata,
  setfiltercount,
  userid,
  setstatus,
}) => {
  const [activeTab, setActiveTab] = useState("all");

  const onallclick = () => {
    setActiveTab("all");
    setstatus("all");
    //get all jobs
    const getdata = async () => {
      const options = { withCredentials: true };
      // const projectdata = await axios.get('https://barter-5cky.onrender.com/getworks',{
      const projectData = await pokeBarterForSkillsServer(
        GET_WORKS_URL,
        options,
        TYPE_GET,
      );

      if (projectData.projectdatapresent) {
        //only finding people wors find
        const projectsss = projectData.projectdatafetched.filter(
          (pro) => pro.projectdetails.projectstatusstatus === "findingpeople",
        );
        setprojectdata(projectsss);
        setfiltercount(projectsss.length);
      }
    };
    getdata();
  };

  const onactiveclick = () => {
    setActiveTab("applied");
    setstatus("applied");
    //get jobs
    const getdata = async () => {
      const options = { withCredentials: true };
      //     `https://barter-5cky.onrender.com/getprojects/${userid}`,
      const projectData = await pokeBarterForSkillsServer(
        `${GET_PROJECTS_URL}/${userid}`,
        options,
        TYPE_GET,
      );
      if (projectData.projectfound) {
        setprojectdata(projectData.projectapplied);
        setfiltercount(projectData.projectapplied.length);
      } else {
        setprojectdata([]);
        setfiltercount(0);
      }
    };
    getdata();
  };
  const onshortlisted = async () => {
    setActiveTab("shortlisted");
    setstatus("shortlisted");
    //get jobs
    const getdata = async () => {
      const options = { withCredentials: true };
      // `https://barter-5cky.onrender.com/getprojectuseridapplied/${userid}`,
      const projectData = await pokeBarterForSkillsServer(
        `${GET_PROJECTS_USERID_APPLIED_URL}/${userid}`,
        options,
        TYPE_GET,
      );
      if (projectData.projectfound) {
        setprojectdata(projectData.projectapplied);
        setfiltercount(projectData.projectapplied.length);
      } else {
        setprojectdata([]);
        setfiltercount(0);
      }
    };
    getdata();
  };

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
