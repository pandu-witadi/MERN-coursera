//
//
import axios from 'axios'

import { baseURL } from '../config'

const instance = axios.create({ baseURL: baseURL })

instance.interceptors.response.use( (response) => { return response }, function (error) {
    const originalRequest = error.config
    console.log(originalRequest)

    if (error) {
        if (error.response.status === 401 && originalRequest.url === baseURL + "/auth/token") {
            localStorage.clear()
            window.location.href = '/login'
            return Promise.reject(error)
        }
    }
    return Promise.reject(error);
})

export default instance
