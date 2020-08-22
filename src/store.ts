import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware,
} from "redux";
import { routerMiddleware, connectRouter } from "connected-react-router";
import { correctNumberState } from "./states/correctNumberState";
import { ansResultIDsState } from "./states/ansResultIDsState";
import { questionIDsState } from "./states/questionIDsState";
import { solvedIDsState } from "./states/solvedIDsState";
export default function createStore(histroy: any, initStates: any) {
    return reduxCreateStore(
        combineReducers({
            ansResultIDsState,
            correctNumberState,
            questionIDsState,
            solvedIDsState,
            router: connectRouter(histroy),
        }),
        (applyMiddleware(routerMiddleware(histroy)), initStates)
    );
}
