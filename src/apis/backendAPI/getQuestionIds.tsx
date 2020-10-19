import { axios } from "./index";
import { GetQuestionIdsPost } from "./interfaces";

export const getQuestionIds = (postData: GetQuestionIdsPost) => {
    return axios.post("/question_ids", postData).then((res) => {
        return res;
    });
};
