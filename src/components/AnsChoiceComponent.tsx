import React from 'react'

const AnsChoiceComponent:React.FC<{answerText:string[],answerImg:string[]}>=({answerText, answerImg})=>{

    let index:any = 0
    const choiceTag: string[] = ["A","B","C","D"]
    const choiceResult:any = (e:any) =>{
        console.log("osita")
    }
    if (answerText[0]==""){
        return(
            <div className="AnsChoiceContainer">
                {answerImg?.map(i=>{
                    return (
                        <div className="AnsList">
                            <button onClick ={choiceResult} value={i}>{choiceTag[index]}</button>
                            <img src={i}/>
                            {index=index+1}
                        </div>
                    )
                })}
            </div>
        )
    }else{
        return(
            <div className="AnsChoiceContainer">
                {answerText?.map(d=>{
                    return (
                        <div className="AnsList">
                            <button onClick ={choiceResult} value={d}>{choiceTag[index]}</button>
                            <h1>{d}</h1>
                            {index=index+1}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default AnsChoiceComponent