import {applyMiddleware, combineReducers, createStore} from 'redux'
import { fileReducer} from './fileReducer'
import { userReducer} from './userReducer'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { uploadReducer } from './uploadReducer'
import { loaderReducer } from './loaderReducer'

const RootReducer = combineReducers({
    files: fileReducer,
    user: userReducer,
    upload: uploadReducer,
    loader: loaderReducer
})

export const store = createStore(RootReducer, composeWithDevTools(applyMiddleware(thunk)))