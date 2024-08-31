import response from "../response.js";
import Projectsmodel from "../models/Projects.js";

const editproject = async(req, res) => {
    const userResponse = {...response};
    const userProject = req.params.id; 
    const userData = req.body;

    try {
        const findProject = await Projectsmodel.findOne({
            _id: userProject
        });

        if (findProject) {
            const makechanges = await Projectsmodel.findByIdAndUpdate(
                findProject._id,  
                userData, 
                { new: true } 
            );

            userResponse.projectedited = true;
            userResponse.projectdatafetched = makechanges;
            return res.status(200).json(userResponse);
        } else {
            userResponse.projectedited = false;
            userResponse.error = "Project not found";
            return res.status(404).json(userResponse);
        }
    } catch (error) {
        userResponse.projectedited = false;
        userResponse.error = error.message;
        userResponse.message = "error occured";
        return res.status(500).json(userResponse);
    }
}

export default editproject;
