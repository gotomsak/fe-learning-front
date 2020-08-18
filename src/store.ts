import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware,
} from "redux";
import { routerMiddleware, connectRouter } from "connected-react-router";
import { correctNumberState } from "./states/correctNumberState";
import { ansResultIDsState } from "./states/ansResultIDsState";

export default function createStore(histroy: any) {
    return reduxCreateStore(
        combineReducers({
            ansResultIDsState,
            correctNumberState,
            router: connectRouter(histroy),
        }),
        applyMiddleware(routerMiddleware(histroy))
    );
}
