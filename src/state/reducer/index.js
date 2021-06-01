import { combineReducers } from 'redux'

import login from './login'
import explorer from './explorer'
import move from './move'

export default combineReducers({
    login,
    explorer,
    move
})