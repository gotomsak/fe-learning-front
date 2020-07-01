import React from 'react'
import DialogContentText from "@material-ui/core/DialogContentText"


const questionComponent:React.FunctionComponent<{questionString:string}>=({questionString})=>{
    return (
        <div>
            <DialogContentText>
                {questionString}
            </DialogContentText>
        </div>
    )
}

export default questionComponent