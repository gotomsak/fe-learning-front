import axios from 'axios';


axios.defaults.baseURL = "http://127.0.0.1:1323"
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin']='*';
axios.defaults.headers.get['Access-Control-Allow-Origin']='*';

export async function getQuestionInfo(){
    let result:any = await axios.get("/test")
    console.log(result)
    return result
}
