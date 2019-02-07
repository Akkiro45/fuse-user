import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  carts: [],
  orders: [],
  error: null,
  loading: false,
  cartError: null,
  ordered: false,
  cancelLoading: false,
  cancelError: null,
  currID: null
}
const fetchOrdersStart = (state, action) => {
  return updateObject(state, { carts: [], error: null, loading: true });
}
const fetchOrdersFail = (state, action) => {
  return updateObject(state, { carts: [], orders: [], error: action.error, loading: false });
}
const fetchOrdersSuccess = (state, action) => {
  let obj = {
    carts: action.orders
  };
  if(action.isOrders) {
    let orders = state.orders;
    orders = orders.concat(action.orders);
    let done = false;
    if(action.orders.length === 0) {
      done = true;
    }
    obj = {
      orders,
      done
    }
  }
  return updateObject(state, { ...obj, error: null, loading: false });
}
const clearOrders = (state, action) => {
  return updateObject(state, { orders: [], done: false });
}

const cartOpStart = (state, action) => {
  return updateObject(state, { cartError: null, loading: true, ordered: false });
}
const cartOpFail = (state, action) => {
  return updateObject(state, { cartError: action.error, loading: false, ordered: false });
}
const cartDelSuccess = (state, action) => {
  let orders = [...state.carts];
  orders = orders.filter(ord => ord._id !== action.orderID );
  return updateObject(state, { cartError: null, loading: false, carts: orders });
}
const cartErrorConfirmed = (state, action) => {
  return updateObject(state, { cartError: null, ordered: false });
}

const orderPlaceSuccess = (state, action) => {
  let orders = [...state.carts];
  orders = orders.filter(ord => ord._id !== action.orderID );
  return updateObject(state, { cartError: null, carts: orders, loading: false, ordered: true });
}
const orderPlaceConfirmed = (state, action) => {
  return updateObject(state, { ordered: false });
}

const cancelOrderStart = (state, action) => {
  return updateObject(state, { cancelError: null, cancelLoading: true, currID: action.orderID });
}
const cancelOrderFail = (state, action) => {
  return updateObject(state, { cancelError: action.error, cancelLoading: false, currID: action.orderID });
}
const cancelOrderSuccess = (state, action) => {
  let orders = [...state.orders];
  for(let i=0; i<orders.length; i++) {
    if(orders[i]._id === action.orderID) {
      orders[i].status = action.status;
      break;
    }
  }
  return updateObject(state, { cancelLoading: false, orders, currID: null });
}

const authLogout = (state, action) => {
  return updateObject(state, {
    carts: [],
    orders: [],
    error: null,
    loading: false,
    cartError: null,
    ordered: false,
    cancelLoading: false,
    cancelError: null,
    currID: null
  });
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action);
    case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
    case actionTypes.CART_OP_START: return cartOpStart(state, action);
    case actionTypes.CART_OP_FAIL: return cartOpFail(state, action);
    case actionTypes.CART_DEL_SUCCESS: return cartDelSuccess(state, action);
    case actionTypes.CART_ERROR_CONFIRMED: return cartErrorConfirmed(state, action);
    case actionTypes.ORDER_PLACE_SUCCESS: return orderPlaceSuccess(state, action);
    case actionTypes.ORDER_CONFIRMED: return orderPlaceConfirmed(state, action);
    case actionTypes.CLEAR_ORDERS: return clearOrders(state, action);
    case actionTypes.CANCEL_ORDER_START: return cancelOrderStart(state, action);
    case actionTypes.CANCEL_ORDER_FAIL: return cancelOrderFail(state, action);
    case actionTypes.CANCEL_ORDER_SUCCESS: return cancelOrderSuccess(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    default: return state;
  }
}

export default reducer;