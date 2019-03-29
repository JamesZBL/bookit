const axios = require('axios');
import router from '../router';
import { alert } from '@/notification';

// const setRouter = function (router) {
//   $router = router;
// }

const setToken = function (token) {
  axios.defaults.headers.common['token'] = token;
  localStorage.setItem('token', token);
}

axios.defaults.baseURL = 'http://192.168.1.2:8080';
axios.defaults.headers.common['token'] = localStorage.getItem("token") || "";
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  if (error && error.response) {
    const { status, data: { msg } } = error.response;
    if (status === 401)
      router.replace('/signin');
    if (status >= 400 && status < 500)
      alert(msg);
    if (status >= 500)
      alert(msg || "服务器内部错误");
  }
  return Promise.reject(error);
});

export default axios;
export {
  // setRouter,
  setToken
};