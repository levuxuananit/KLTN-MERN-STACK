import axios from '../axiosConfig'

export const apiGetCurrent = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/v1/user/get-current',
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiUpdateUser = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'put',
            url: '/api/v1/user/',
            data: payload
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiGetUsers = (params) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/v1/user/',
            params
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiGetRoles = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/v1/user/roles',
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiUpdateUserByAdmin = (uid, data) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'put',
            url: '/api/v1/user/' + uid,
            data
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiDeleteUser = (uid) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'delete',
            url: '/api/v1/user/' + uid,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiForgotPassword = (data) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'post',
            url: '/api/v1/user/forgotpassword',
            data
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiResetPass = (data) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'post',
            url: '/api/v1/user/resetpassword',
            data
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
