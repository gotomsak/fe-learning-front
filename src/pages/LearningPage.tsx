import React, { useState, useEffect, useRef } from "react"
import DialogContentText from "@material-ui/core/DialogContentText"
import axios from "axios"
import store from "../index"
import QuestionComponent from "../components/QuestionComponent"
import { getQuestionInfo } from "../apis/getQuestionInfo"
import TitleComponent from "../components/TitleComponent"
import CalculatorComponent from "../components/CalculatorComponent"
import LogComponent from "../components/LogComponent"
import AnsChoiceComponent from "../components/AnsChoiceComponent"
import './LearningPage.css'

function LearningPage() {
    // const [qInfo, setQInfo] = useState("");
    const [questionText, setQuestionText] = useState("")
    const [questionImg, setQuestionImg] = useState([])
    const [questionTitle, setQuestionTitle] = useState("")
    const [answerText, setAnswerText] = useState([])
    const [answerImg, setAnswerImg] = useState([])
    const [calculatorResult, setCalculatorResult] = useState("")
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
            setQuestionImg(result.data.qimg_path)
            setAnswerText(result.data.ans_list)
            setAnswerImg(result.data.aimg_list)
            console.log (result.data.qimg_path)
        }
        questionFetch()
    },[])

    return(
        <div>
            <TitleComponent title={questionTitle}></TitleComponent>
            <QuestionComponent questionText={questionText} questionImg={questionImg}></QuestionComponent>
            <div className="LogContainer">
                <LogComponent calculatorResult={calculatorResult}></LogComponent>
                <CalculatorComponent calculatorResult={setCalculatorResult}></CalculatorComponent>
            </div>
            <AnsChoiceComponent answerText={answerText} answerImg={answerImg}></AnsChoiceComponent>
            <button>test</button>
            {windowNonFocusTimer}
        </div>

    )

}
export default LearningPage
