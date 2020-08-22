import React from "react";
import "./AnsChoiceComponent.css";

const AnsChoiceComponent: React.FC<{
    answerText: string[];
    answerImg: string[];
    answerFinal: any;
}> = ({ answerText, answerImg, answerFinal }) => {
    const choiceTextList = [
        { tag: "A", ansText: answerText[0] },
        { tag: "B", ansText: answerText[1] },
        { tag: "C", ansText: answerText[2] },
        { tag: "D", ansText: answerText[3] },
    ];
    const choiceImgList = [
        { tag: "A", ansImg: answerImg[0] },
        { tag: "B", ansImg: answerImg[1] },
        { tag: "C", ansImg: answerImg[2] },
        { tag: "D", ansImg: answerImg[3] },
    ];
    const choiceResult: any = (e: any) => {
        answerFinal(String(e.target.value));
        console.log(e.target.value);
    };

    if (answerText[0] === "") {
        return (
            <div className="AnsChoiceContainer">
                {choiceImgList?.map((i) => {
                    return (
                        <div className="AnsList">
                            <button onClick={choiceResult} value={i.ansImg}>
                                {i.tag}
                            </button>
                            <img src={i.ansImg} alt="ansImage" />
                        </div>
                    );
                })}
            </div>
        );
    } else {
        return (
            <div className="AnsChoiceContainer">
                {choiceTextList?.map((d) => {
                    return (
                        <div className="AnsList">
                            <div className="AnsLine">
                                <button
                                    onClick={choiceResult}
                                    value={d.ansText}
                                >
                                    {d.tag}
                                </button>
                                <h4>{d.ansText}</h4>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
};

export default AnsChoiceComponent;
