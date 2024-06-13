import axios from "axios";
import Configs from "../config";


axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = Configs.API_ROOT;

/**
 * @HTTP_WITH_COOKIE is use for request with including cookie in public api 
 */
export const HTTP_WITH_COOKIE = axios.create({
  withCredentials: true
});

axios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${'zrxtcrybuinomk'}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * @HTTP is use for private access private api end point
 */
const HTTP = axios;

export default HTTP;
