/**
 * @hmm axios封装使用
 */

import axios from 'axios'
// import {Message} from 'element-ui' @hmm 注释掉Message, 属于VUE组件

// create an axios instance
const service = axios.create({
    baseURL: 'http://building-bos.rickricks.com', // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 60 * 60 * 1000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent
        // config.headers['GATEWAY-TOKEN'] = ''
        config.headers['Authorization'] = sessionStorage.getItem('token')
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response
        // if the custom code is not 20000, it is judged as an error.
        if (res.status !== 200) {
            // @hmm 注释掉Message
            // Message({
            //     message: res.message || 'Error',
            //     type: 'error',
            //     duration: 5 * 1000
            // })

            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            if (res.code === 508 || res.code === 5012 || res.code === 5014) {
                // to re-login
                // MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', '', {
                //     confirmButtonText: 'Re-Login',
                //     cancelButtonText: 'Cancel',
                //     type: 'warning'
                // }).then(() => {
                //     store.dispatch('user/resetToken').then(() => {
                //         location.reload()
                //     })
                // })
            }
            // return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res.data
        }
    },
    error => {
        console.log('err' + error) // for debug
        // @hmm 注释掉Message
        // Message({
        //     message: '网络错误，请稍候重试',
        //     type: 'error',
        //     duration: 5 * 1000
        // })
        return Promise.reject(error)
    }
)

export default service
