import React, { useState, useEffect } from "react";
import { BtoFtoC, CheckAnswerSectionPost } from "./interfaces";
import { axios } from "./index";
export const checkAnswerSection = (postData: CheckAnswerSectionPost, postDataSub: BtoFtoC) => {
    const data = new FormData();
    data.append("user_id", postData.user_id.toString());
    data.append("answer_result_ids", postData.answer_result_ids.toString());
    data.append(
        "correct_answer_number",
        postData.correct_answer_number.toString()
    );
    if (postData.face_video !== undefined) {
        console.log("into video");
        data.append("face_video", postData.face_video);
    }
    data.append("other_focus_second", postData.other_focus_second.toString());
    data.append("start_time", postData.start_time);
    data.append("end_time", postData.end_time);
    data.append("blink", postDataSub.blink.toString())
    data.append("face_move", postDataSub.face_move.toString())
    data.append("w", postDataSub.w.toString())
    data.append("c1", postDataSub.c1.toString())
    data.append("c2", postDataSub.c2.toString())
    data.append("c3", postDataSub.c3.toString())

    return axios.post("/check_answer_section", data).then((res) => {
        return res;
    });
};
