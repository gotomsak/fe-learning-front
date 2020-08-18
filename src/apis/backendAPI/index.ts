import axios from "axios";

//import {useHistory} from 'react-router'

export * from "./userAuth";

axios.defaults.baseURL = "http://127.0.0.1:1323";
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post["Content-Type"] = "multipart/form-data;";
axios.defaults.headers.post["Access-Control-Allow-Origin"] =
    "http://127.0.0.1:1323";
axios.defaults.headers.get["Access-Control-Allow-Origin"] =
    "http://127.0.0.1:1323";
axios.defaults.withCredentials = true;

export { axios };
// export {useHistory as history}
