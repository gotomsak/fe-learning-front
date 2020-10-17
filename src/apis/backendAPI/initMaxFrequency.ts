
import { InitMaxFrequency } from "./interfaces";
import { axios } from "./index";
export const initMaxFrequency = (postData: InitMaxFrequency) => {
    let data = new FormData();
    data.append("user_id", postData.user_id.toString());
    data.append("max_face_move_number", postData.max_face_move_number.toString());
    data.append("max_blink_number", postData.max_blink_number.toString());
    if (postData.max_frequency_video !== undefined) {
        console.log("into video");
        data.append("max_frequency_video", postData.max_frequency_video);
    }

    return axios.post("/init_max_frequency", data).then((res) => {
        return res;
    });
};
