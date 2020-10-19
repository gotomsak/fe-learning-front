import React, { useState, useEffect, useRef } from "react";
import "./MinFrequencyComponent.css";
import ReadyViewComponent from "./ReadyViewComponent";

const MinFrequencyComponent: React.FC<{ setFinishCheck: any }> = ({
    setFinishCheck,
}) => {
    const [startCheck, setStartCheck] = useState(false);
    const [windowTimer, setWindowTimer] = useState(0);
    const refWindowTimer = useRef(windowTimer);
    const [startTime, setStartTime] = useState("");
    const [windowTimeFlag, setWindowTimeFlag] = useState<NodeJS.Timeout | null>(
        null
    );

    useEffect(() => {
        refWindowTimer.current = windowTimer;
        if (windowTimer == 60) {
            clearInterval(windowTimeFlag!);
            setFinishCheck(true);
        }
    }, [windowTimer]);
    useEffect(() => {
        if (startCheck == true) {
            setWindowTimeFlag(
                setInterval(() => {
                    setWindowTimer(refWindowTimer.current + 1);
                }, 1000)
            );
        }
        if (startCheck == false) {
            clearInterval(windowTimeFlag!);
        }
    }, [startCheck]);
    const readyViewText = () => {
        return (
            <div>
                <h1>準備は良いですか？</h1>
                <h2>良ければスタートボタンを押してください</h2>
                <h3></h3>
                <h3>終了後アンケートにお答えください</h3>
            </div>
        );
    };
    return (
        <div className="MixFrequencyContainer">
            {startCheck ? (
                <div className="blue"></div>
            ) : (
                <ReadyViewComponent
                    setStartCheck={setStartCheck}
                    readyViewText={readyViewText}
                ></ReadyViewComponent>
            )}
        </div>
    );
};

export default MinFrequencyComponent;
