import React from 'react'
import DialogContentText from "@material-ui/core/DialogContentText"
import './QuestionComponent.css'

const QuestionComponent:React.FC<{questionString:string}>=({questionString})=>{
    return (
        <div className="QuestionContainer">
            <div className="QuestionText">
                {questionString}
            </div>
        </div>
    )
}

export default QuestionComponent