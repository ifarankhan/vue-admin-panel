import axios from 'axios';
import AppConfig from "@/config/AppConfig";
const BASE_URL = AppConfig.BASE_URL;

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
