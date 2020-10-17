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

import ReadyViewComponent from "../components/ReadyViewComponent";
import { useHistory } from "react-router";
import QuestionViewComponent from "../components/QuestionViewComponent";
import { getQuestionIds } from "../apis/backendAPI/getQuestionIds";
import FinishViewComponent from "../components/FinishViewComponent";
import { checkAnswerSection } from "../apis/backendAPI/checkAnswerSection";
import store from "..";

import { getNowTimeString } from "../utils/utils";
import WebCameraComponent from "../components/WebCameraComponent";
import { BtoFtoC } from "../interfaces";

function LearningPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const [startCheck, setStartCheck] = useState(false);
    const [startTime, setStartTime] = useState("");
    const [windowNonFocusTimer, setNonFocusTimer] = useState(0);
    const [questionID, setQuestionID] = useState(0);
    const [next, setNext] = useState(false);

    // 問題が10問とき終わったときのstate
    const [finish, setFinish] = useState(false);

    // FinishViewのボタンクリック時の判定
    const [finishFlag, setFinishFlag] = useState(false);
    const [qCount, setQCount] = useState(0);
    const [blobData, setBlobData] = useState<Blob | null>(null);
    const refWindowNonFocusTimer = useRef(windowNonFocusTimer);
    const [webSocketData, setWebSocketData] = useState<BtoFtoC>({
        w: [],
        blink: 0,
        face_move: 0,
        c1: [],
        c2: [],
        c3: [],
    });
    // const [getWebSocketData, setGetWebSocketData] = useState<{
    //     [name: string]: Array<any>;
    // }>({});
    useEffect(() => {
        refWindowNonFocusTimer.current = windowNonFocusTimer;
    }, [windowNonFocusTimer]);

    useEffect(() => {
        let windowNonFocusTimerFlag: any;
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
        }
        if (next === true && qCount <= 9) {
            const cnt = qCount + 1;
            setQuestionID(store.getState().questionIDsState[cnt]);
            setQCount(qCount + 1);
            setNext(false);
        }
    }, [next]);

    useEffect(() => {
        if (finishFlag === true) {
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
    const webSocketDataAdd = (e: any) => {
        console.log(e.data["blink"]);
        setWebSocketData({
            blink: webSocketData.blink + e.data["blink"],
            face_move: webSocketData.face_move + e.data["face_move"],
            w: webSocketData.w + e.data["w"],
            c1: [...webSocketData.c1, e.data["c1"]],
            c2: [...webSocketData.c2, e.data["c2"]],
            c3: [...webSocketData.w, e.data["c3"]],
        });
        console.log(webSocketData);
    };

    const setSectionResult = (): CheckAnswerSectionPost => {
        return {
            user_id: Number(localStorage.getItem("user_id")),
            answer_result_ids: store.getState().ansResultIDsState,
            correct_answer_number: store.getState().correctNumberState,
            other_focus_second: windowNonFocusTimer,
            face_video: blobData!,
            start_time: startTime,
            end_time: getNowTimeString(),
        };
    };
    const readyViewText = () => {
        return (
            <div>
                <h1>準備は良いですか？</h1>
                <h2>良ければスタートボタンを押してください</h2>
                <h3>10問おきに継続，終了を選べます</h3>
                <h3>終了後アンケートにお答えください</h3>
            </div>
        );
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
                    </div>
                )
            ) : finish ? (
                <FinishViewComponent
                    setFinishFlag={setFinishFlag}
                ></FinishViewComponent>
            ) : (
                <ReadyViewComponent
                    setStartCheck={setStartCheck}
                    readyViewText={readyViewText}
                ></ReadyViewComponent>
            )}
            <WebCameraComponent
                start={startCheck}
                stop={finish}
                setBlobData={setBlobData}
                setWebSocketData={webSocketDataAdd}
            ></WebCameraComponent>
        </div>
    );
}
export default LearningPage;
