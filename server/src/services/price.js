import Price from '../models/price.js';

// GET ALL PRICE
export const getPricesService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await Price.find().select('code value order').lean();
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get prices.',
            response
        })
    } catch (error) {
        reject(error)
    }
})