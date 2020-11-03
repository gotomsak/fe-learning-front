import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { start } from "repl";
import FinishViewComponent from "../components/FinishViewComponent";
import MaxFrequencyComponent from "../components/MaxFrequencyComponent";
import MinFrequencyComponent from "../components/MinFrequencyComponent";
import ReadyViewComponent from "../components/ReadyViewComponent";
import WebCameraComponent from "../components/WebCameraComponent";
import { useHistory } from "react-router";
import userEvent from "@testing-library/user-event";
import { BtoF } from "../apis/backendAPI/interfaces";
import { initMaxFrequency } from "../apis/backendAPI/initMaxFrequency";
import { initMinFrequency } from "../apis/backendAPI/initMinFrequency";
import {
    InitMaxFrequency,
    InitMinFrequency,
} from "../apis/backendAPI/interfaces";

function FrequencyPage() {
    const [startCheck, setStartCheck] = useState(false);

    // データが取り終わった時のステート
    const [finishCheck, setFinishCheck] = useState(false);

    // 終了メッセージが表示されたあとのステート
    const [finishFlag, setFinishFlag] = useState(false);
    const [blobData, setBlobData] = useState<Blob | null>(null);
    const [maxRecord, setMaxRecord] = useState(false);
    const [minRecord, setMinRecord] = useState(false);
    const [maxSend, setMaxSend] = useState(false);
    const [minSend, setMinSend] = useState(false);
    const [ready, setReady] = useState(false);
    const history = useHistory();
    const [webSocketData, setWebSocketData] = useState<BtoF>({
        blink: 0,
        face_move: 0,
    });

    useEffect(() => {
        if (finishFlag === true) {
            if (maxSend === true) {
                initMaxFrequency(initMaxFrequencyValue())
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            if (minSend === true) {
                initMinFrequency(initMinFrequencyValue())
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            history.push("/");
        }
    }, [finishFlag]);

    useEffect(() => {
        if (finishCheck === true) {
            if (maxRecord === true) {
                setMaxSend(true);
                setMaxRecord(false);
                setStartCheck(false);
            }
            if (minRecord === true) {
                setMinSend(true);
                setMinRecord(false);
                setStartCheck(false);
            }
        }
    }, [finishCheck]);

    const initMaxFrequencyValue = (): InitMaxFrequency => {
        return {
            user_id: Number(localStorage.getItem("user_id")),
            max_frequency_video: blobData!,
            max_blink_number: webSocketData["blink"],
            max_face_move_number: webSocketData["face_move"],
        };
    };

    const initMinFrequencyValue = (): InitMinFrequency => {
        return {
            user_id: Number(localStorage.getItem("user_id")),
            min_frequency_video: blobData!,
            min_blink_number: webSocketData["blink"],
            min_face_move_number: webSocketData["face_move"],
        };
    };
    const webSocketDataAdd = (e: any) => {
        const jsonData = JSON.parse(e.data);
        const blinkCount: number = jsonData["blink"] ? 1 : 0;
        setWebSocketData({
            blink: webSocketData.blink + blinkCount,
            face_move: webSocketData.face_move + jsonData["face_move"],
        });
    };

    const recordSelect = (e: any) => {
        if (e.currentTarget.value == "max") setStartCheck(true);
        setMaxRecord(true);
        if (e.currentTarget.value == "min") setStartCheck(true);
        setMinRecord(true);
    };
    const webSocketSendData = () => {
        return {
            type: "frequency",
        };
    };
    const readyViewText = () => {
        return (
            <div>
                <Button onClick={recordSelect} color="secondary" value={"max"}>
                    最高頻度を算出
                </Button>
                <Button onClick={recordSelect} color="secondary" value={"min"}>
                    最低頻度を算出
                </Button>
            </div>
        );
    };
    const renderRecord = () => {
        if (maxRecord) {
            return (
                <MaxFrequencyComponent
                    setFinishCheck={setFinishCheck}
                ></MaxFrequencyComponent>
            );
        }
        if (minRecord) {
            return (
                <MinFrequencyComponent
                    setFinishCheck={setFinishCheck}
                ></MinFrequencyComponent>
            );
        }
    };
    return (
        <div className="FrequencyPageContainer">
            {startCheck ? (
                renderRecord()
            ) : finishCheck ? (
                <FinishViewComponent
                    setFinishFlag={setFinishFlag}
                ></FinishViewComponent>
            ) : (
                <ReadyViewComponent
                    setStartCheck={startCheck}
                    readyViewText={readyViewText}
                ></ReadyViewComponent>
            )}
            <WebCameraComponent
                start={startCheck}
                stop={finishCheck}
                setBlobData={setBlobData}
                setWebSocketData1={webSocketDataAdd}
                setWebSocketData2={null}
                method1={false}
                method2={false}
                sendData={webSocketSendData}
            ></WebCameraComponent>
        </div>
    );
}
export default FrequencyPage;
