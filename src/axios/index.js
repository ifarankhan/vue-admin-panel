import axios from 'axios';
const BASE_URL = "https://api-v2-genesys2020-staging.genesysonline.net/api/v2/"


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
  