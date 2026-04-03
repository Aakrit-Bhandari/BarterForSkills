import axios from "axios";
import { useEffect, useState } from "react";
import BackButton from "../backButton/Backbutton.jsx";
import StatsGrid from "../statsGrid/StatsGrid.jsx";

export default function Admin() {
  const [data, setdata] = useState(null);
  const [recentTask, setrecentTask] = useState([]);
  const [topWorkProviders, setTopWorkProviders] = useState([]);
  const [topFreeLancers, setTopFreeLancers] = useState([]);

  useEffect(() => {
    const getAlldata = async () => {
      const data = await axios.get(
        // "https://barter-5cky.onrender.com/getAlldata/barter4skills",
        "http://localhost:3000/getAlldata/barter4skills",
        {
          withCredentials: true,
        },
      );
      if (data.data.gottotaldata) {
        setdata(data.data.totaldata);
        const sortedTasks = [...data.data.totaldata.projectData]
          .reverse()
          .slice(0, 3);
        setrecentTask(sortedTasks);

        //work
        let count = [];
        data.data.totaldata.projectData.map((proj) => {
          count[proj.projectofficials.ideaproviderid] =
            (count[proj.projectofficials.ideaproviderid] || 0) + 1;
        });

        let sortedCount = Object.entries(count)
          .filter(([, count]) => count > 0) // Filter out undefined or 0 counts
          .sort(([, countA], [, countB]) => countB - countA)
          .slice(0, 3); // Sort in descending order of count

        // Format the sorted data into a readable format (optional)
        let topWorkProviders = sortedCount.map(([id, count]) => {
          const user = data.data.totaldata.userData.find(
            (user) => user._id == id,
          );
          return {
            userData: user,
            id: id,
            count: count,
          };
        });
        setTopWorkProviders(topWorkProviders);

        let countFreeLancers = [];
        data.data.totaldata.userData.map((user) => {
          if (user?.usertype === "freelance") {
            countFreeLancers[user._id] =
              user?.personaldetails?.rating === null
                ? 0
                : user?.personaldetails?.rating;
          }
        });

        let freeLancersCount = Object.entries(countFreeLancers)
          .filter(([, count]) => count >= 0) // Filter out undefined or 0 counts
          .sort(([, countA], [, countB]) => countB - countA)
          .slice(0, 3); // Sort in descending order of count

        // Format the sorted data into a readable format (optional)
        let topFreeLancers = freeLancersCount.map(([id, count]) => {
          const user = data.data.totaldata.userData.find(
            (user) => user._id == id,
          );
          return {
            userData: user,
            id: id,
            count: count,
          };
        });
        setTopFreeLancers(topFreeLancers);
      }
    };
    getAlldata();
  }, []);
  //   console.log("rec",topfreelancers);

  return (
    <>
      <BackButton />
      <div className="back-dashboard">
        <br />
        <div className="dashboard-container">
          <h1
            style={{
              fontSize: "30px",
              textAlign: "center",
              overflow: "hidden",
            }}
          >
            Admin Dashboard
          </h1>
          {data && <StatsGrid data={data} />}
        </div>
        <br />
        <div className="dashboard-container">
          <h1
            style={{
              fontSize: "30px",
              overflow: "hidden",
              textAlign: "center",
            }}
          >
            Recent Jobs Posted
          </h1>
          {recentTask.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>SNo.</th>
                  <th>Job Title</th>
                  <th>Barter(y/n)</th>
                  <th>Skills</th>
                  <th>Location</th>
                  <th>Charges</th>
                </tr>
              </thead>
              <tbody>
                {recentTask.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data.projectdetails.position}</td>
                      <td>{data.projectdetails.bartarsystem}</td>
                      <td>{data.projectdetails.skillsreq.join(", ")}</td>
                      <td>{data.projectdetails.preferedlocation}</td>
                      <td>₹{data.projectdetails.amounttobepaid}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <br />
        <div className="dashboard-container">
          <h1
            style={{
              fontSize: "30px",
              textAlign: "center",
              overflow: "hidden",
            }}
          >
            WorkProviders (Top 3 WorkProviders)
          </h1>
          {topWorkProviders.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>SNo.</th>
                  <th>Username</th>
                  <th>Email Id</th>
                  <th>Contact No</th>
                  <th>Linkedinid</th>
                  <th>Jobs(Count)</th>
                </tr>
              </thead>
              <tbody>
                {topWorkProviders.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data?.userData?.username}</td>
                      <td>{data?.userData?.email}</td>
                      <td>{data?.userData?.personaldetails?.conatactno}</td>
                      <td>{data?.userData?.personaldetails?.linkedinid}</td>
                      <td>{data.count}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <br />
        <div className="dashboard-container">
          <h1
            style={{
              fontSize: "30px",
              textAlign: "center",
              overflow: "hidden",
            }}
          >
            Freelanceers (Top 3 Freelancers Rating)
          </h1>
          {topFreeLancers.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>SNo.</th>
                  <th>Username</th>
                  <th>Email Id</th>
                  <th>Contact No</th>
                  <th>Linkedinid</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {topFreeLancers.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data?.userData?.username}</td>
                      <td>{data?.userData?.email}</td>
                      <td>{data?.userData?.personaldetails?.conatactno}</td>
                      <td>{data?.userData?.personaldetails?.linkedinid}</td>
                      <td>{data.count}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
