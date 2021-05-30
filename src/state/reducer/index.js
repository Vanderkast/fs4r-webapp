import { combineReducers } from 'redux'

import login from './login'
import explorer from './explorer'

export default combineReducers({
    login,
    explorer
})