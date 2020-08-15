import {
    createStore as reduxCreateStore, 
    combineReducers, 
    applyMiddleware
} from 'redux'
import { routerMiddleware, connectRouter } from 'connected-react-router'

export default function createStore(histroy:any){
    return reduxCreateStore(
        combineReducers({
            router: connectRouter(histroy)
        }),
        applyMiddleware(routerMiddleware(histroy))
    )
}

