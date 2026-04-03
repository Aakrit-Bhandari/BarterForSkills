import { useEffect } from "react";
import { GET_PROJECTS_ALL_URL, TYPE_GET } from "../../fetchers/constants";
import { pokeBarterForSkillsServer } from "../../fetchers/fetchers";

const Projectsadded = ({ setprojectdata, setfiltercount, userid }) => {
  useEffect(() => {
    const getdata = async () => {
      // const projectdata = await axios.get(`https://barter-5cky.onrender.com/getprojects-all/${userid}`,{
      const options = { withCredentials: true };
      const projectData = await pokeBarterForSkillsServer(
        `${GET_PROJECTS_ALL_URL}/${userid}`,
        options,
        TYPE_GET,
      );
      if (projectData.projectfound) {
        setprojectdata(projectData.projectdatafetched);
      }
    };
    getdata();
  }, []);
  return (
    <>
      <div></div>
    </>
  );
};

export default Projectsadded;
