import Province from '../models/province.js';

// GET ALL PROVINCE
export const getProvincesService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await Province.find().select('code value').lean();
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get provinces.',
            response
        })
    } catch (error) {
        reject(error)
    }
})