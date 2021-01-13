import axios from "axios";
// import { Message } from "element-ui";

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
});

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 打开加载窗口
    // loading.open()

    return config;
  },
  error => {
    // 关闭加载窗口
    // loading.close()
    // 出现异常
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  response => {
    // 关闭加载窗口
    // loading.close()
    // const resp = response.data

    // 后台正常响应的状态，如果不是 2000， 说明后台处理有问题
    // if(resp.code !== 2000) {
    //     Message({
    //         message: resp.message || '系统异常',
    //         type: 'warning',
    //         duration: 5 * 1000
    //     })
    // }

    // return response.data // 可以在这里统一的获取后台响应的数据进行返回，而这里面就没有请求头那些
    return response;
  },
  error => {
    // 关闭加载窗口
    // loading.close()
    // console.log('response.error', error.response.status)
    // Message({
    //     message: error.message,
    //     type: 'error',
    //     duration: 5 * 1000
    // })
    return Promise.reject(error);
  }
);
export default request;
