import axios from 'axios';
const BASE_URL = process.env.VUE_APP_I18N_FALLBACK_LOCALE


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
