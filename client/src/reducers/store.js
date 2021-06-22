import {applyMiddleware, combineReducers, createStore} from 'redux'
import { fileReducer} from './fileReducer'
import { userReducer} from './userReducer'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const RootReducer = combineReducers({
    files: fileReducer,
    user: userReducer
})

export const store = createStore(RootReducer, composeWithDevTools(applyMiddleware(thunk)))