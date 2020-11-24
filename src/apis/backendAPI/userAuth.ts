import { User } from "./interfaces";
import { backendAxiosConfig } from "./index";
import axios from 'axios'
export const signup = (user: User) => {
    const data = new FormData();
    if (user.username !== undefined) {
        data.append("username", user.username);
    }
    data.append("email", user.email);
    data.append("password", user.password);
    return axios.post("/signup", data, backendAxiosConfig).then((res) => {
        return res;
    });
};

export const signin = (user: User) => {
    // let data = new FormData();
    // data.append("email", user.email);
    // data.append("password", user.password);
    return axios.post("/signin", user, backendAxiosConfig).then((res) => {
        return res;
    });
};

export const checkSession = () => {
    return axios.get("/check_session", backendAxiosConfig).then((res) => {
        return res;
    });
};

export const signout = () => {
    return axios.get("/signout", backendAxiosConfig).then((res) => {
        return res;
    });
};
