
export interface User{
    username?: string,
    email: string,
    password: string
}

export interface GetQuestionIdsPost{
    solved_ids: number[],
    question_ids: number[]
}