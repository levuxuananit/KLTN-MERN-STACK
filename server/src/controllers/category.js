import * as services from '../services/category.js';
import Visited from '../models/visited.js'; // Import the Visited model

export const getCategories = async (req, res) => {
    try {
        const response = await services.getCategoriesService();
        const userId = req.body?.uid || 'anon';

        // Check if a Visited record exists for the user
        const rs = await Visited.findOne({ uid: userId });

        if (rs) {
            // Increment the 'times' field by 1
            await Visited.updateOne({ uid: userId }, { $inc: { times: 1 } });
        } else {
            // Create a new Visited record for the user
            await Visited.create({ uid: userId, times: 1 });
        }

        return res.status(200).json(response);

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at category controller: ' + error.message,
        });
    }
};
