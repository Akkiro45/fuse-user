import React, { Component } from 'react';
import { connect } from 'react-redux'; 

import module from './ResetPass.module.css';
import { getRInput, updateObject } from '../../shared/utility';
import Button from '../UI/Button/Button';
import { validateToken, set, resetPassword } from '../../store/actions/index';
import Spinner from '../UI/Spinner/Spinner';
import BanIcon from '../UI/Icons/Ban/Ban';
import CheckIcon from '../UI/Icons/Check/Check';

class ResetPass extends Component {
  state = {
    controls: {
      password: {
        type: 'password',
        placeholder: 'Password',
        value: '',
        name: 'password',
        minLength: '8',
        maxLength: '60',
        required: true,
        fontsize: '14px',
        bradius: '4px'
      },
      confirmPassword: {
        type: 'password',
        placeholder: 'Confirm Password',
        value: '',
        name: 'confirmPassword',
        minLength: '8',
        maxLength: '60',
        required: true,
        fontsize: '14px',
        bradius: '4px'
      }
    },
    error: null
  }

  componentDidMount() {
    this.props.set(false, null);
    this.props.onValidateToken(this.props.location.search.split('=')[1]);
  }

  inputChangeHandler = (e) => {
    const updatedField = updateObject(this.state.controls[e.target.name], { value: e.target.value });
    const updatedControls = updateObject(this.state.controls, { [e.target.name]: updatedField });
    this.setState({ controls: updatedControls, error: null });
  }

  onChangePasswordVisiblity = () => {
    this.setState(prevState => {
      const type = prevState.controls.password.type === 'password' ? 'text' : 'password'; 
      return {
        controls: {
          password: {
            ...prevState.controls.password,
            type
          },
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            type
          }
        }
      }
    });
  }
  onSubmit = () => {
    const pass1 = this.state.controls.password.value;
    const pass2 = this.state.controls.confirmPassword.value;
    let error = null
    if(pass1.length < 8 || pass2.length < 8) error = 'Password length must be greater than or equal to 8!';
    if(pass1 !== pass2) error = 'Please enter the same password in both field!'; 
    if(error) {
      this.setState({ error });
    } else {
      this.props.onResetPassword(pass1, this.props.token);
    }
  }

  render() {
    const loginLink = `${window.location.origin}/auth/signin`;
    const error = (
      <div className={module.Error} >
        {this.state.error || this.props.error}
      </div>
    );
    let content = (
      <div>
        <div className={module.Text} >
          Reset Password
        </div>
        <div className={module.Inputs} >
          <div className={module.Input} >
            {getRInput(this.state.controls.password, this.inputChangeHandler)}
          </div>
          <div className={module.Input} >
            {getRInput(this.state.controls.confirmPassword, this.inputChangeHandler)}
          </div>
          <div className={module.Password} onClick={this.onChangePasswordVisiblity} >
            {this.state.controls.password.type === 'password' ? 'Show' : 'Hide'} password
          </div>
          {error}
          <div className={module.Button} >
            <Button bradius='4px' onClick={this.onSubmit} >Sumbit</Button>
          </div>
        </div>
      </div>
    );
    if(this.props.loading) {
      content = <Spinner />
    } else if(this.props.done) {
      content = (
        <div>
          <div className={module.Icon} >
            <CheckIcon />
          </div>
          <b>New Password have been set successfully!</b>  
          <div className={module.Msg} >
            click on <a href={loginLink} >{loginLink}</a> to login!
          </div>
        </div>
      );
    } else if(!this.props.token) {
      content = (
        <div className={module.Invalid} >
          <div className={module.Icon} >
            <BanIcon />
          </div>
          Invalid Token
          <div className={module.Msg} >
            Your link must have expired.
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className={module.Header} >
          Fuse
        </div>
        <div className={module.Container} >
          {content}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading.loading,
    token: state.resetpass.token,
    done: state.resetpass.done,
    error: state.resetpass.error
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onValidateToken: (token) => dispatch(validateToken(token)),
    set: (done, error) => dispatch(set(done, error)),
    onResetPassword: (password, token) => dispatch(resetPassword(password, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPass);