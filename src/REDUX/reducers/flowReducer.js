import * as actionTypes from "../actions/actionTypes";
const initialState = {};
const flowReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_REACT_FLOW_INSTANCE:
      return { counter: state.counter + action.payload };
    default:
      return state;
  }
};

export default flowReducer;
