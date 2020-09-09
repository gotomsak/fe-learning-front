import React, {
    useState,
    useEffect,
    useRef,
    useReducer,
    useCallback,
} from "react";

import { useSelector, useDispatch } from "react-redux";
import "./LearningPage.css";
import {
    GetQuestionIdsPost,
    CheckAnswerSectionPost,
} from "../apis/backendAPI/interfaces";

import { webCameraManager } from "../apis/webCameraAPI";
import ReadyViewComponent from "../components/ReadyViewComponent";
import { useHistory } from "react-router";
import QuestionViewComponent from "../components/QuestionViewComponent";
import { getQuestionIds } from "../apis/backendAPI/getQuestionIds";
import FinishViewComponent from "../components/FinishViewComponent";
import { checkAnswerSection } from "../apis/backendAPI/checkAnswerSection";
import store from "..";

import { getNowTimeString } from "../utils/utils";
import WebCameraComponent from "../components/WebCameraComponent";

const webCamera = new webCameraManager();
const webSocket = new WebSocket("ws://localhost:8765");
webSocket.onmessage = (event) => {
    console.log(event.data);
};
webSocket.onclose = (event) => {
    console.log("simeta");
};

webSocket.onopen = (event) => {
    console.log("seikou");
};
function LearningPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const [webSocketSendTimer, setWebSocketSendTimer] = useState(0);
    const [startCheck, setStartCheck] = useState(false);
    const [startTime, setStartTime] = useState("");
    const [windowNonFocusTimer, setNonFocusTimer] = useState(0);
    const [questionID, setQuestionID] = useState(0);
    const [next, setNext] = useState(false);
    const [finish, setFinish] = useState(false);
    const [finishFlag, setFinishFlag] = useState(0);
    const [qCount, setQCount] = useState(0);
    const refWindowNonFocusTimer = useRef(windowNonFocusTimer);

    useEffect(() => {
        refWindowNonFocusTimer.current = windowNonFocusTimer;
    }, [windowNonFocusTimer]);

    useEffect(() => {
        let windowNonFocusTimerFlag: any;
        webCamera.webCameraInit();
        setStartTime(getNowTimeString());
        window.addEventListener("focus", () => {
            clearInterval(windowNonFocusTimerFlag);
        });
        window.addEventListener("blur", () => {
            windowNonFocusTimerFlag = setInterval(() => {
                setNonFocusTimer(refWindowNonFocusTimer.current + 1);
            }, 1000);
        });
    }, []);

    useEffect(() => {
        console.log(qCount);
        if (qCount > 9) {
            setFinish(true);
            setStartCheck(false);
            webCamera.webCameraStop();
        }
        if (next === true && qCount <= 9) {
            const cnt = qCount + 1;
            setQuestionID(store.getState().questionIDsState[cnt]);
            setQCount(qCount + 1);
            setNext(false);
        }
    }, [next]);

    useEffect(() => {
        if (finishFlag === 1) {
            console.log("owaru");
            checkAnswerSection(setSectionResult())
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
            history.push("/questionnaire");
        }
    }, [finishFlag]);

    useEffect(() => {
        if (startCheck === true) {
            console.log("startした");

            webCamera.webCameraStart();
            setInterval(() => {
                webSocket.send(webCamera.getCanvasData());
            }, 33);

            const getQuestionIdsPost: GetQuestionIdsPost = {
                solved_ids: store.getState().solvedIDsState,
                question_ids: store.getState().questionIDsState,
            };
            getQuestionIds(getQuestionIdsPost).then((res) => {
                dispatch({
                    type: "questionIDsSet",
                    id: res.data["question_ids"],
                });
                dispatch({ type: "solvedIDsSet", id: res.data["solved_ids"] });
            });
        }
    }, [startCheck]);

    useEffect(() => {
        console.log(selector);
        if (qCount === 0 && store.getState().questionIDsState !== 0) {
            setQuestionID(store.getState().questionIDsState[0]);
        }
    }, [selector]);

    const setSectionResult = (): CheckAnswerSectionPost => {
        const faceVideo = webCamera.getBlobData();
        console.log(faceVideo);
        return {
            user_id: Number(localStorage.getItem("user_id")),
            answer_result_ids: store.getState().ansResultIDsState,
            correct_answer_number: store.getState().correctNumberState,
            other_focus_second: windowNonFocusTimer,
            face_video: faceVideo,
            start_time: startTime,
            end_time: getNowTimeString(),
        };
    };
    return (
        <div className="LearningPageContainer">
            {startCheck ? (
                questionID > 0 && (
                    <div>
                        <QuestionViewComponent
                            questionID={questionID}
                            setNext={setNext}
                        ></QuestionViewComponent>
                        <WebCameraComponent></WebCameraComponent>
                    </div>
                )
            ) : finish ? (
                <FinishViewComponent
                    setFinishFlag={setFinishFlag}
                ></FinishViewComponent>
            ) : (
                <ReadyViewComponent
                    setStartCheck={setStartCheck}
                ></ReadyViewComponent>
            )}
        </div>
    );
}
export default LearningPage;
