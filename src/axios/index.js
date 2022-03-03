import axios from 'axios';
import AppConfig from "@/config/AppConfig";
import store from '../store/index';
const BASE_URL = AppConfig.BASE_URL;
const FRESH_DESK_URL = AppConfig.FRESH_DESK_URL;

// creating custom instances
export const public_url = axios.create()
export const private_url = axios.create()
export const fresh_desk_url = axios.create()

// configure baseURL
private_url.defaults.baseURL = BASE_URL
public_url.defaults.baseURL = BASE_URL
fresh_desk_url.defaults.baseURL = FRESH_DESK_URL


private_url.defaults.headers.common["Content-Type"] = 'application/json';

//define request interceptors
private_url.interceptors.request.use(request => {
  const USER_DATA = JSON.parse(localStorage.getItem('userData'))
  const ACCESS_TOKEN = USER_DATA?.authToken; 
  request.headers['Authorization'] = 'Bearer'.concat(' ', ACCESS_TOKEN);
  return request;
})

//define request interceptors for FreshDesk
fresh_desk_url.interceptors.request.use(request => {
  const ACCESS_TOKEN = btoa("oWa2VnIEYgRheSotZXLq")
  request.headers['Authorization'] = ACCESS_TOKEN;
  return request;
})


private_url.interceptors.response.use(response => {
  return Promise.resolve(response);
}, (error) => {
  let res = error.response;
  if (res) {
      if(res?.status === 401){
          store.dispatch('auth/logoutAction','login');
      }
  } 
  return Promise.reject(error);
})
