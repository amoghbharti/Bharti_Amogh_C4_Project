import axios from "axios";
import { appConfig } from "../config";
import { getToken } from "./token";
import { toast } from "react-toastify";

const httpClient = axios.create({
    baseURL: `${appConfig.SERVER_URL}/api`,
});

// Http request interceptor
httpClient.interceptors.request.use((config) => {
    if(config.setAuthHeader) {
      const token = getToken();
      config.headers.Authorization = `Bearer ${token}`;
    };
    
    return config;
})

// Http response interceptor
httpClient.interceptors.response.use((response) => {
    toast.success(response.data.message)
    return response.data || {};
}, (error) => {
    console.log("server error", error);
    toast.error(error.message);
});

export default httpClient;