
import React from 'react'

const AnsResultComponent:React.FC<{ansResult:string}> =({ansResult})=>{
    return (
        <div className="AnsResultContainer">
            <h1>答えは？</h1>
            {ansResult}
        </div>
    )
}

export default AnsResultComponent