import React from 'react'
import DialogContentText from "@material-ui/core/DialogContentText"
import './QuestionComponent.css'

const QuestionComponent:React.FC<{questionText:string}>=({questionText})=>{
    return (
        <div className="QuestionContainer">
            <div className="QuestionText">
                {questionText}
            </div>
        </div>
    )
}

export default QuestionComponent