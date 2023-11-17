import configs from "@/configs";
import axios from "axios";
import cookies from "../cookies";

const token = cookies.getToken();
// console.log(token);

const instance = axios.create({
    baseURL: configs.publicRuntime.API_URL,
    // timeout: 1000,
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export default instance;
