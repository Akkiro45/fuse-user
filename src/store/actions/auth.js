import axios from '../../axios';

import * as actionTypes from './actionTypes';
import { validateForm, validateAddress } from '../../shared/utility';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (token, userID, address, firstName, lastName, phoneNumber, email) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    userID,
    address,
    firstName,
    lastName,
    phoneNumber,
    email
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  }
}

export const authFailConfirm = () => {
  return {
    type: actionTypes.AUTH_FAIL_CONFIRM
  }
}

export const logout = () => {
  localStorage.removeItem('sessionID');
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const addressOpStart = (rmv) => {
  return {
    type: actionTypes.ADDRESS_OP_START,
    rmv
  }
}
export const addressOpFail = (error) => {
  return {
    type: actionTypes.ADDRESS_OP_FAIL,
    error
  }
}
export const addressOpSuccess = (isAdd, addressID, address) => {
  return {
    type: actionTypes.ADDRESS_OP_SUCCESS,
    isAdd,
    addressID,
    address
  }
}
export const addressOpClearError = () => {
  return {
    type: actionTypes.ADDRESS_OP_CLEAR_ERROR
  }
}

export const auth = (data, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    let valid = validateForm(data, isSignup); 
    if(valid.valid) {
      let url = '/users/login';
      if(isSignup) url = '/users/signup';
      axios.post(url, data)
        .then(response => {
          if(response.data.status === 'ok' && response.headers['x-auth']  && response.headers['x-auth'] !== undefined) {
            localStorage.setItem('sessionID', response.data.sessionID); 
            let address = [];
            if(!isSignup) address = response.data.data.address;
            dispatch(authSuccess(response.headers['x-auth'], response.data.data.userID, address , response.data.data.firstName, response.data.data.lastName, response.data.data.phoneNumber, response.data.data.email));
          } else {
            dispatch(authFail('Something went wrong!'));
          }
        })
        .catch(error => {
          if(error.response) {
            if(error.response.data.status === 'error') {
              dispatch(authFail(error.response.data.error.e || error.response.data.error.msg));
            }
          } else {
            dispatch(authFail('Something went wrong!'));
          }
        });
    } else {
      dispatch(authFail(valid.msg));
    }
  }
}

export const authCheckState = (token) => {
  return dispatch => {
    dispatch(authStart());
    const sessionID = localStorage.getItem('sessionID');
    if(!sessionID) {
      dispatch(logout());
    } else {
      axios.get(`/session/user/${sessionID}`)
        .then(response => {
          if(response.data.status === 'ok' && response.headers['x-auth']  && response.headers['x-auth'] !== undefined) {
            dispatch(authSuccess(response.headers['x-auth'], response.data.userID, response.data.address, response.data.firstName, response.data.lastName, response.data.phoneNumber, response.data.email));     
          } else {
            throw new Error('error');
          }
        })
        .catch(error => {
          dispatch(onLogout(token));
        });
    }
  }
}

export const onLogout = (token) => {
  return dispatch => {
    const sessionID = localStorage.getItem('sessionID');
    const headers = {
      'x-auth': token 
    }
    dispatch(authStart());
    if(!sessionID) {
      dispatch(logout());
    } else {
      axios.delete(`/users/logout/${sessionID}`, {headers})
        .then(() => {
          dispatch(logout());
        })
        .catch(() => {
          dispatch(logout());
        });
    }
  }
}

export const addAddress = (token, address) => {
  const valid = validateAddress(address);
  return dispatch => {
    const headers = {
      'x-auth': token 
    }
    if(valid.valid) {
      let body = valid.data;
      body.sessionID = localStorage.getItem('sessionID');
      dispatch(addressOpStart(false));
      axios.post(`/users/add-address`, body, {headers})
        .then((response) => {
          if(response.data.status === 'ok') {
            dispatch(addressOpSuccess(true, response.data.data._id, response.data.data));
          } else {
            throw new Error();
          }
        })
        .catch(() => {
          dispatch(addressOpFail('Unable Add Address!'));
        });
    } else {
      dispatch(addressOpFail(valid.msg));
    }
  } 
}

export const rmvAddress = (token, addressID) => {
  return dispatch => {
    const headers = {
      'x-auth': token 
    }
    const body = {
      addressID,
      sessionID: localStorage.getItem('sessionID')
    }
    dispatch(addressOpStart(true));
    axios.post(`/users/rmv-address`, body, {headers})
      .then((response) => {
        if(response.data.status === 'ok') {
          dispatch(addressOpSuccess(false, response.data.data._id));
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        dispatch(addressOpFail('Unable Remove Address!'));
      });
  }
}
