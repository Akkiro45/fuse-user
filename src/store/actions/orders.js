import axios from '../../axios';

import * as actionTypes from './actionTypes';

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}
export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error
  }
}
export const fetchOrdersSuccess = (orders, isOrders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders,
    isOrders
  }
}
export const clearOrders = () => {
  return {
    type: actionTypes.CLEAR_ORDERS
  }
}

export const cartOpStart = () => {
  return {
    type: actionTypes.CART_OP_START
  }
}
export const cartOpFail = (error) => {
  return {
    type: actionTypes.CART_OP_FAIL,
    error
  }
}
export const cartErrorConfirmed = () => {
  return {
    type: actionTypes.CART_ERROR_CONFIRMED
  }
}

export const cartDelSuccess = (orderID) => {
  return {
    type: actionTypes.CART_DEL_SUCCESS,
    orderID
  }
}

export const orderPlaceSuccess = (orderID) => {
  return {
    type: actionTypes.ORDER_PLACE_SUCCESS,
    orderID
  }
}
export const orderConfirmed = () => {
  return {
    type: actionTypes.ORDER_CONFIRMED
  }
}

export const cancelOrderStart = (orderID) => {
  return {
    type: actionTypes.CANCEL_ORDER_START,
    orderID
  }
}
export const cancelOrderFail = (error, orderID) => {
  return {
    type: actionTypes.CANCEL_ORDER_FAIL,
    error,
    orderID
  }
}
export const cancelOrderSuccess = (orderID, status) => {
  return {
    type: actionTypes.CANCEL_ORDER_SUCCESS,
    orderID,
    status
  }
}

export const fetchCart = (token) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    const headers = {
      'x-auth': token 
    }
    axios.get(`/users/cart`, {headers})
      .then(response => {
        if(response.data.status === 'ok') {
          dispatch(fetchOrdersSuccess(response.data.data, false));
        } else {
          dispatch(fetchOrdersFail('Unable fetch!'));
        }
      })
      .catch(error => {
        dispatch(fetchOrdersFail('Unable fetch!'));
      });
  }
}

export const fetchOrders = (token, pageNumber, pageSize) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    const headers = {
      'x-auth': token 
    }
    axios.get(`/users/orders?pageNumber=${pageNumber}&pageSize=${pageSize}`, {headers})
      .then(response => {
        if(response.data.status === 'ok') {
          dispatch(fetchOrdersSuccess(response.data.data, true));
        } else {
          dispatch(fetchOrdersFail('Unable fetch!'));
        }
      })
      .catch(error => {
        dispatch(fetchOrdersFail('Unable fetch!'));
      });
  }
}

export const onDelCart = (token, orderID) => {
  return dispatch => {
    const headers = {
      'x-auth': token 
    }
    const data = {
      orderID
    }
    dispatch(cartOpStart());
    axios.delete(`/users/del/order`, {headers, data})
      .then((response) => {
        if(response.data.status === 'ok') {
          dispatch(cartDelSuccess(response.data.data));
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        dispatch(cartOpFail('Unable to Delete!'));
      });
  }
}

export const onOrder = (token, body) => {
  return dispatch => {
    dispatch(cartOpStart());
    const headers = {
      'x-auth': token 
    }
    axios.post(`/users/status`, body, {headers})
      .then(response => {
        if(response.data.status === 'ok') {
          dispatch(orderPlaceSuccess(body.orderID));
        } else {
          dispatch(cartOpFail('Unable to Place Order!'));
        }
      })
      .catch(error => {
        dispatch(cartOpFail('Unable to Place Order!'));
      });
  }
}

export const cancelOrder = (token, orderID) => {
  return dispatch => {
    const headers = {
      'x-auth': token 
    }
    const data = {
      type: 3,
      orderID
    }
    dispatch(cancelOrderStart(orderID));
    axios.post(`/users/status`, data, {headers})
      .then((response) => {
        if(response.data.status === 'ok') {
          dispatch(cancelOrderSuccess(orderID, response.data.data.status));
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        dispatch(cancelOrderFail('Unable to Cancel!', orderID));
      });
  }
}