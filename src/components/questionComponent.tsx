import React from 'react'
import DialogContentText from "@material-ui/core/DialogContentText"


const QuestionComponent:React.FC<{questionString:string}>=({questionString})=>{
    return (
        <div className="QuestionContainer">
            <DialogContentText>
                {questionString}
            </DialogContentText>
        </div>
    )
}

export default QuestionComponent