import React, { useState, useEffect } from 'react'
import {CheckAnswerPost} from './interfaces'
import {axios} from './index'
export const checkAnswer = (postData: CheckAnswerPost) =>{
    let data = new FormData
    data.append('user_id', postData.user_id.toString())
    data.append('question_id', postData.question_id.toString())
    data.append('user_answer', postData.user_answer)
    data.append('memo_log',postData.memo_log)
    data.append('other_focus_second', postData.other_focus_second.toString())
    data.append('start_time',postData.start_time)
    data.append('end_time', postData.end_time)
    return axios.post('/check_answer', data)
        .then((res)=>{
            return res
        })
}