import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  token: null,
  userID: null,
  address: [],
  firstName: null,
  lastName: null,
  phoneNumber: null,
  email: null,
  error: null,
  loading: false,
  addressLoading: false,
  addressError: null,
  addressOp: false,
  rmv: false
}

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
}

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    userID: action.userID,
    address: action.address.reverse(),
    firstName: action.firstName,
    lastName: action.lastName,
    phoneNumber: action.phoneNumber,
    email: action.email,
    error: null,
    loading: false
  });
}

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
}

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    userID: null,
    address: [],
    firstName: null,
    lastName: null,
    phoneNumber: null,
    email: null,
    error: null,
    loading: false,
    addressLoading: false,
    addressError: null,
    addressOp: false,
    rmv: false
  });
}


const authFailConfirm = (state, action) => {
  return updateObject(state, {
    error: null,
    token: null,
    userID: null
  });
}

const addressOpStart = (state, action) => {
  return updateObject(state, { addressError: null, addressLoading: true, addressOp: false, rmv: action.rmv });
}
const addressOpFail = (state, action) => {
  return updateObject(state, { addressError: action.error, addressLoading: false, addressOp: false });
}
const addressOpSuccess = (state, action) => {
  let address = [...state.address];
  if(action.isAdd) {
    address.unshift(action.address);
  } else {
    address = address.filter(ad => ad._id !== action.addressID);
  }
  return updateObject(state, { addressError: null, addressLoading: false, address, addressOp: true });
}
const addressOpClearError = (state, action) => {
  return updateObject(state, { addressError: null, addressOp: false, rmv: false });
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.AUTH_START: return authStart(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    case actionTypes.AUTH_FAIL_CONFIRM: return authFailConfirm(state, action);
    case actionTypes.ADDRESS_OP_START: return addressOpStart(state, action);
    case actionTypes.ADDRESS_OP_FAIL: return addressOpFail(state, action);
    case actionTypes.ADDRESS_OP_SUCCESS: return addressOpSuccess(state, action);
    case actionTypes.ADDRESS_OP_CLEAR_ERROR: return addressOpClearError(state, action);
    default: return state;
  }
}

export default reducer;
