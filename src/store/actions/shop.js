import axios from '../../axios';

import * as actionTypes from './actionTypes';

export const setActiveCat = (category) => {
  return {
    type: actionTypes.ACTIVE_CATEGORY,
    category
  }
}

export const addToCartStart = () => {
  return {
    type: actionTypes.ADD_CART_START
  }
}
export const addToCartFail = (error) => {
  return {
    type: actionTypes.ADD_CART_FAIL,
    error
  }
}
export const addToCartSuccess = () => {
  return {
    type: actionTypes.ADD_CART_SUCCESS
  }
}
export const clearCartError = () => {
  return {
    type: actionTypes.CLEAR_CART_ERROR
  }
}

export const setShopSrchName = (shopSrchName) => {
  return {
    type: actionTypes.SET_SHOP_SRCH_NAME,
    shopSrchName
  }
}

export const addToCart = (token, body) => {
  return dispatch => {
    dispatch(addToCartStart());
    const headers = {
      'x-auth': token 
    }
    axios.post(`/order/create-order`, body, {headers})
      .then(response => {
        if(response.data.status === 'ok') {
          dispatch(addToCartSuccess());
        } else {
          dispatch(addToCartFail('Unable to add'));
        }
      })
      .catch(error => {
        dispatch(addToCartFail('Unable to add'));
      });
  }
}