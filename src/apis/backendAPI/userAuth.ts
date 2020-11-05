import { User } from "./interfaces";
import { axios } from "./index";

export const signup = (user: User) => {
    const data = new FormData();
    if (user.username !== undefined) {
        data.append("username", user.username);
    }
    data.append("email", user.email);
    data.append("password", user.password);
    return axios.post("/signup", data).then((res) => {
        return res;
    });
};

export const signin = (user: User) => {
    let data = new FormData();
    data.append("email", user.email);
    data.append("password", user.password);
    return axios.post("/signin", data).then((res) => {
        return res;
    });
};

export const checkSession = () => {
    return axios.get("/check_session").then((res) => {
        return res;
    });
};

export const signout = () => {
    return axios.get("/signout").then((res) => {
        return res;
    });
};
