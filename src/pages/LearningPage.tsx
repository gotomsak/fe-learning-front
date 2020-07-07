import React, { useState, useEffect, useRef } from "react"
import DialogContentText from "@material-ui/core/DialogContentText"
import axios from "axios"
import store from "../index"
import QuestionComponent from "../components/QuestionComponent"
import { getQuestionInfo } from "../apis/getQuestionInfo"
import TitleComponent from "../components/TitleComponent"

function LearningPage() {
    // const [qInfo, setQInfo] = useState("");
    const [questionText, setQuestionText] = useState("")
    const [questionTitle, setQuestionTitle] = useState("")
    
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
            // setQInfo(result.data)
            setQuestionText(result.data.question)
            setQuestionTitle(
                result.data.season+" "+
                result.data.question_num+" "+
                result.data.genre)
            console.log (result.data.question)
        }
        questionFetch()
    },[])

    return(
        <div>
            <TitleComponent title={questionTitle}></TitleComponent>
            <QuestionComponent questionText={questionText}></QuestionComponent>
            <button>test</button>
            {windowNonFocusTimer}
        </div>

    )

}
export default LearningPage
