import React, { Component } from 'react';
import { connect } from 'react-redux';

import module from './Address.module.css';
import { convertAddress } from '../../../../shared/utility';
import CrossIcon from '../../../UI/Icons/Cross/Cross';
import * as actions from '../../../../store/actions/index';
import ErrorHandler from '../../../../hoc/ErrorHandler/ErrorHandler';
import Spinner from '../../../UI/Spinner/Spinner'; 

class Address extends Component {
  close = () => {
    if(this.props.error) {
      this.props.addressOpClearError();
    }
  }
  render() {
    let error = (
      <div className={module.Error} >
        Unable To Delete!
      </div>
    );
    let show = null;
    if(this.props.rmv) {
      if(this.props.error) {
        show = error;
      }
      if(this.props.loading) {
        show = <Spinner />
      }
    }
    let ex = (
      <ErrorHandler 
        error={show}
        errorConformedhandler={this.close}
      />
    );
    return (
      <div className={module.Address} >
        {ex}
        <div className={module.Container} >
          <div className={module.Addrs} >
            {convertAddress(this.props.address)}
          </div>
          <div className={module.CrossIcon} >
            <div className={module.Icon} >
              <CrossIcon onClick={() => this.props.rmvAddress(this.props.token, this.props.address._id)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    loading: state.auth.addressLoading,
    error: state.auth.addressError,
    success: state.auth.addressOp,
    rmv: state.auth.rmv
  }
}
const mapDispatchToProps = dispatch => {
  return {
    rmvAddress: (token, addressID) => dispatch(actions.rmvAddress(token, addressID)),
    addressOpClearError: () => dispatch(actions.addressOpClearError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Address);