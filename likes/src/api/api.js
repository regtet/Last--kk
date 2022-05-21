import axios from "axios";
const api = axios.create({
  baseURL: "http://www.ysqorz.top:8888/api/private/v1/",
  Timeout: 5000,
});
api.interceptors.request.use((config) => {
  config.headers.Authorization = sessionStorage.getItem("token");
  return config;
}),
  (err) => {
    Promise.reject(err);
  };
api.interceptors.response.use((res) => {
  return Promise.resolve(res);
}),
  (err) => {
    Promise.reject(err);
  };
export default api;
