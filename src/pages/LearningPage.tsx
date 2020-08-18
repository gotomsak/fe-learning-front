import React, { useState, useEffect, useRef, useReducer } from "react"

import './LearningPage.css'
import {GetQuestionIdsPost} from '../apis/backendAPI/interfaces'

import { 
    webCameraInit,
    webCameraStart,
    webCameraStop,
    webCameraDownload
} from '../apis/webCameraAPI'
import ReadyViewComponent from "../components/ReadyViewComponent"

import QuestionViewComponent from "../components/QuestionViewComponent"
import { getQuestionIds } from "../apis/backendAPI/getQuestionIds"
import FinishViewComponent from "../components/FinishViewComponent"

function LearningPage() {
    let getQuestionIdsPost:GetQuestionIdsPost
    const idsReducer = (state:number[], action:any)=>{
        if(action.type === 'remove'){
            return state.filter((number:number)=> number !== action.number)
        }else if (action.type==='add'){
            return [...state, action.number]
        }else if (action.type === 'reset'){
            return []
        } else {
            throw `Invalid type: ${action.type}`;
        }
        
    }
    const [startCheck, setStartCheck] = useState(false);
    const [answerResultIDs, setAnswerResultIDs] = useReducer(idsReducer,[])
    const [windowNonFocusTimer, setNonFocusTimer] = useState(0);
    const [solvedIDs, solveIDsDispatch] = useReducer(idsReducer,[])
    const [questionIDs, questionIDsDispatch] = useReducer(idsReducer,[])
    const [questionID, setQuestionID]= useState(0)
    const [next, setNext] = useState(false)
    const [finish, setFinish]=useState(false)
    const [qCount, setQCount]=useState(0)
    const refWindowNonFocusTimer = useRef(windowNonFocusTimer)
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
    
    useEffect(()=>{
        console.log(qCount)
        if (qCount > 9){
            setFinish(true)
            setStart(false)
        }
        if (next == true && qCount <= 9){
            const cnt = qCount + 1
            setQuestionID(questionIDs[cnt])
            setQCount(qCount+1)
            setNext(false)
        }
    },[next])

    useEffect(()=>{
        if(startCheck==true){
            console.log("startした")
            getQuestionIdsPost = {solved_ids:solvedIDs,question_ids: questionIDs}
            getQuestionIds(getQuestionIdsPost).then((res)=>{
                for (let i in res.data["question_ids"]){
                    questionIDsDispatch({type:'add',number: res.data["question_ids"][i]})
                }
                for (let i in res.data["solved_ids"]){
                    solveIDsDispatch({type:'add', number: res.data["solved_ids"][i]})
                }
            })
        }
    },[startCheck])

    useEffect(()=>{
        setQuestionID(questionIDs[0])
    },[questionIDs])

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

    const startQuestionInit=()=>{
        webCameraStart()
    }

    const reset=()=>{

    }
    const Hoge=()=>{
        return <h1>hoge</h1>
    }

    return(
        <div className="LearningPageContainer">
            {/* <Hoge /> */}
            {startCheck ?
                questionID > 0 && 
                    <QuestionViewComponent questionID={questionID} setNext={setNext} setAnswerResultIDs={setAnswerResultIDs}>
                        {startQuestionInit}
                    </QuestionViewComponent>
                    :finish? <FinishViewComponent></FinishViewComponent>
                : <ReadyViewComponent setStart={setStart}></ReadyViewComponent>
            }
            {/* <button onClick={stopButton}>stop</button>
            <button onClick={downloadURL}>download</button> */}
        </div>

    )

}
export default LearningPage
