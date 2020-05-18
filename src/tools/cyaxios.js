import axios from 'axios';
import QS from 'qs';

//设置超时时间
axios.defaults.timeout = 10000;
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//请求携带cookie
axios.defaults.withCredentials = true;

//导出请求的方法
export default function cyaxios(method, url, params) { 
    if ( method.toUpperCase() === "GET" ) {
        return get(url, params);
    }
    else if ( method.toUpperCase() === 'POST' ) {
        return post(url, params);
    }
}

function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, params)
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            reject(err.data)
        })
    })
}

function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params))
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            reject(err.data)
        })
    })
}

//请求的拦截
axios.interceptors.request.use(
    (request) => {
        return request;
    },
    (error) => {
        return Promise.reject(error)
    })

//响应的拦截
axios.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        return Promise.reject(error)
    }
)