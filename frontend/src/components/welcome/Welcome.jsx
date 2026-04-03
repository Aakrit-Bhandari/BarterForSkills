import { useContext, useEffect, useState } from "react";
import { GET_WORKS_URL, TYPE_GET } from "../../fetchers/constants";
import { pokeBarterForSkillsServer } from "../../fetchers/fetchers";
import { UserStore } from "../../store/UserStore";
import Jobdisplay from "../jobDisplay/Jobdisplay";
import EmployeeNavbar from "../navbars/EmployeeNavbar";
import Searchconsole from "../searchConsole/Searchconsole";
import Setsearchbar from "../setSearchBar/Setsearchbar";
import SetWorkprovderbar from "../setWorkProviderBar/SetWorkprovderbar";

const Welcome = () => {
  const { userData } = useContext(UserStore);
  const [projectdata, setprojectdata] = useState([]);
  const [filtercount, setfiltercount] = useState(0);

  const [uploadprojects, setuploaded] = useState([]);
  const [uploadcount, setuploadcount] = useState(0);

  const [status, setstatus] = useState("all");

  const [worker, setworker] = useState(true);
  //get project data
  useEffect(() => {
    const getdata = async () => {
      // const projectdata = await axios.get(
      //   // "https://barter-5cky.onrender.com/getworks",
      //   "http://localhost:3000/getworks",
      //   {
      //     withCredentials: true,
      //   },
      // );
      const options = { withCredentials: true };
      const projectData = await pokeBarterForSkillsServer(
        GET_WORKS_URL,
        options,
        TYPE_GET,
      );
      if (projectData.projectdatapresent) {
        //only finding people wors find
        const projects = projectData.projectdatafetched.filter(
          (pro) => pro.projectdetails.projectstatusstatus === "findingpeople",
        );
        setprojectdata(projects);
      }
    };
    getdata();
  }, []);
  //employeeNavbar should use useContext
  return (
    <div className="welcome-box">
      {userData.userData.usertype === "freelance" ? (
        <div>
          <EmployeeNavbar />
          <Searchconsole
            setprojectdata={setprojectdata}
            setfiltercount={setfiltercount}
          />
          <Setsearchbar
            setprojectdata={setprojectdata}
            setfiltercount={setfiltercount}
            userid={userData._id}
            setstatus={setstatus}
          />
          <Jobdisplay
            projectdata={projectdata}
            filtercount={filtercount}
            worker={worker}
            userid={userData._id}
            status={status}
          />
        </div>
      ) : null}
      {userData.userData.usertype === "workprovider" ? (
        <div>
          <EmployeeNavbar worker={worker} />
          {/* display jobs that are posted by this user */}
          {/* <Projectsadded setprojectdata={setuploaded} setfiltercount={setuploadcount} userid={localstoragedata?.userData?._id}/> */}
          <SetWorkprovderbar
            setprojectdata={setuploaded}
            setfiltercount={setuploadcount}
            userid={userData._id}
          />
          <Jobdisplay
            projectdata={uploadprojects}
            filtercount={uploadcount}
            worker={!worker}
            userid={userData._id}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Welcome;
