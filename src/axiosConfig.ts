import axios from "axios";
import { refreshAccessToken } from "./api/refreshAccessToken ";

const API = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
});

API.interceptors.request.use(
    config => {
        const accessToken = sessionStorage.getItem("accessToken");

        if (accessToken && config.url !== "/auth") {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

API.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const newAccessToken = await refreshAccessToken();

            if (newAccessToken) {
                originalRequest.headers[
                    "Authorization"
                ] = `Bearer ${newAccessToken}`;
                return API(originalRequest);
            }
        }
        return Promise.reject(error);
    },
);

export default API;
