import { combineReducers } from 'redux'

import authReducer from './authReducers';
import auth from './authReducers'
import tokenReducer from './tokenReducer';
import token from './tokenReducer'

const rootReducer = combineReducers({
    auth : authReducer,
    token : tokenReducer
})

export default rootReducer;