import axios from 'axios'
axios.defaults.baseURL = 'http://open.duyiedu.com'
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做什么
  config.params = {
    ...config.params,
    appkey: 'leile_1556617731806'
  }
  // console.log(config);
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

export default axios
