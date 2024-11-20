import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Joboption from "../components/Joboption";
import PersonApplied from "../components/PersonApplied";

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
    console.log("this",id);
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await axios.get(
                    `http://localhost:5000/getproject/${projectid}`,
                    { withCredentials: true }
                );
                if (data.data.projectdatapresent) {
                    setprojectdata(data.data.projectdatafetched);
                    setPeople(data.data.projectdatafetched.projectofficials.clientid || []);
                }
            } catch (error) {
                console.error("Error fetching project data", error);
            }
        };
        getData();
    }, [projectid]);

    const performtask = async () => {
        try {
            setuserdata((olddata)=>({
                ...olddata,
                clientid: id
            }))
            const response = await axios.post(
                `http://localhost:5000/rateproject/${id}`,
                userdata,
                { withCredentials: true }
            );
            if (response.data.ratingmade) {
                alert("Rating made");
                setRate(false);
            } else {
                alert("Some error occurred. Try again after some time.");
            }
            console.log("Rating submitted successfully:", response.data);
        } catch (error) {
            console.error("Error submitting rating", error);
        }
    };

    return (
        <>
            {rate && (
                <div className="rating-inc">
                    <div className="top-rating">
                        <img
                            src={user?.personaldetails?.profilephoto || "/default-profile.png"}
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
            {projectdata && <Joboption data={projectdata} userid={userid} />}
            <br />
            <div style={{ textAlign: "center" }}>
                <span style={{ color: "red", textAlign: "center" }}>
                    {people?.length || 0} Person completed your task.
                </span>
            </div>
            {people &&
                people.map((data, index) => (
                    <PersonApplied
                        key={data?.cliendid || index}
                        clientid={data?.cliendid || 'default-client-id'}
                        projectid={projectid}
                        rating={rating}
                        setRate={setRate}
                        setUser={setUser}
                        setid={setid}
                    />
                ))}
        </>
    );
};

export default Rating;
