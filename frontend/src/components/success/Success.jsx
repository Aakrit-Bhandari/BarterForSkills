import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SUBSCRIPTION_URL, TYPE_GET } from "../../fetchers/constants";
import { pokeBarterForSkillsServer } from "../../fetchers/fetchers";

const Success = () => {
  const { userId, subscriptiontype, username, usertype } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const makeChangestodb = async (userId, subscriptiontype) => {
      // const getResponse =
      //   // await axios.get(`https://barter-5cky.onrender.com/subscription/${userId}/${subscriptiontype}`,{
      //   await axios.get(
      //     `http://localhost:3000/subscription/${userId}/${subscriptiontype}`,
      //     {
      //       withCredentials: true,
      //     },
      //   );
      const options = { withCredentials: true };
      const response = await pokeBarterForSkillsServer(
        `${SUBSCRIPTION_URL}/${userId}/${subscriptiontype},${options},${TYPE_GET}`,
      );
      if (response.subscriptionchanged) {
        if (usertype === "freelance") {
          navigate(`/welcome/freelance/in23x/${username}`);
        } else {
          navigate(`/welcome/workprovider/wpd78x/${username}`);
        }
        return;
      } else {
        alert(`Some error occured. Try after sometime or contact us.`);
        return;
      }
    };
    makeChangestodb(userId, subscriptiontype);
  }, []);
  return (
    <>
      <span>
        Success🎉. You upgraded your plan to ${subscriptiontype}. Redirecting
        back to home page....
      </span>
    </>
  );
};

export default Success;
