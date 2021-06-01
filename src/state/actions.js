export const ACTION_LOGIN = 'LOGIN';
export const ACTION_LOGOUT = 'LOGOUT';

export const ACTION_UPDATE_ROUTE = 'UPDATE_ROUTE';
export const ACTION_APPEND_PATH = 'APPEND_PATH';

export const ACTION_MOVE = 'MOVE';

export const doMove = function (dispatch) {
  return (route, copy) => ({
    type: ACTION_MOVE,
    origin: route,
    copy: copy
  })
} 

export const ACTION_PASTE = 'PASTE';

export const doPaste = function (dispatch) {
  return (route) => ({
    type: ACTION_PASTE,
    target: route
  })
}