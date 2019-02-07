import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  category: null,
  bucket: [],
  error: null,
  loading: false,
  added: false
}
const setActiveCategory = (state, action) => {
  return updateObject(state, { category: action.category });
}

const addToCartStart = (state, action) => {
  return updateObject(state, { loading: true, error: null, added: false });
}
const addToCartFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error, added: false });
}
const addToCartSuccess = (state, action) => {
  return updateObject(state, { loading: false, error: null, added: true });
}
const clearCartError = (state, action) => {
  return updateObject(state, { error: null, added: false });
}

const authLogout = (state, action) => {
  return updateObject(state, {
    category: null,
    bucket: [],
    error: null,
    loading: false,
    added: false
  });
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.ACTIVE_CATEGORY: return setActiveCategory(state, action);
    case actionTypes.ADD_CART_START: return addToCartStart(state, action);
    case actionTypes.ADD_CART_FAIL: return addToCartFail(state, action);
    case actionTypes.ADD_CART_SUCCESS: return addToCartSuccess(state, action);
    case actionTypes.CLEAR_CART_ERROR: return clearCartError(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    default: return state;
  }
}

export default reducer;