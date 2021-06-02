import { ACTION_MOVE, ACTION_PASTE } from "../actions";

const initialState = {
  origin: null, // {route, file}
  target: null, // {route, file}
  filename: null,
  copy: false,
};

const move = (state = initialState, action) => {
  console.log('move', state, action);
  switch (action.type) {
    case ACTION_MOVE:
      return {
        origin: action.origin,
        target: null,
      };
    case ACTION_PASTE:
      return {
        origin: state.origin,
        target: action.target,
        copy: action.copy,
      };
    default:
      return state;
  }
}

export default move