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
import { pync } from "../apis/pyncAPI";
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
    const [questionID, setQuestionID] = useState(0);
    const [next, setNext] = useState(false);
    const [method, setMethod] = useState(0);
    const [method1, setMethod1] = useState(false);
    const [method2, setMethod2] = useState(false);
    const [cameraMethod, setCameraMethod] = useState(false);
    const [cameraStop, setCameraStop] = useState(false);
    // 問題が10問とき終わったときのstate
    const [finish, setFinish] = useState(false);

    // FinishViewのボタンクリック時の判定
    const [finishFlag, setFinishFlag] = useState(false);
    const [qCount, setQCount] = useState(0);
    const [blobData, setBlobData] = useState<Blob | null>(null);
    const [imagePath, setImagePath] = useState("");
    const [concData, setConcData] = useState([]);
    const [cameraStart, setCameraStart] = useState(false);

    useEffect(() => {
        setStartTime(getNowTimeString());
    }, []);

    useEffect(() => {
        console.log(qCount);
        if (qCount > 9) {
            setFinish(true);
            if (cameraStart === true) {
                setCameraStop(true);
            }

            setStartCheck(false);
        }
        if (next === true && qCount <= 9) {
            const cnt = qCount + 1;
            setQuestionID(store.getState().questionIDsState[cnt]);
            setQCount(qCount + 1);
            setConcData([]);
            setNext(false);
        }
    }, [next]);

    useEffect(() => {
        if (finishFlag === true) {
            console.log("owaru");
            checkAnswerSection(setSectionResult())
                .then((res) => {
                    console.log(res);
                    dispatch({
                        type: "ansResultSectionIDSet",
                        id: res.data["answer_result_section_id"],
                    });
                    dispatch({
                        type: "ansResultIDsReset",
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
            pync({
                upload_path: imagePath.toString(),
            }).then((res) => {
                console.log(res);
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

    // e.dataはストリング
    const webSocketDataAdd = (e: any) => {
        const jsonData = JSON.parse(e.data);
        console.log(jsonData);

        setConcData((concData) => concData.concat(jsonData));
        setImagePath(jsonData["face_image_path"]);
    };

    const sendData = () => {};

    const setSectionResult = (): CheckAnswerSectionPost => {
        return {
            user_id: Number(localStorage.getItem("user_id")),
            answer_result_ids: store.getState().ansResultIDsState,
            correct_answer_number: store.getState().correctNumberState,
            start_time: startTime,
            end_time: getNowTimeString(),
        };
    };
    const changeMethod = (e: any) => {
        console.log(e.target.checked);
        if (e.target.name === "method1") {
            setMethod1(e.target.checked);
        }
        if (e.target.name === "method2") {
            setMethod2(e.target.checked);
        }
        if (e.target.name === "camera") {
            setCameraMethod(e.target.checked);
        }
    };
    const startCheckButton = (e: any) => {
        console.log(e.currentTarget.value);
        if (e.currentTarget.value === 1) {
            if (cameraMethod === true) {
                setCameraStart(true);
            }
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
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={cameraMethod}
                            onChange={changeMethod}
                            inputProps={{ "aria-label": "primary checkbox" }}
                            name="camera"
                        />
                    }
                    label="UseCamera"
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
                            concentrationData={concData}
                            setNext={setNext}
                        ></QuestionViewComponent>
                        {/* <ConcentrationViewComponent
                            concData1={c3}
                            concData2={sonConc}
                        ></ConcentrationViewComponent> */}
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
                start={cameraStart}
                stop={cameraStop}
                setBlobData={setBlobData}
                setWebSocketData={webSocketDataAdd}
                method1={method1}
                method2={method2}
                sendData={sendData}
            ></WebCameraComponent>
        </div>
    );
}
export default LearningPage;
