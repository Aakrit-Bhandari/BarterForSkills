import Projectsmodel from "../models/Projects.js";
import response from "../response.js";

const getWorks = async (req, res) => {
    const resData = { ...response };
    try {
        const userResponse = await Projectsmodel.find();

        if (userResponse && userResponse.length > 0) {
            resData.projectdatapresent = true;
            resData.projectdatafetched = userResponse;
            return res.status(200).json(resData);
        } else {
            resData.projectdatapresent = false;
            resData.message = "No projects found";
            return res.status(404).json(resData);
        }
    } catch (error) {
        resData.projectdatapresent = false;
        resData.message = "An error occurred while fetching projects";
        resData.error = error.message;
        return res.status(500).json(resData);
    }
}

export default getWorks;
