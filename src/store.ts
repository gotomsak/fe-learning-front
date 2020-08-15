import {
    createStore as reduxCreateStore, 
    combineReducers, 
    applyMiddleware
} from 'redux'
import { routerMiddleware, connectRouter } from 'connected-react-router'

// import {testReducer, TestState}from './states/testStates'

// export type AppState = {
//     test: TestState
// };

export default function createStore(histroy:any){
    return reduxCreateStore(
        combineReducers({
            // test: testReducer,
            router: connectRouter(histroy)
        }),
        applyMiddleware(routerMiddleware(histroy))
    )
}

// const store = createStore(
//     combineReducers<AppState>({
//         test: testReducer
//     })
// )

// export default