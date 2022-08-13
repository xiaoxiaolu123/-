/*
    1. 配置请求的url
    2. 加遮罩
    3. 对数据或者异常进行统一处理
*/
import axios from 'axios';
import { Loading } from 'element-ui';
import NProgess from 'nprogress';
import 'nprogress/nprogress.css';
// 创建好实例
// console.log(process.env);
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 100000,
});

// 配置拦截器
// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    NProgess.start({

    });
    // Loading
    let token = localStorage.getItem('admin-token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
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
    // Loading.close();
    return response.data;
  },
  (error) => {
    NProgess.done();
    // Loading.close();
    return Promise.reject(error);
  }
);

export default instance;
