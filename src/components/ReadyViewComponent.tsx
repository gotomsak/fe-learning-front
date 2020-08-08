import React, { useState, useEffect } from 'react'

const ReadyViewComponent: React.FC<{setStart:any}>=({setStart})=>{
    const buttonClick =()=>{
        setStart(true)
    }
    return (
        <div>
            <h1>準備は良いですか？</h1>
            <h2>良ければスタートボタンを押してください</h2>
            <h3>10問おきに継続，終了を選べます</h3>
            <h3>終了後アンケートにお応えください</h3>
            <button onClick={buttonClick}>start</button>
        </div>
    )
}

export default ReadyViewComponent