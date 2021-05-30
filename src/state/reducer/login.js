import { ACTION_LOGIN, ACTION_LOGOUT } from '../actions'

const initState =
    window.localStorage.getItem('creds')

const login = (state = initState, action) => {
    switch (action.type) {
        case ACTION_LOGIN:
            return true
        case ACTION_LOGOUT:
            return false
        default:
            return state
    }
}

export default login