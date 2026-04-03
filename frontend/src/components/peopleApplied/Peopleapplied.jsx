import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  GET_SINGLE_PROJECT_URL,
  SEND_MAIL_URL,
  TYPE_GET,
  TYPE_POST,
} from "../../fetchers/constants.js";
import { pokeBarterForSkillsServer } from "../../fetchers/fetchers.jsx";
import BackButton from "../backButton/Backbutton.jsx";
import JobApplied from "../jobsApplied/JobApplied.jsx";
import Joboption from "../jobsOption/Joboption.jsx";
import PersonApplied from "../personApplied/PersonApplied.jsx";

const Peopleapplied = () => {
  const { userid, projectid } = useParams(); // Get URL parameters
  const [datapro, setDatapro] = useState(null); // State for storing project
  const [people, setPeople] = useState(null);

  const [shortlistedusers, setshortlistedusers] = useState(false);

  const [mailsection, setmailsection] = useState(false);
  const [usermaildata, setmailuserdata] = useState(null);
  const [usermailData, setusermaildata] = useState({
    email: usermaildata?.email,
    title: "",
    description: "",
  });

  // Fetch project data based on project ID
  useEffect(() => {
    const getProjectData = async () => {
      try {
        // `https://barter-5cky.onrender.com/getproject/${projectid}`,
        const options = { withCredentials: true };
        const response = await pokeBarterForSkillsServer(
          `${GET_SINGLE_PROJECT_URL}/${projectid}`,
          options,
          TYPE_GET,
        );

        if (response.projectdatapresent) {
          setDatapro(response.projectdatafetched);
          setPeople(
            response.projectdatafetched.projectofficials.clientsapplied,
          );
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    getProjectData();
  }, [projectid]);

  const performtask = async () => {
    // "https://barter-5cky.onrender.com/sendmail",
    const options = { withCredentials: true, data: usermailData };
    const mailResponse = await pokeBarterForSkillsServer(
      SEND_MAIL_URL,
      options,
      TYPE_POST,
    );
    if (mailResponse.mailsent) {
      alert("Mail was successfully sent");
      setmailsection(false);
      return;
    }
    alert("Some Error occured sending mail");
  };

  return (
    <>
      <BackButton />
      {mailsection && (
        <div className="mail-section">
          <br />
          <input type="email" value={usermaildata?.email} readOnly />
          <input type="text" placeholder="Title*" name="title" id="title" />
          <textarea
            name="description"
            id="description"
            placeholder="Enter the content..."
          ></textarea>
          <br />
          <button onClick={performtask}>Send Mail</button>
        </div>
      )}
      <br />
      {datapro ? (
        <Joboption data={datapro} userid={userid} appliedpage={true} />
      ) : (
        <p>Loading project data...</p>
      )}

      {/* pop up for sending mail */}

      <div className="people-applied">
        <JobApplied
          projectid={projectid}
          setDatapro={setPeople}
          setshortlistedusers={setshortlistedusers}
        />
        <span style={{ color: "red", textAlign: "center" }}>
          {people === null ? 0 : people.length} Person Applied
        </span>
        {people &&
          people.length > 0 &&
          people.map((data, index) => {
            return (
              <PersonApplied
                key={data?.clientid || index}
                clientid={data?.cliendid}
                projectid={projectid}
                setmailsection={setmailsection}
                setmailuserdata={setmailuserdata}
                shortlistedusers={shortlistedusers}
              />
            );
          })}
      </div>
    </>
  );
};

export default Peopleapplied;
