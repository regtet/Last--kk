import axios from "axios";
import init from "./init";
import { Message } from "element-ui";
const api = axios.create({
    baseURL: init.prod.baseURL,
    timeout: 5000,
});
api.interceptors.request.use(
    (config) => {
        config.headers.Authorization = sessionStorage.getItem("token");
        return config;
    },
    (error) => Promise.reject(error)
);
api.interceptors.response.use(
    (res) => {
        const {
            meta: { msg, status },
            data: result,
        } = res.data;
        const ok = [200, 201, 204];
        console.log(res);

        if (ok.includes(status)) {
            Message({
                message: msg,
                type: "success",
            });
            if (res.config.url === "/login") {
                sessionStorage.setItem("token", result.token);
            }
            return result;
        }

        Message({
            message: msg,
            type: "error",
        });

        return Promise.reject(msg);
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default api;