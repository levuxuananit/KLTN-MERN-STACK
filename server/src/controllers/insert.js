import * as inserService from '../services/insert.js'

export const insertRoles = async (req, res) => {
    try {
        const response = await inserService.createPricesAndAreas()
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at insert controller: ' + error
        })
    }
}
export const insertPosts = async (req, res) => {
    try {
        const response = await inserService.insertService()
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at insert controller: ' + error
        })
    }
}