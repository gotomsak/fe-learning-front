import { Button } from "@material-ui/core";
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
        console.log(e.currentTarget.value);
        answerFinal(e.currentTarget.value);
    };

    return (
        <div className="AnsChoiceContainer">
            {choice?.map((i, index) => {
                return (
                    <div className="AnsList" key={i}>
                        <Button
                            variant="contained"
                            onClick={choiceResult}
                            value={i}
                            key={i}
                        >
                            {answerText[0] === "" ? (
                                <img src={i} key={i} />
                            ) : (
                                <h4>{i}</h4>
                            )}
                        </Button>
                    </div>
                );
            })}
        </div>
    );
};

export default AnsChoiceComponent;
