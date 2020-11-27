import axios, { AxiosRequestConfig } from "axios";

//import {useHistory} from 'react-router'

// export * from "./userAuth";

// axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
// // axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
// console.log(process.env.REACT_APP_BASE_URL);
// axios.defaults.headers.post["Content-Type"] = "multipart/form-data;";
// axios.defaults.headers.post["Access-Control-Allow-Origin"] =
//     process.env.REACT_APP_ALLOW_ORIGIN_POST;
// axios.defaults.headers.get["Access-Control-Allow-Origin"] =
//     process.env.REACT_APP_ALLOW_ORIGIN_GET;
// axios.defaults.withCredentials = true;
export const backendAxiosConfig: AxiosRequestConfig = {
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': process.env.REACT_APP_BASE_URL,
        'Content-Type': 'application/json',
    },
}
// export { axios };
// export {useHistory as history}
