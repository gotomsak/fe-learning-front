import React, { useState } from 'react'

const CalculatorComponent:React.FC=()=>{
    const [result, setResult] = useState("")
    const edit = (elem:any) =>{
        console.log(elem.value)
        setResult(result + elem.value)
    }

    const calc = () =>{
        setResult(result + "=" + new Function("return " + result)())
        console.log(result)
    }

    const clear = () => {
        setResult("")
    }
    return (
        <div>
            <input type="text" value={result}/>
            <div>
                <input type="button" value="1" onClick={e=>edit(e.target)}/>
                <input type="button" value="2" onClick={e=>edit(e.target)}/>
                <input type="button" value="3" onClick={e=>edit(e.target)}/>
                <input type="button" value="+" onClick={e=>edit(e.target)}/>
            </div>
            <div>
                <input type="button" value="4" onClick={e=>edit(e.target)}/>
                <input type="button" value="5" onClick={e=>edit(e.target)}/>
                <input type="button" value="6" onClick={e=>edit(e.target)}/>
                <input type="button" value="-" onClick={e=>edit(e.target)}/>
            </div>
            <div>
                <input type="button" value="7" onClick={e=>edit(e.target)}/>
                <input type="button" value="8" onClick={e=>edit(e.target)}/>
                <input type="button" value="9" onClick={e=>edit(e.target)}/>
                <input type="button" value="/" onClick={e=>edit(e.target)}/>
            </div>
            <div>
                <input type="button" value="0" onClick={e=>edit(e.target)}/>
                <input type="button" value="." onClick={e=>edit(e.target)}/>
                <input type="button" value="*" onClick={e=>edit(e.target)}/>
                <input type="button" value="=" onClick={()=>calc()}/>
            </div>
            <div>
                <input type="button" value="clear" onClick={()=>clear()}/>
            </div>
        </div>
    )
}

export default CalculatorComponent