import React from "react";
import "./QuestionComponent.css";

const QuestionComponent: React.FC<{
    questionText: string | null;
    questionImg: string[] | null;
}> = ({ questionText, questionImg }) => {
    return (
        <div className="QuestionContainer">
            <div className="QuestionText">
                {questionText}
                <div className="QuestionImg">
                    {questionImg?.map((d) => {
                        return <img src={d} alt="questionImg"></img>;
                    })}
                </div>
            </div>
        </div>
    );
};

export default QuestionComponent;
