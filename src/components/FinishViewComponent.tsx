import React, { useState, useEffect } from "react";

const FinishViewComponent: React.FC<{ setFinishFlag: any }> = ({
    setFinishFlag,
}) => {
    // const FinishButton = () => {
    //     setFinishFlag(2);
    // };
    const NextButton = () => {
        setFinishFlag(1);
    };
    return (
        <div>
            <h1>10問終了しました</h1>
            <button onClick={NextButton}>次へ</button>
            {/* <button onClick={FinishButton}>やめる</button> */}
        </div>
    );
};

export default FinishViewComponent;
