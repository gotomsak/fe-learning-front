import React, { useState, useEffect, useRef } from "react"
import DialogContentText from "@material-ui/core/DialogContentText"
import axios from "axios"
import store from "../index"
import QuestionComponent from "../components/QuestionComponent"
import { getQuestionInfo } from "../apis/getQuestionInfo"

function LearningPage() {
    const [qInfo, setQInfo] = useState("");
    const [windowNonFocusTimer, setNonFocusTimer] = useState(0);
    const refWindowNonFocusTimer = useRef(windowNonFocusTimer)
    let result:any
    useEffect(()=>{
        refWindowNonFocusTimer.current=windowNonFocusTimer
    },[windowNonFocusTimer])
    useEffect(()=>{
        let windowNonFocusTimerFlag:any;
        window.addEventListener('focus',()=>{
            clearInterval(windowNonFocusTimerFlag)
        })
        window.addEventListener('blur',()=>{
            windowNonFocusTimerFlag = setInterval(()=>{
                setNonFocusTimer(refWindowNonFocusTimer.current+1)
            }, 1000);
        })
    },[])

    useEffect(() => {
        const questionFetch = async()=>{
            result = await getQuestionInfo()
            setQInfo(result.data.question)
            console.log (result.data.question)
            console.log(qInfo)

        }

        questionFetch()
        
    },[])

    return(
        <div>
            <h1>LearningPage</h1>
            {windowNonFocusTimer}
            <QuestionComponent questionText={qInfo}></QuestionComponent>
            {/* {qInfo} */}
                { /* <questionComponent questionString={"nyan"}></questionComponent> */}
                {/* <DialogContentText>{this.state.question}</DialogContentText> */}
                {/* {this.state.windowNonFocusTimer} */}
            <button>test</button>
        </div>

    )

}
export default LearningPage
