import { ACTION_UPDATE_ROUTE, ACTION_APPEND_PATH } from '../actions'
import { MODE_EXPLORE, MODE_READ } from '../explorerModes'

const initialState = {
    route: [],
    mode: MODE_EXPLORE
}

const explorer = (state = initialState, action) => {
    console.log('eplorer reducer', state, action)
    switch (action.type) {
        case ACTION_APPEND_PATH:
            return {
                route: [...state.route, action.path],
                mode: action.mode ? MODE_EXPLORE : MODE_READ
            }
        case ACTION_UPDATE_ROUTE:
            return {
                route: action.route,
                mode: MODE_EXPLORE
            }
        default:
            return state;
    }
}

export default explorer
