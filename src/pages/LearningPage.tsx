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
            <QuestionComponent questionString={qInfo}></QuestionComponent>
            {/* {qInfo} */}
                { /* <questionComponent questionString={"nyan"}></questionComponent> */}
                {/* <DialogContentText>{this.state.question}</DialogContentText> */}
                {/* {this.state.windowNonFocusTimer} */}
            <button>test</button>
        </div>

    )

}
export default LearningPage


// class LearningPage extends React.Component<any,any>{
//     constructor(
//         props: any
//     ){
//         super(props)
//         this.state = {
//             question: '',
//             windowNonFocusTimer: 0
//         }
//         this.render = this.render.bind(this)
//         this.test_api = this.test_api.bind(this);
//         this.testState = this.testState.bind(this)
//         axios.defaults.baseURL = "http://127.0.0.1:1323"
//         axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
//         axios.defaults.headers.post['Access-Control-Allow-Origin']='*';
//         axios.defaults.headers.get['Access-Control-Allow-Origin']='*';
//     }
//     componentDidMount(){
//         let windowNonFocusTimerFlag:any;
//         window.addEventListener('focus',()=>{
//             clearInterval(windowNonFocusTimerFlag)
//         })
//         window.addEventListener('blur',()=>{
//             windowNonFocusTimerFlag = setInterval(()=>{
//                 this.setState({windowNonFocusTimer: this.state.windowNonFocusTimer + 1})
//             }, 1000);
//         })
//         this.test_api()
//     }
//     test_api() {
//         axios.get("/test")
//             .then((results) => {
//                 console.log(results)
//                 this.setState({question: results.data["question"]})
//             }
//         )
//     }
//     testState(){
//         console.log(store.getState())
//     }


//     render(){
//         return (
            // <div>
            //     <h1>LearningPage</h1>
            //     {/* <questionComponent questionString={"nyan"}></questionComponent> */}
            //     <DialogContentText>{this.state.question}</DialogContentText>
            //     {this.state.windowNonFocusTimer}
            //     <button onClick={this.testState}>test</button>
            // </div>
//         )
//     }
// }

// export default LearningPage