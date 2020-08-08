import {axios} from './index'

export const getQuestionInfo=(id: number)=>{
    return axios.get("/question?id="+id.toString())
        .then((res) => {
            return res
        })
}
