import React, { useState, useEffect } from 'react'
import { deflate } from 'zlib'

const FinishViewComponent: React.FC=()=>{
    
    return (
        <div>
            <h1>10問終了しました, 続けますか？</h1>
            <button>続ける</button>
            <button>やめる</button>
        </div>
    )
}

export default FinishViewComponent