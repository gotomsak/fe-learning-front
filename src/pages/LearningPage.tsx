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

import {
    webCameraInit,
    webCameraStart,
    webCameraStop,
    webCameraDownload,
} from "../apis/webCameraAPI";
import ReadyViewComponent from "../components/ReadyViewComponent";
import { useHistory } from "react-router";
import QuestionViewComponent from "../components/QuestionViewComponent";
import { getQuestionIds } from "../apis/backendAPI/getQuestionIds";
import FinishViewComponent from "../components/FinishViewComponent";
import { checkAnswerSection } from "../apis/backendAPI/checkAnswerSection";
import store from "..";
import { push } from "connected-react-router";

function LearningPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const [startCheck, setStartCheck] = useState(false);
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
        if (finishFlag === 1) {
            console.log("続ける");
        }
        if (finishFlag === 2) {
            console.log("owaru");
            history.push("/");
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

    const stopButton = () => {
        webCameraStop();
    };
    const downloadURL = () => {
        const url = webCameraDownload();
        let a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = "test.webm";
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const startQuestionInit = () => {
        webCameraStart();
    };

    const reset = () => {};
    const Hoge = () => {
        return <h1>hoge</h1>;
    };
    // const setSectionResult = ():CheckAnswerSectionPost =>{
    //     return {
    //         user_id: Number(localStorage.getItem("user_id")),
    //         answer_result_ids: answerResultIDs,
    //         correct_answer_number:
    //     }
    // }
    return (
        <div className="LearningPageContainer">
            {/* <Hoge /> */}
            {startCheck ? (
                questionID > 0 && (
                    <QuestionViewComponent
                        questionID={questionID}
                        setNext={setNext}
                    >
                        {startQuestionInit}
                    </QuestionViewComponent>
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
            {/* <button onClick={stopButton}>stop</button>
            <button onClick={downloadURL}>download</button> */}
        </div>
    );
}
export default LearningPage;
