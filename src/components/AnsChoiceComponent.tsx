import React from "react";
import "./AnsChoiceComponent.css";

const AnsChoiceComponent: React.FC<{
    answerText: string[];
    answerImg: string[];
    answerFinal: any;
}> = ({ answerText, answerImg, answerFinal }) => {
    const choice: string[] = [];
    if (answerText[0] === "") {
        answerImg.forEach((value) => {
            choice.push(value);
        });
    } else {
        answerText.forEach((value) => {
            choice.push(value);
        });
    }

    const choiceResult: any = (e: any) => {
        answerFinal(String(e.target.value));
        console.log(e.target.value);
    };

    return (
        <div className="AnsChoiceContainer">
            {choice?.map((i, index) => {
                return (
                    <div className="AnsList" key={i}>
                        <button onClick={choiceResult} value={i} key={i}>
                            {index + 1}
                        </button>
                        {answerText[0] === "" ? (
                            <img src={i} key={i} />
                        ) : (
                            <h4>{i}</h4>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default AnsChoiceComponent;
