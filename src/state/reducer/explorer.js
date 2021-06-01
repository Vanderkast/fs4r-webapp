import { ACTION_UPDATE_ROUTE, ACTION_APPEND_PATH } from "../actions";
import { MODE_EXPLORE } from "../explorerModes";

const initialState = {
  route: [],
  mode: MODE_EXPLORE,
};

const explorer = (state = initialState, action) => {
  console.log(state, action)
  switch (action.type) {
    case ACTION_APPEND_PATH:
      return {
        route: [...state.route, action.path],
        mode: action.mode,
      };
    case ACTION_UPDATE_ROUTE: {
      if (arrayEquals(action.route, state.route))
        return {
          route: action.route,
          mode: state.mode
        };
      return {
        route: action.route,
        mode: MODE_EXPLORE,
      };
    }
    default:
      return state;
  }
};

function arrayEquals(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

export default explorer;
