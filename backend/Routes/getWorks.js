import Projectsmodel from "../models/Projects.js";
import response from "../response.js";

const getWorks = async (req, res) => {
    const resData = { ...response };
    try {
        const userResponse = await Projectsmodel.find();

        resData.projectdatapresent = userResponse.length > 0;
        resData.projectdatafetched = userResponse;
        return res.status(200).json(resData);
    } catch (error) {
        resData.projectdatapresent = false;
        resData.message = "An error occurred while fetching projects";
        resData.error = error.message;
        return res.status(500).json(resData);
    }
}

export default getWorks;
