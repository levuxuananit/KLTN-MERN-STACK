import Area from '../models/area.js';

// GET ALL AREA
export const getAreasService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await Area.find().select('code value order').lean();
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get areas.',
            response
        })
    } catch (error) {
        reject(error)
    }
})