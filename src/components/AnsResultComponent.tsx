
import React from 'react'

const AnsResultComponent:React.FC<{ansResult:string}> =({ansResult})=>{
    if (ansResult!=""){
        return (
        
            <div className="AnsResultContainer">
                <h1>けっかは？</h1>
                {ansResult}
            </div>
        )
    }else{
        return (
            <div></div>
        )
        
    }
}

export default AnsResultComponent