import axios from '../../axios';

import * as actionTypes from './actionTypes';

export const fetchStart = () => {
  return {
    type: actionTypes.FETCH_START
  }
}

export const fetchFail = (error) => {
  return {
    type: actionTypes.FETCH_FAIL,
    error
  }
}

export const fetchSuccess = (shops) => {
  return {
    type: actionTypes.FETCH_SUCCESS,
    shops
  }
}

export const fetcMoreStart = () => {
  return {
    type: actionTypes.SHOP_MORE_FETCH_START
  }
}

export const fetchMoreSuccessWithShops = (shops) => {
  return {
    type: actionTypes.SHOP_MORE_FETCH_SUCCESS_WITH,
    shops
  }
}

export const fetchMoreSuccessWithoutShops = () => {
  return {
    type: actionTypes.SHOP_MORE_FETCH_SUCCESS_WITHOUT
  }
}

export const fetchMoreFail = (error) => {
  return {
    type: actionTypes.SHOP_MORE_FETCH_FAIL,
    error
  }
}
export const setFilters = (filters) => {
  return {
    type: actionTypes.SET_FILTERS,
    filters
  }
}
export const unsetFilters = () => {
  return {
    type: actionTypes.UNSET_FILTERS
  }
} 
export const fetchShopStart = () => {
  return {
    type: actionTypes.FETCH_SHOP_START
  }
}
export const fetchShopFail = (error) => {
  return {
    type: actionTypes.FETCH_SHOP_FAIL,
    error
  }
}
export const fetchShopSuccess = (shop) => {
  return {
    type: actionTypes.FETCH_SHOP_SUCCESS,
    shop
  }
}

export const fetchShops = (body, pageNumber, pageSize) => {
  return dispatch => {
    dispatch(fetchStart());
    axios.post(`/users/shops?pageNumber=${pageNumber}&pageSize=${pageSize}`, body)
      .then(response => {
        if(response.data.status === 'ok') {
          dispatch(fetchSuccess(response.data.data));
        } else {
          dispatch(fetchFail('Something went wrong!'));
        }
      })
      .catch(error => {
        dispatch(fetchFail('Something went wrong!'));
      });
  }
}

export const fetchMoreShops = (body, pageNumber, pageSize) => {
  return dispatch => {
    dispatch(fetcMoreStart());
    axios.post(`/users/shops?pageNumber=${pageNumber}&pageSize=${pageSize}`, body)
      .then(response => {
        if(response.data.data.length > 0)
          dispatch(fetchMoreSuccessWithShops(response.data.data));
        else 
          dispatch(fetchMoreSuccessWithoutShops());
      })
      .catch(error => {
        dispatch(fetchMoreFail(error));
      });
  }
}

export const fetchShop = (shopSrchName) => {
  return dispatch => {
    dispatch(fetchShopStart());
    axios.get(`/users/shop?shopSrchName=${shopSrchName}`)
      .then(response => {
        if(response.data.status === 'ok') {
          dispatch(fetchShopSuccess(response.data.data));
        } else {
          dispatch(fetchShopFail('Unable to fetch shop data!'));
        }
      })
      .catch(error => {
        dispatch(fetchShopFail('Unable to fetch shop data!'));
      })
  }
}