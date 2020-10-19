import { SaveQuestionnairePost } from "./interfaces";
import { axios } from ".";

const saveQuestionnaire = (postData: SaveQuestionnairePost) => {
    let data = new FormData();
    data.append("user_id", postData.user_id.toString());
    data.append(
        "answer_result_section_id",
        postData.answer_result_section_id.toString()
    );
    data.append("cheating", postData.cheating);
    data.append("concentration", postData.concentration.toString());
    data.append("while_doing", postData.while_doing);
    data.append("nonsense", postData.nonsense);
    return axios.post("/save_questionnaire", data).then((res) => {
        return res;
    });
};

export default saveQuestionnaire;
