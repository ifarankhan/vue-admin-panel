import axios from 'axios';
const BASE_URL = `${window._env_.VUE_APP_BASE_URL}`;

console.log(BASE_URL)
const instance = axios.create({
    baseURL: BASE_URL
  });

  instance.defaults.headers.common["Content-Type"] = 'application/json';
  // instance.defaults.headers.common["Access-Control-Allow-Origin"] = '*';

  instance.interceptors.response.use(response => {
    return response;
   }, error => {

    return Promise.reject(error)
   });

   export default instance;
