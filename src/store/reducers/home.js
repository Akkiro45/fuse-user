import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  shops: [],
  loading: false,
  error: null,
  moreLoading: false,
  done: false,
  filters: {},
  shop: null,
  shopError: null
}
const onFetchStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null,
    done: false
  });
}
const fetchMoreStart = (state, action) => {
  return updateObject(state, { error: null, moreLoading: true, done: false });
}
const onFetchFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
}
const fetchMoreFail = (state, action) => {
  return updateObject(state, { error: action.error, moreLoading: false });
}
const onFetchSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: null,
    shopError: null,
    shops: action.shops
  });
}
const fetchMoreSucessWith = (state, action) => {
  let shops = state.shops;
  if(!shops) {
    shops = [];
  }
  return updateObject(state, { shops: shops.concat(action.shops), moreLoading: false });
}

const fetchMoreSucessWithout = (state, action) => {
  return updateObject(state, { moreLoading: false, done: true });
}
const setFilters = (state, action) => {
  return updateObject(state, { filters: action.filters, shops: [], done: false });
}
const unsetFilters = (state, action) => {
  return updateObject(state, { filters: {} });
}

const fetchShopStart = (state, action) => {
  return updateObject(state, { loading: true, shopError: null, shop: null });
}
const fetchShopFail = (state, action) => {
  return updateObject(state, { loading: false, shopError: action.error });
}
const fetchShopSuccess = (state, action) => {
  return updateObject(state, { loading: false, shopError: null, shop: action.shop });
}

const authLogout = (state, action) => {
  return updateObject(state, {
    shops: [],
    loading: false,
    error: null,
    moreLoading: false,
    done: false,
    filters: {},
    shop: null,
    shopError: null
  });
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.FETCH_START: return onFetchStart(state, action);
    case actionTypes.FETCH_FAIL: return onFetchFail(state, action);
    case actionTypes.FETCH_SUCCESS: return onFetchSuccess(state, action);
    case actionTypes.SHOP_MORE_FETCH_START: return fetchMoreStart(state, action);
    case actionTypes.SHOP_MORE_FETCH_FAIL: return fetchMoreFail(state, action);
    case actionTypes.SHOP_MORE_FETCH_SUCCESS_WITH: return fetchMoreSucessWith(state, action);
    case actionTypes.SHOP_MORE_FETCH_SUCCESS_WITHOUT: return fetchMoreSucessWithout(state, action);
    case actionTypes.SET_FILTERS: return setFilters(state, action);
    case actionTypes.UNSET_FILTERS: return unsetFilters(state, action);
    case actionTypes.FETCH_SHOP_START: return fetchShopStart(state, action);
    case actionTypes.FETCH_SHOP_FAIL: return fetchShopFail(state, action);
    case actionTypes.FETCH_SHOP_SUCCESS: return fetchShopSuccess(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    default: return state;
  }
}

export default reducer;