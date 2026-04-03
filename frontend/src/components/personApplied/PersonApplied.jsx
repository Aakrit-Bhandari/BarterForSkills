import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSubscriptionType } from "../../constants/constants";
import { SHORTLIST_URL, TYPE_GET, USER_URL } from "../../fetchers/constants";
import { pokeBarterForSkillsServer } from "../../fetchers/fetchers";
const PersonApplied = ({
  clientid,
  projectid,
  setmailsection,
  setmailuserdata,
  rating,
  setRate,
  setUser,
  setid,
  shortlistedusers,
}) => {
  const navigate = useNavigate();
  const [userdata, setuserdata] = useState(null);

  useEffect(() => {
    const performtask = async () => {
      // `https://barter-5cky.onrender.com/user/${clientid}`,
      const options = { withCredentials: true };
      const getuserData = await pokeBarterForSkillsServer(
        `${USER_URL}/${clientid}`,
        options,
        TYPE_GET,
      );
      if (getuserData.userprofilefound) {
        setuserdata(getuserData.userProfiledata);
      }
    };
    performtask();
  }, []);

  //TODO make a common API contract
  const shortlistuser = async () => {
    // `https://barter-5cky.onrender.com/shortlist/${clientid}/${projectid}`,
    const options = { withCredentials: true };
    const performShortListing = await pokeBarterForSkillsServer(
      `${SHORTLIST_URL}/${clientid}/${projectid}`,
      options,
      TYPE_GET,
    );
    if (performShortListing.userApplied) {
      alert("User Shortlisted Successfully...");
      return;
    }
    alert("User Already Shortlisted...");
  };

  const sendEmailtouser = async () => {
    setmailsection(true);
    setmailuserdata(userdata);
  };
  const rateUser = async () => {
    setRate(true);
    setUser(userdata);
    setid(userdata._id);
  };

  const userSubscription = userdata?.subscription;
  const subscription_type = getSubscriptionType(userSubscription);

  return (
    <div className="small-divs-applied">
      <div className="left-applied">
        <div className="img-logo">
          <img src={userdata?.personaldetails?.profilephoto} alt="img" />
        </div>
        <div className="text-logo">
          <span>{userdata?.personaldetails?.name}</span>
          <br />
          <span style={{ color: "gray" }}>
            Mob No. +91 {userdata?.personaldetails?.conatactno}
          </span>
        </div>
      </div>
      <div className="right-applied">
        <div className="text-right">
          <span style={{ color: "gray" }}>
            UserType:{" "}
            <span style={{ color: "purple" }}>{subscription_type}</span>
          </span>
          <br />
          <span style={{ color: "gray" }}>
            Skills:{" "}
            {userdata?.personaldetails?.skills
              ?.map((skill) => skill.skill)
              ?.join(", ") || "Not provided"}
          </span>
          <br />
          <span style={{ color: "gray" }}>
            Linkedin: {userdata?.personaldetails?.linkedinid}
          </span>
          <br />
          <span style={{ color: "gray" }}>
            Gender: {userdata?.personaldetails?.gender}
          </span>
          <br />
          <span style={{ color: "gray" }}>
            Rating:{" "}
            {userdata?.personaldetails?.rating === null
              ? 0
              : userdata?.personaldetails?.rating}
          </span>
          <br />
          <div style={{ textAlign: "center" }}>
            {!rating && !shortlistedusers && (
              <button onClick={shortlistuser}>Shortlist</button>
            )}
            {rating && <button onClick={rateUser}>Rate User</button>}
            {!rating && !shortlistedusers && <span>&emsp;</span>}
            <button
              onClick={() => navigate(`/barter4skills/${userdata?.username}`)}
            >
              User Profile
            </button>
            &emsp;
            {!rating && shortlistedusers && (
              <button onClick={shortlistuser}>Project Cont.</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonApplied;
