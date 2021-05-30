const AUTH = 'creds';

export const login = (login, password) => {
    window.localStorage.setItem(AUTH, btoa(login + ':' + password))
}

export const logout = () => {
    window.localStorage.removeItem(AUTH)
}

export const getCreds = () => window.localStorage.getItem(AUTH);