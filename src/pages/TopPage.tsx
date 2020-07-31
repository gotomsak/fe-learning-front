
import React, { useState, useEffect, useRef } from 'react'
import TopMenuBtnComponent from '../components/TopMenuBtnComponent'
import Cookies from 'js-cookie'
import { useHistory } from 'react-router'



function TopPage(){
    const history=useHistory()
    useEffect(() => {
        if (Cookies.get("session")==undefined){
            history.push('/signin')
        }
    },[])
    return (
        <div className="TopPageContainer">
            <h1>fe-learing</h1>

            <TopMenuBtnComponent btnText="signup"></TopMenuBtnComponent>
        </div>
    )
}

export default TopPage