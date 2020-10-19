export const solvedIDsState = (state: number[] = [], action: any) => {
    switch (action.type) {
        case "solvedIDSet":
            return action.id;
        case "solvedReset":
            return [];
        default:
            return state;
    }
};
