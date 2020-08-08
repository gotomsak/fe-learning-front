import { User }from './interfaces'
import Cookies from 'js-cookie'
import {axios} from './index'
import { Typography } from '@material-ui/core'
// import axios from 'axios';

export const signup = (user: User)=>{
    return axios.post("/signup",user)
        .then((res)=>{
            return res
        })
}

export const signin = (user: User)=>{
    let data = new FormData()
    data.append('email',user.email)
    data.append('password',user.password)
    return axios.post("/signin",data).then((res)=>{
        return res
    })
}

export const checkSession = ()=>{
    return axios.get("/check_session")
        .then((res)=>{
            return res
        })
}

export const signout = ()=>{
    return axios.get("/signout")
        .then((res)=>{
            return res
        })
}