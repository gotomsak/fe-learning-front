
import React, { useState, useEffect, useRef } from 'react'
import TopMenuBtnComponent from '../components/TopMenuBtnComponent'
import Cookies from 'js-cookie'
import { useHistory } from 'react-router'
import { checkSession } from '../apis/backendAPI'
import  ErrorViewComponent from '../components/ErrorViewComponent'
import SignoutBtnComponent from '../components/SignoutBtnComponent'

function TopPage(){
    const history=useHistory()
    const [errorMessage, setErrorMessage]=useState("")
    useEffect(() => {
        checkSession().then((response)=>{
            console.log(response)
        }).catch((error)=>{
            history.push('/signin')
        })
    },[])
    useEffect(() => {
        console.log(errorMessage)
    },[errorMessage])

    return (
        <div className="TopPageContainer">
            <h1>fe-learing</h1>
            <TopMenuBtnComponent btnText="learning" path="/learning"></TopMenuBtnComponent>
            <SignoutBtnComponent setErrorMessage={setErrorMessage}/>
            {errorMessage != "" && <ErrorViewComponent errMessage={errorMessage}/>}
        </div>
    )
}

export default TopPage