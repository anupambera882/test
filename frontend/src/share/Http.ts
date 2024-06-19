import axios from "axios";
import Configs from "../config";


axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common["Access-Control-Allow-Methods"] = "DELETE, POST, GET";
axios.defaults.headers.common["Access-Control-Allow-Headers"] = "Content-Type, Authorization, X-Requested-With";
axios.defaults.baseURL = Configs.API_ROOT;

/**
 * @HTTP_WITH_COOKIE is use for request with including cookie in public api 
 */
export const HTTP_WITH_COOKIE = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
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
