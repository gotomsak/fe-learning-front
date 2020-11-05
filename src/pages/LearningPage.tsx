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
    SonConc,
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
import { BtoFtoC } from "../apis/backendAPI/interfaces";
import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import ConcentrationViewComponent from "../components/ConcentrationViewComponent";

function LearningPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const [startCheck, setStartCheck] = useState(false);
    const [startTime, setStartTime] = useState("");
    const [windowNonFocusTimer, setNonFocusTimer] = useState(0);
    const [questionID, setQuestionID] = useState(0);
    const [next, setNext] = useState(false);
    const [method, setMethod] = useState(0);
    const [method1, setMethod1] = useState(false);
    const [method2, setMethod2] = useState(false);

    // 問題が10問とき終わったときのstate
    const [finish, setFinish] = useState(false);

    // FinishViewのボタンクリック時の判定
    const [finishFlag, setFinishFlag] = useState(false);
    const [qCount, setQCount] = useState(0);
    const [blobData, setBlobData] = useState<Blob | null>(null);
    const refWindowNonFocusTimer = useRef(windowNonFocusTimer);
    // const [webSocketData, setWebSocketData] = useState<BtoFtoC | null>(null);
    // const [webSocketDataSub, setWebSocketDataSub] = useState<SonConc | null>(
    //     null
    // );
    const [blink, setBlink] = useState([]);
    const [angle, setAngle] = useState([]);
    const [imagePath, setImagePath] = useState("");
    const [faceMove, setFaceMove] = useState([]);
    const [c1, setC1] = useState([]);
    const [c2, setC2] = useState([]);
    const [c3, setC3] = useState([]);
    const [w, setW] = useState([]);
    const [sonConc, setSonConc] = useState([]);

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
            checkAnswerSection(
                setSectionResult(),
                webSocketData1(),
                webSocketData2()
            )
                .then((res) => {
                    console.log(res);
                    dispatch({
                        type: "ansResultSectionIDSet",
                        id: res.data["answer_result_section_id"],
                    });
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

    // useEffect(() => {
    //     setConcViewState(webSocketData);
    // }, [webSocketData]);
    // useEffect(() => {
    //     setConcViewState(webSocketDataSub);
    // }, [webSocketDataSub]);

    // e.dataはストリング
    const webSocketDataAdd1 = (e: any) => {
        const jsonData = JSON.parse(e.data);
        console.log(jsonData);
        if (method1 == true) {
            setBlink((blink) => blink.concat(jsonData["blink"]));
            setAngle((angle) => angle.concat(jsonData["angle"]));
            setW((w) => w.concat(jsonData["w"]));
            setFaceMove((faceMove) => faceMove.concat(jsonData["face_move"]));
            setImagePath(jsonData["face_image_path"]);
            setC1((c1) => c1.concat(jsonData["c1"]));
            setC2((c2) => c2.concat(jsonData["c2"]));
            setC3((c3) => c3.concat(jsonData["c3"]));
        }
    };
    const webSocketDataAdd2 = (e: any) => {
        const jsonData = JSON.parse(e.data);
        console.log(jsonData);
        if (method2 == true) {
            setImagePath(jsonData["face_image_path"]);
            setSonConc((sonConc) => sonConc.concat(jsonData["concentration"]));
        }
    };
    const webSocketData1 = (): BtoFtoC | null => {
        if (method1 === true) {
            return {
                blink: blink,
                face_image_path: imagePath,
                face_move: faceMove,
                angle: angle,
                w: w,
                c1: c1,
                c2: c2,
                c3: c3,
            };
        }
        return null;
    };
    const webSocketData2 = (): SonConc | null => {
        if (method2 === true) {
            return {
                face_image_path: imagePath,
                concentration: sonConc,
            };
        }
        return null;
    };

    const sendData = () => {};

    const setSectionResult = (): CheckAnswerSectionPost => {
        return {
            user_id: Number(localStorage.getItem("user_id")),
            answer_result_ids: store.getState().ansResultIDsState,
            correct_answer_number: store.getState().correctNumberState,
            other_focus_second: windowNonFocusTimer,
            start_time: startTime,
            end_time: getNowTimeString(),
        };
    };
    const changeMethod = (e: any) => {
        console.log(e.target.checked);
        if (e.target.name == "method1") {
            setMethod1(e.target.checked);
        }
        if (e.target.name == "method2") {
            setMethod2(e.target.checked);
        }
        // setMethod(e.currentTarget.value);
        // setStartCheck(true);
    };
    const startCheckButton = (e: any) => {
        console.log(e.currentTarget.value);
        if (e.currentTarget.value == 1) {
            setStartCheck(true);
        }
    };
    const readyViewText = () => {
        return (
            <div>
                <h1>準備は良いですか？</h1>
                <h2>良ければスタートボタンを押してください</h2>
                <h3>10問おきに継続，終了を選べます</h3>
                <h3>終了後アンケートにお答えください</h3>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={method1}
                            onChange={changeMethod}
                            inputProps={{ "aria-label": "primary checkbox" }}
                            name="method1"
                        />
                    }
                    label="Method1"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={method2}
                            onChange={changeMethod}
                            inputProps={{ "aria-label": "primary checkbox" }}
                            name="method2"
                        />
                    }
                    label="Method2"
                />
                <Button onClick={startCheckButton} color="secondary" value={1}>
                    start
                </Button>
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
                        <ConcentrationViewComponent
                            concData1={c3}
                            concData2={sonConc}
                        ></ConcentrationViewComponent>
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
                setWebSocketData1={webSocketDataAdd1}
                setWebSocketData2={webSocketDataAdd2}
                method1={method1}
                method2={method2}
                sendData={sendData}
            ></WebCameraComponent>
        </div>
    );
}
export default LearningPage;
