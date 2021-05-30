import Modes from './modes'

const defaultState = { mode: Modes.MODE_LOGIN, route: [] }

var momorizedState = defaultState;

const routes = (state = defaultState, action) => {
    console.log(state)
    switch (action.type) {
        case 'APPEND_ROUTE':
            return {
                mode: action.mode ? action.mode : state.mode,
                route: [...state.route, action.path],
            }
        case 'UPDATE ROUTE':
            return {
                mode: action.mode ? action.mode : state.mode,
                route: action.route
            }
        case 'LOGOUT': {
            momorizedState = state
            return defaultState
        }
        case 'LOGIN':
            return momorizedState === defaultState
                ? { mode: Modes.MODE_EXPLORE, route: [] }
                : momorizedState;
        default:
            return state
    }
}

export default routes