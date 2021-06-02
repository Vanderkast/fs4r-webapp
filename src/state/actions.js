export const ACTION_LOGIN = 'LOGIN';
export const ACTION_LOGOUT = 'LOGOUT';

export const ACTION_UPDATE_ROUTE = 'UPDATE_ROUTE';
export const doUpdateRoute = function (dispatch) {
  return (route) => dispatch({
    type: ACTION_UPDATE_ROUTE,
    route: route
  })
}


export const ACTION_APPEND_PATH = 'APPEND_PATH';

export const ACTION_MOVE = 'MOVE';
export const doMove = function (dispatch) {
  return (route) => dispatch({
    type: ACTION_MOVE,
    origin: route,
  })
}

export const ACTION_PASTE = 'PASTE';
export const doPaste = function (dispatch) {
  return (route, copy) => dispatch({
    type: ACTION_PASTE,
    target: route,
    copy: copy
  })
}

export const ACTION_FLUSH_MOVE = "FLUSH_MOVE";
export const doFlushMove = function (dispatch) {
  return () => dispatch({ type: ACTION_FLUSH_MOVE })
}