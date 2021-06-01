import { ACTION_MOVE, ACTION_PASTE } from "../actions";

const initialState = {
  origin: null,
  target: null,
  copy: false,
};

const move = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_MOVE:
      return {
        origin: action.origin,
        target: null,
        copy: action.copy,
      };
    case ACTION_PASTE:
      return {
        origin: state.origin,
        target: action.target,
        copy: state.copy,
      };
    default:
      return state;
  }
}

export default move