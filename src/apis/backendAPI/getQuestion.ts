import { axios } from "./index";

export const getQuestion = (id: number) => {
    return axios.get("/question?id=" + id.toString()).then((res) => {
        return res;
    });
};
