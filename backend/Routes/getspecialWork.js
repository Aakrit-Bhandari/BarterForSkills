import Projectsmodel from "../models/Projects.js";
import response from "../response.js";

const getspecialWork = async (req, res) => {
    const resData = { ...response };
    const userSkill = req.params.skill;
    const bartertrue = req.params.barter;

    try {

        const getskillData = await Projectsmodel.find({
            'projectdetails.skillsreq': { $in: [userSkill] },
            'projectdetails.bartarsystem': bartertrue
        });

        if (getskillData.length > 0) {
            resData.projectdatapresent = true;
            resData.projectdatafetched = getskillData;
            return res.status(200).json(resData);
        } else {
            resData.projectdatapresent = false;
            resData.message = "Data not found";
            return res.status(200).json(resData);
        }
    } catch (error) {
        resData.projectdatapresent = false;
        resData.message = "An error occurred while fetching the project.";
        resData.error = error.message;
        return res.status(500).json(resData);
    }
}

export default getspecialWork;
