import axios from "axios";
import { Toast } from "zarm";

const MODE = import.meta.env.MODE;

const axiosIns = axios.create({
    baseURL: MODE === 'development' ? '/api' : 'http://api.chennick.wang',
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': `${localStorage.getItem('token') || null}`
    },
    withCredentials: true,
    timeout: 5000,
})

axiosIns.interceptors.response.use(res => {
    if (typeof res.data !== 'object') {
        Toast.show('服务端异常！')
        return Promise.reject(res)
    }
    if (res.data.code != 200) {
        if (res.data.msg) Toast.show(res.data.msg)
        if (res.data.code == 401) {
            // window.location.href = '/login'
        }
        return Promise.reject(res.data)
    }

    return res.data
})

export default axiosIns;