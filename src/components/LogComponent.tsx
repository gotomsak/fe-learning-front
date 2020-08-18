import React, { useState, useRef, useEffect } from "react";
import "./LogComponent.css";

const LogComponent: React.FC<{ calculatorResult: string }> = ({
    calculatorResult,
}) => {
    const [Log, setLog] = useState("");
    const calculatorRef = useRef(calculatorResult);
    useEffect(() => {
        calculatorRef.current = calculatorResult;
        if (Log == "") {
            setLog(calculatorRef.current);
        }
        setLog(Log + "\n" + calculatorRef.current);
        console.log(calculatorRef.current);
    }, [calculatorResult]);
    const changeText = (e: any) => {
        console.log(e.target.value);
        setLog(String(e.target.value));
    };
    return (
        <div className="LogContainer">
            <textarea onChange={changeText} value={Log}></textarea>
        </div>
    );
};

export default LogComponent;
