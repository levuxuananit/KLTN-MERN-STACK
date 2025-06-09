import axiosConfig from '../axiosConfig'
import axios from 'axios'

export const apiGetPosts = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/post/all',
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiGetPostsLimit = (query) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/post/limit`,
            params: query
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiGetNewPosts = (params) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/post/new-post`,
            params
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiUploadImages = (images) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'post',
            url: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload/`,
            data: images,
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiCreatePost = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `/api/v1/post/create-new`,
            data: payload,
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiGetPostsLimitAdmin = (query) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/post/limit-admin`,
            params: query
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiUpdatePost = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: `/api/v1/post/update`,
            data: payload
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiDeletePost = (postId) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url: `/api/v1/post/delete`,
            params: { postId }
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiRequestExpired = (data) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `/api/v1/post/request-expired`,
            data
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiRatings = (data) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `/api/v1/post/ratings`,
            data
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiGetPost = (pid) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/post/one?pid=${pid}`,
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiCreateComment = (data) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `/api/v1/comment`,
            data
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiUpdateWishlist = (data) => axiosConfig({
    url: 'api/v1/post/wishlist',
    method: 'post',
    data
})
export const apiGetExpireds = (params) => axiosConfig({
    url: 'api/v1/post/get-exp',
    method: 'get',
    params
})
export const apiPlusExpired = (data) => axiosConfig({
    url: 'api/v1/post/plus',
    method: 'put',
    data
})
export const apiReportPost = (data) => axiosConfig({
    url: 'api/v1/post/report',
    method: 'post',
    data
})
export const apiGetReports = (params) => axiosConfig({
    url: 'api/v1/post/get-rp',
    method: 'get',
    params
})
export const apiGetReportsAdmin = (params) => axiosConfig({
    url: 'api/v1/post/get-rp-admin',
    method: 'get',
    params
})
export const apiUpdateReport = (data) => axiosConfig({
    url: 'api/v1/post/update-rp',
    method: 'put',
    data
})
export const apiUpdateReportPaypal = (data) => axiosConfig({
    url: 'api/v1/post/update-rp/host',
    method: 'put',
    data
})
export const apiRemoveReport = (rid) => axiosConfig({
    url: 'api/v1/post/remove-rp',
    method: 'delete',
    params: { rid }
})
export const apiGetDashboard = (params) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/post/dashboard',
            params
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiGetWishlist = () => axiosConfig({
    url: 'api/v1/post/wishlist',
    method: 'get',
})
export const apiSeenReport = () => axiosConfig({
    url: 'api/v1/post/seen-rp',
    method: 'put',
})
export const apiChangeRented = (data, pid) => axiosConfig({
    url: 'api/v1/post/rented/' + pid,
    method: 'put',
    data
})