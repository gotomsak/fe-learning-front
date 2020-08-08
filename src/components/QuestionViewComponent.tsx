import React, { useState, useEffect, useRef } from 'react'
import TitleComponent from './TitleComponent'
import QuestionComponent from './QuestionComponent'
import LogComponent from './LogComponent'
import CalculatorComponent from './CalculatorComponent'
import AnsChoiceComponent from './AnsChoiceComponent'
import AnsResultComponent from './AnsResultComponent'
import { getQuestion } from '../apis/backendAPI/getQuestion'
import { webCameraInit } from '../apis/webCameraAPI'
import './QuestionViewComponent.css'

const QuestionViewComponent: React.FC<{questionID:number}> = ({questionID}) =>{
    const [questionText, setQuestionText] = useState("")
    const [questionImg, setQuestionImg] = useState([])
    const [questionTitle, setQuestionTitle] = useState("")
    const [answerText, setAnswerText] = useState([])
    const [answerImg, setAnswerImg] = useState([])
    const [calculatorResult, setCalculatorResult] = useState("")
    const [answerResult, setAnswerResult] = useState("")
    const [answerFinal, setAnswerFinal]=useState("")

    const [windowNonFocusTimer, setNonFocusTimer] = useState(0);
    
    const refWindowNonFocusTimer = useRef(windowNonFocusTimer)
    let result:any

    const ansResult=()=>{
        setAnswerResult("ositta")
    }
    useEffect(()=>{
        console.log("かわた")
        
    },[answerFinal])
    useEffect(() => {
        
        questionFetch(questionID)
    },[questionID])
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
    const questionFetch = (qid: number)=>{
        getQuestion(qid)
            .then((res)=>{
                setQuestionText(res.data.question)
                setQuestionTitle(
                    res.data.season+" "+
                    res.data.question_num+" "+
                    res.data.genre)
                setQuestionImg(res.data.qimg_path)
                setAnswerText(res.data.ans_list)
                setAnswerImg(res.data.aimg_list)
            })
        // setQInfo(result.data)
    }

    return (
        <div className="QuestionContainer">
            <TitleComponent title={questionTitle}></TitleComponent>
            <QuestionComponent questionText={questionText} questionImg={questionImg}></QuestionComponent>
            <div className="LogsContainer">
                <LogComponent calculatorResult={calculatorResult}></LogComponent>
                <CalculatorComponent calculatorResult={setCalculatorResult}></CalculatorComponent>
            </div>
            <AnsChoiceComponent answerText={answerText} answerImg={answerImg} answerFinal={setAnswerFinal}></AnsChoiceComponent>
            <AnsResultComponent ansResult={answerResult}></AnsResultComponent>
            <button onClick={ansResult}>Test</button>
        </div>
        
    )
}

export default QuestionViewComponent