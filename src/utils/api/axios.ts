import axios from 'axios';
// import { message } from "antd";
import {CANCEL} from "redux-saga";
// import {removeTokenCookie, setTokenCookie, getTokenCookie, getRefreshTokenCookie, setRefreshTokenCookie} from "../context";
// import { apiRefreshToken } from '../store';
import { Cookies } from "react-cookie";
import { COOKIE_KEY } from "../constants/cookie";
// import { LANG_KEY } from "../constants";

const cookies = new Cookies();
const SECONDS = 60
const REQUEST_TIMEOUT = 1000 * SECONDS

const controller = new AbortController();

let promise = axios.create({
  signal: controller.signal,
  timeout: REQUEST_TIMEOUT,
  timeoutErrorMessage: 'timeout',
})

const langMap: Record<string, string> = {
  kk: "kk-KZ",
  ru: "ru-RU",
};

//@ts-ignore
promise[CANCEL] = () => {
  controller.abort();
}

const axiosConfig = promise

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

axiosConfig.interceptors.request.use(
  async (config) => {
    // const lang = cookies.get(COOKIE_KEY.LANG) || LANG_KEY.RU;
    const urlParams = new URLSearchParams(window.location.search);
    const access_token = cookies.get(COOKIE_KEY.ACCESS_TOKEN);
    
    // config.headers['Accept-Language'] = lang === "kk" ? "kk-KZ" : "ru-RU";
    if (access_token) {
      config.headers['Authorization'] = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// axiosConfig.interceptors.response.use(
//   async (config) => {

//     return config
//   },
//   error => {
//     if (error.response.status == '401' || error.response.data.message === 'Время жизни токена закончилось') {
//       removeTokenCookie()
//     }

//     return Promise.reject(error)
//   }
// )
axiosConfig.interceptors.response.use(
  async (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {

        originalRequest._retry = true;
        
        try {
          const refreshToken = getRefreshTokenCookie();
              if (!refreshToken) {
                  console.error('No refresh token found');
                  return Promise.reject(error);
              }
  
              const response = await axios.post('/rest/v1/user/refresh-token', { refresh_token: refreshToken });
              const newToken = response.data.access_token;
              const newRefreshToken = response.data.refresh_token;
              setTokenCookie(newToken);
              setRefreshTokenCookie(newRefreshToken)
              processQueue(null, newToken);
              
              originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
              return axios(originalRequest);
          } catch (refreshError) {
              processQueue(refreshError, null);
              removeTokenCookie();
              return Promise.reject(refreshError);
          }
          return axiosConfig(originalRequest);
      } else {
      return Promise.reject(error);
    }

      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            resolve(axios(originalRequest)); 
          },
          reject: (err: any) => reject(err),
        });
      });
    
    return Promise.reject(error);
  }
);

export default axiosConfig
