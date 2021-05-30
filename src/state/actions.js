import Modes from './modes'

export const appendRoute = path => ({
    type: 'APPEND_ROUTE',
    mode: Modes.MODE_EXPLORE,
    path 
})

export const updateRoute = route => ({
    type: 'UPDATE_ROUTE',
    mode: Modes.MODE_EXPLORE,
    route
})

export const readFile = file => ({
    type: 'READ_FILE',
    mode: Modes.MODE_READ,
    file
});

export const logout = ({
    type: 'LOGOUT',
    mode: Modes.MODE_LOGIN
})

export const login = ({
    type: 'LOGIN',
})
