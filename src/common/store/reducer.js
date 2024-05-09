import * as actionTypes from './actions/types';

export default function rootReducer(state, action) {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return {
        ...state,
        count: state.count + 1
      };
    case actionTypes.DECREMENT:
      return {
        ...state,
        count: state.count - 1
      };
    case actionTypes.MOUNTED:
      return {
        ...state,
        mounted: true
      };
    default:
      return state;
  }
}
