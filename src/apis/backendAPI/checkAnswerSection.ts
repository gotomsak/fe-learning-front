import React, { useState, useEffect } from "react";
import { BtoFtoC, CheckAnswerSectionPost, SonConc } from "./interfaces";
import { axios } from "./index";
export const checkAnswerSection = (postData: CheckAnswerSectionPost, postDataBtoFtoC: BtoFtoC|null, postDataSonConc: SonConc|null) => {
    const data = new FormData();
    data.append("user_id", postData.user_id.toString());
    data.append("answer_result_ids", postData.answer_result_ids.toString());
    data.append(
        "correct_answer_number",
        postData.correct_answer_number.toString()
    );
    // if (postData.face_video !== undefined) {
    //     console.log("into video");
    //     data.append("face_video", postData.face_video);
    // }
    data.append("other_focus_second", postData.other_focus_second.toString());
    data.append("start_time", postData.start_time);
    data.append("end_time", postData.end_time);
    
    const isBtoFtoC = (arg: any): arg is BtoFtoC => {
        return arg !== null && arg.c3 !== null && arg.c3 !== undefined && arg.c3.length !== 0;
    };
    const isSonConc = (arg: any): arg is SonConc => {
        return (
            arg!==null&&arg.concentration !== null &&
            arg.concentration !== undefined &&
            arg.concentration.length !== 0
        );
    };
    if (isBtoFtoC(postDataBtoFtoC)){
        data.append("blink", postDataBtoFtoC.blink.toString())
        data.append("face_image_path", postDataBtoFtoC.face_image_path.toString())
        data.append("angle", postDataBtoFtoC.angle.toString())
        data.append("w", postDataBtoFtoC.w.toString())
        data.append("c1", postDataBtoFtoC.c1.toString())
        data.append("c2", postDataBtoFtoC.c2.toString())
        data.append("c3", postDataBtoFtoC.c3.toString())
        data.append("method1", "true")
    }
    if (isSonConc(postDataSonConc)){
        data.append("concentration", postDataSonConc.concentration.toString())
        data.append("face_image_path", postDataSonConc.face_image_path.toString())
        data.append("method2","true")
    }

    return axios.post("/check_answer_section", data).then((res) => {
        return res;
    });
};
