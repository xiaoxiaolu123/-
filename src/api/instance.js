import axios from 'axios';
import NProgess from 'nprogress';
import 'nprogress/nprogress.css';

const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 100000,
});

instance.interceptors.request.use(
    (config) => {
        NProgess.start();
        return config;
    },
    (error) => {
        NProgess.done();
        return Promise.reject(error);
    }
);
// 响应拦截器
instance.interceptors.response.use(
    (response) => {
        // 以服务的方式调用的 Loading 需要异步关闭
        NProgess.done();
        return response.data;
    },
    (error) => {
        NProgess.done();
        return Promise.reject(error);
    }
);

export default instance;