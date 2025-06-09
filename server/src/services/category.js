import Category from '../models/category.js';

// GET ALL CATEGORY
export const getCategoriesService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await Category.find().lean();
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get categories.',
            response
        })
    } catch (error) {
        reject(error)
    }
})