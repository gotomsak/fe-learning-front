import { User }from './interfaces'
import Cookies from 'js-cookie'
import {axios} from './index'
// import axios from 'axios';

export const signup = async(user: User)=>{
    let result: any = await axios.post("/signup",user)
}

export const signin = async(user: User)=>{
    let data = new FormData()
    data.append('email',user.email)
    data.append('password',user.password)
    console.log(user)
    let result: any = await axios.post("/signin",data)
    console.log(result)
}

export const signout = async()=>{
    let result: any = await axios.get("/signout")
}