export interface User {
    username?: string;
    email: string;
    password: string;
}

export interface GetQuestionIdsPost {
    solved_ids: number[];
    question_ids: number[];
}

export interface CheckAnswerPost {
    question_id: number;
    user_id: number;
    other_focus_second: number;
    user_answer: string;
    memo_log: string;
    start_time: string;
    end_time: string;
}

export interface CheckAnswerSectionPost {
    user_id: number;
    answer_result_ids: number[];
    correct_answer_number: number;
    other_focus_second: number;
    face_video?: Blob;
    start_time: string;
    end_time: string;
}

export interface SaveQuestionnairePost {
    user_id: number;
    answer_result_section_id: number;
    concentration: number;
    while_doing: string;
    cheating: string;
    nonsense: string;
}

export interface InitMaxFrequency{
    user_id: number;
    max_blink_number: number;
    max_face_move_number: number;
    max_frequency_video?:Blob;
}

export interface InitMinFrequency{
    user_id: number;
    min_blink_number: number;
    min_face_move_number: number;
    min_frequency_video?:Blob;
}
