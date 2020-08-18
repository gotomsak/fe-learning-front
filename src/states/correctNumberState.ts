export function correctNumberState(state: number = 0, action: any) {
    switch (action.type) {
        case "correct":
            return state + 1;
        case "reset_correct":
            return 0;
        default:
            return state;
    }
}
