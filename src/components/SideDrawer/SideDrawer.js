import React from 'react';

import module from './SideDrawer.module.css';
import Backdrop from '../UI/Backdrop/Backdrop';
import Aux from '../../hoc/Auxx/Auxx';
import Filters from '../Home/Filters/Filters';

const sideDrawer = (props) => {
  let attachedClassses = [module.SideDrawer, module.Close];
  if (props.open) {
    attachedClassses = [module.SideDrawer, module.Open];
  }
  return (
  <Aux>
    <Backdrop show={props.open} onclick={props.closed} />
    <div className={attachedClassses.join(' ')}  >
      <Filters 
        isAuth={props.isAuth}
        fetchShops={props.fetchShops}
        closed={props.closed}
        address={props.address} 
        pageNumber={props.pageNumber}
        pageSize={props.pageSize}
        setFilters={props.setFilters}
        unsetFilters={props.unsetFilters}
        resetPageNumber={props.resetPageNumber}
        addAddressPopup={props.addAddressPopup} />
    </div>
  </Aux>
  );
} 

export default sideDrawer;