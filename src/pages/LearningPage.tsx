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
import { 
    webCameraInit,
    webCameraStart,
    webCameraStop,
    webCameraDownload
} from '../apis/webCameraAPI'

function LearningPage() {
    // const [qInfo, setQInfo] = useState("");
    const [questionText, setQuestionText] = useState("")
    const [questionImg, setQuestionImg] = useState([])
    const [questionTitle, setQuestionTitle] = useState("")
    const [answerText, setAnswerText] = useState([])
    const [answerImg, setAnswerImg] = useState([])
    const [answerFinal, setAnswerFinal]=useState("")
    const [calculatorResult, setCalculatorResult] = useState("")
    const [windowNonFocusTimer, setNonFocusTimer] = useState(0);
    const refWindowNonFocusTimer = useRef(windowNonFocusTimer)
    let result:any
    useEffect(()=>{
        refWindowNonFocusTimer.current=windowNonFocusTimer
    },[windowNonFocusTimer])
    useEffect(()=>{
        let windowNonFocusTimerFlag:any;
        webCameraInit()
        
        window.addEventListener('focus',()=>{
            clearInterval(windowNonFocusTimerFlag)
        })
        window.addEventListener('blur',()=>{
            windowNonFocusTimerFlag = setInterval(()=>{
                setNonFocusTimer(refWindowNonFocusTimer.current+1)
            }, 1000);
        })
    },[])
    useEffect(()=>{
        console.log("かわた")
        
    },[answerFinal])

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

    const stopButton=()=>{
        webCameraStop()
    }
    const downloadURL=()=>{
        const url = webCameraDownload()
        let a = document.createElement('a')
        document.body.appendChild(a)
        a.href = url;
        a.download = 'test.webm'
        a.click()
        window.URL.revokeObjectURL(url)
    }

    const startButton=()=>{
        webCameraStart()
    }

    return(
        <div className="LearningPageContainer">
            <button onClick={startButton}>start</button>
            <button onClick={stopButton}>stop</button>
            <button onClick={downloadURL}>download</button>
            <TitleComponent title={questionTitle}></TitleComponent>
            <QuestionComponent questionText={questionText} questionImg={questionImg}></QuestionComponent>
            <div className="LogContainer">
                <LogComponent calculatorResult={calculatorResult}></LogComponent>
                <CalculatorComponent calculatorResult={setCalculatorResult}></CalculatorComponent>
            </div>
            <AnsChoiceComponent answerText={answerText} answerImg={answerImg} answerFinal={setAnswerFinal}></AnsChoiceComponent>
            
        </div>

    )

}
export default LearningPage
