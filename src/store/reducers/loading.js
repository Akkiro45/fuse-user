import { START_LOADING, STOP_LOADING } from '../actions/actionTypes';

const inititalState = {
  loading: false
};

const reducer = (state=inititalState, action) => {
  switch(action.type) {
    case START_LOADING: return { loading: true };
    case STOP_LOADING: return { loading: false };
    default: return state;
  }
}

export default reducer;