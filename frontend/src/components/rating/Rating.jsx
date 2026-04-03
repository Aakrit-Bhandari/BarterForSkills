import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  GET_SINGLE_PROJECT_URL,
  RATE_PROJECT_URL,
  TYPE_GET,
  TYPE_POST,
} from "../../fetchers/constants";
import { pokeBarterForSkillsServer } from "../../fetchers/fetchers";
import BackButton from "../backButton/Backbutton.jsx";
import Joboption from "../jobsOption/Joboption.jsx";
import PersonApplied from "../personApplied/PersonApplied.jsx";

const Rating = () => {
  const { userid, projectid } = useParams();
  const [projectdata, setprojectdata] = useState(null);
  const [people, setPeople] = useState([]);
  const [rating, setRating] = useState(true);
  const [rate, setRate] = useState(false);
  const [user, setUser] = useState(null);
  const [id, setid] = useState(null);
  const [userdata, setuserdata] = useState({
    clientid: id,
    rating: "0",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const options = { withCredentials: true };
        const data = await pokeBarterForSkillsServer(
          `${GET_SINGLE_PROJECT_URL}/${projectid}`,
          options,
          TYPE_GET,
        );
        // `https://barter-5cky.onrender.com/getproject/${projectid}`,
        if (data.projectdatapresent) {
          setprojectdata(data.projectdatafetched);
          setPeople(data.projectdatafetched.projectofficials.clientid || []);
        }
      } catch (error) {
        console.error("Error fetching project data", error);
      }
    };
    getData();
  }, [projectid]);

  const performtask = async () => {
    try {
      setuserdata((olddata) => ({
        ...olddata,
        clientid: id,
      }));
      // `https://barter-5cky.onrender.com/rateproject/${id}`,
      const options = { withCredentials: true, data: userdata };
      const response = await pokeBarterForSkillsServer(
        `${RATE_PROJECT_URL}/${id}`,
        options,
        TYPE_POST,
      );
      if (response.ratingmade) {
        alert("Rating made");
        setRate(false);
      } else {
        alert("Some error occurred. Try again after some time.");
      }
      console.log("Rating submitted successfully:", response);
    } catch (error) {
      console.error("Error submitting rating", error);
    }
  };

  return (
    <>
      <BackButton />
      {rate && (
        <div className="rating-inc">
          <div className="top-rating">
            <img
              src={
                user?.personaldetails?.profilephoto || "/default-profile.png"
              }
              alt="Profile"
            />
            <br />
            <span>{user?.username}</span>
          </div>
          <div className="bottom-rating">
            <select
              name="rating"
              id="rating"
              value={userdata.rating}
              onChange={(e) =>
                setuserdata((prev) => ({
                  ...prev,
                  rating: e.target.value,
                }))
              }
            >
              <option value="*">Rate*</option>
              <option value="0">0</option>
              <option value="1">⭐</option>
              <option value="2">⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="5">⭐⭐⭐⭐⭐</option>
            </select>
            <button onClick={performtask}>Continue</button>
          </div>
        </div>
      )}
      <br />
      {projectdata && (
        <Joboption data={projectdata} userid={userid} ratepage={true} />
      )}
      <br />
      <div style={{ textAlign: "center" }}>
        <span style={{ color: "red", textAlign: "center" }}>
          {people?.length || 0} Person completed your task.
        </span>
      </div>
      {people
        ? people.map((data, index) => {
            return (
              <PersonApplied
                key={data?.cliendid || index}
                clientid={data?.cliendid || "default-client-id"}
                projectid={projectid}
                rating={rating}
                setRate={setRate}
                setUser={setUser}
                setid={setid}
              />
            );
          })
        : null}
    </>
  );
};

export default Rating;
