import { SET, SET_TOKEN } from '../actions/actionTypes';

const intialState = {
  done: false,
  error: null,
  token: null,
  userID: null
};

const reducer = (state=intialState, action) => {
  switch(action.type) {
    case SET: return { done: action.done, error: action.error };
    case SET_TOKEN: return { token: action.token };
    default: return state;
  }
}

export default reducer;