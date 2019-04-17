const axios = require('axios');
import router from '../router';
import { alert } from '@/notification';
import config from '@/config';
import { Indicator } from 'mint-ui';
import store from '@/store';

const startLoading = function () {
  Indicator.open();
}

const endLoading = function () {
  Indicator.close();
}

const setToken = function (token) {
  axios.defaults.headers.common['token'] = token;
  localStorage.setItem('token', token);
}

const resetLoading = () => {
  store.commit('resetLoading');
}

axios.defaults.baseURL = config.baseURL;
axios.defaults.headers.common['token'] = localStorage.getItem("token") || "";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 8000;

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  startLoading();
  return config;
}, function (error) {
  // Do something with request error
  endLoading();
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  endLoading();
  return response;
}, function (error) {
  // Do something with response error
  endLoading();
  resetLoading();
  const { code } = error;
  if (code) {
    alert("请求超时，请检查网络连接");
  }
  if (error && error.response) {
    const { status, data: { msg } } = error.response;
    if (status === 401) {
      router.replace('/signin');
      store.commit('resetAll');
    }
    if (status >= 400 && status < 500)
      alert(msg);
    if (status >= 500)
      alert("哎呀，服务器开小差了");
  }
  return Promise.reject(error);
});

export default axios;
export {
  // setRouter,
  setToken
};