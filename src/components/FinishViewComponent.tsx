import React, { useState, useEffect } from 'react'
import { deflate } from 'zlib'

const FinishViewComponent: React.FC<{setFinishFlag:any}>=({setFinishFlag})=>{
    const FinishButton=()=>{
        setFinishFlag(2)
    }
    const NextButton=()=>{
        setFinishFlag(1)
    }
    return (
        <div>
            <h1>10問終了しました, 続けますか？</h1>
            <button onClick={NextButton}>続ける</button>
            <button onClick={FinishButton}>やめる</button>
        </div>
    )
}

export default FinishViewComponent