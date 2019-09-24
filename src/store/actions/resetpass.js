import axios from '../../axios';
import { SET, SET_TOKEN } from './actionTypes';
import { startLoading, stopLoading } from './index';

export const set = (done, error) => {
  return {
    type: SET,
    done,
    error
  }
}

export const sendMail = (email) => {
  return dispatch => {
    const data = {
      email,
      type: 'user'
    };
    dispatch(startLoading());
    axios.post('/reset/forgot-password', data)
      .then(response => {
        // console.log(response);
        if(response.data.status === 'ok') {
          dispatch(set(true, null));
          dispatch(stopLoading());
        } else {
          dispatch(set(false, 'Something went wrong!'));
          dispatch(stopLoading());
        }
      })
      .catch(error => {
        dispatch(set(false, error.response.data.error.msg));
        dispatch(stopLoading());
      });
  }
}

export const setToken = (token, userID) => {
  return {
    type: SET_TOKEN,
    token,
    userID
  }
}

export const validateToken = (token) => {
  return dispatch => {
    dispatch(startLoading());
    axios.post('/reset/check/' + token)
      .then(response => {
        if(response.data.status === 'ok') {
          dispatch(setToken(token, response.data.data.userID));
        }
        dispatch(stopLoading());
      })
      .catch(error => {
        dispatch(stopLoading());
      })
  }
}

export const resetPassword = (password, token) => {
  return dispatch => {
    const data = {
      token,
      password,
      type: 'user'
    }
    dispatch(startLoading());
    axios.patch('/reset/password', data)
      .then(response => {
        dispatch(stopLoading());
        if(response.data.status === 'ok') {
          dispatch(set(true, null));
        } else {
          dispatch(set(false, 'Something went wrong!'));
        }
      })
      .catch(error => {
        dispatch(stopLoading());
        dispatch(set(false, error.response.data.error.msg));
      })
  }
}
