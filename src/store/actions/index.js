export {
  auth,
  authFail,
  logout,
  authFailConfirm,
  authCheckState,
  onLogout,
  addAddress,
  addressOpClearError,
  rmvAddress
} from './auth';

export {
  fetchShops,
  fetchMoreShops,
  setFilters,
  unsetFilters,
  fetchShop
} from './home';

export {
  setActiveCat,
  addToCart,
  clearCartError,
  setShopSrchName
} from './shop';

export {
  fetchCart,
  fetchOrders,
  clearOrders,
  onDelCart,
  cartErrorConfirmed,
  onOrder,
  orderConfirmed,
  cancelOrder
} from './orders';