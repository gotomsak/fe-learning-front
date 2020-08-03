import React, { useState, useEffect } from 'react'
import { signin } from '../apis/backendAPI/index'
import { User } from '../apis/backendAPI/interfaces'
function SigninPage(){
    const [email, setEmail] = useState("")
    const [password, setPassword]= useState("")
    const formChange=(event:any)=>{
        switch (event.target.name){
            case 'email':
                setEmail(event.target.value)
                break
            case 'password':
                setPassword(event.target.value)
                break
        }
    }
    const signinSubmit=()=>{
        let user: User = {email: email, password: password}
        signin(user)
    }

    return (
        <div className="SigninPageContainer">
            <h1>SigninPage</h1>
            
            <label>email:
                <input type="text" className="email" name="email" value={email} onChange={formChange}/>
            </label>
            <br/>
            <label>passowrd:
                <input type="password" className="password" name="password" value={password} onChange={formChange}/>
            </label>
            <br/>
            <input type="submit" value="submit" onClick={signinSubmit}/>
        </div>
    )
}
export default SigninPage