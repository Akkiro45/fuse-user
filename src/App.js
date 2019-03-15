import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Aux from './hoc/Auxx/Auxx';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import * as actions from './store/actions/index';
import SpinnerPage from './components/UI/SpinnerPage/SpinnerPage';
import Signup from './container/Auth/Signup/Signup';
import Signin from './container/Auth/Signin/Signin';
import Logout from './container/Auth/Logout/Logout';
import AsyncLayout from './container/Layout/Layout';

const AsyncTAC = asyncComponent(() => {
  return import('./components/TAC/TAC');
});
const AsyncPrivacyPolicy = asyncComponent(() => {
  return import('./components/TAC/UserPrivacyPolicy/UserPrivacyPolicy');
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup(this.props.token);
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth/signup" component={Signup} />
        <Route path="/auth/signin" component={Signin} />
        <Route path="/auth/tandc/privacy-policy" component={AsyncPrivacyPolicy} />
        <Route path="/auth/tandc" component={AsyncTAC} />
        <Route path="/" exact component={() => <AsyncLayout type='home' />} />
        <Route path="/" component={() => <AsyncLayout type='shop' />} />
        <Redirect to="/" />
      </Switch>
    );
    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/auth/logout" component={Logout} />
          <Route path="/auth/tandc/privacy-policy" component={AsyncPrivacyPolicy} />
          <Route path="/auth/tandc" component={AsyncTAC} />
          <Route path="/cart" component={() => <AsyncLayout type='cart' />} />
          <Route path="/profile" component={() => <AsyncLayout type='profile' />} />
          <Route path="/" exact component={() => <AsyncLayout type='home' />} />
          <Route path="/" component={() => <AsyncLayout type='shop' />} />
          <Redirect to="/" />
        </Switch>
      );
    }
    if(this.props.loading) {
      routes = ( <SpinnerPage /> );
    }
    return (
      <Aux>
        {routes}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    loading: state.auth.loading,
    token: state.auth.token,
    shopSrchName: state.shop.shopSrchName
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: (token) => dispatch(actions.authCheckState(token))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
