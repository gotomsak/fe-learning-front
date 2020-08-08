import React, { useState, useEffect } from 'react'
import { signin } from '../apis/backendAPI/index'
import { User } from '../apis/backendAPI/interfaces'
import store from '../index'
import {useHistory} from 'react-router'
import ErrorViewComponent from '../components/ErrorViewComponent'
function SigninPage(){
    const history=useHistory()
    const [errorMessage, setErrorMessage]= useState("")
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
        signin(user).then((res)=>{
            localStorage.setItem("user_id", res.data["user_id"])
            localStorage.setItem("username", res.data["username"])
            history.push('/')
        }).catch((err)=>{
            setErrorMessage(err.message)
        })
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
            {errorMessage != '' && <ErrorViewComponent errMessage={errorMessage}></ErrorViewComponent>}
        </div>
    )
}
export default SigninPage