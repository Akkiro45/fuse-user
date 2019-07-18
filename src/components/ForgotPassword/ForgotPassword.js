import React, { Component } from 'react';
import { connect } from 'react-redux';

import module from './ForgotPassword.module.css';
import { getRInput, updateObject, validateEmail } from '../../shared/utility';
import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner';
import Icon from '../UI/Icons/Check/Check';
import { sendMail, set } from '../../store/actions/index';

class ForgotPassword extends Component {
  state = {
    controls: {
      email: {
        type: 'email',
        placeholder: 'Email Address',
        value: '',
        name: 'email',
        minLength: '2',
        maxLength: 'none',
        required: true,
        fontsize: '14px',
        bradius: '4px'
      }
    },
    error: null
  }
  componentDidMount() {
    this.props.onSet(false, null);
  }

  inputChangeHandler = (e) => {
    const updatedField = updateObject(this.state.controls[e.target.name], { value: e.target.value });
    const updatedControls = updateObject(this.state.controls, { [e.target.name]: updatedField });
    this.setState({ controls: updatedControls, error: null });
  }

  onSumbit = () => {
    const email = this.state.controls.email.value;
    if(validateEmail(email)) {
      this.props.onSendMail(email);
    } else {
      this.setState({ error: 'Invalid Email Address' });
    }
  }
  render() {
    const error = (
      <div className={module.Error} >
        {this.state.error || this.props.error}
      </div>
    );
    let content = (
      <div>
        <div className={module.Text} >
          Forgot Password
        </div>
        <div className={module.Inputs} >
          Enter Registered email address!
          <div className={module.Input} >
            {getRInput(this.state.controls.email, this.inputChangeHandler)}
          </div>
          {error}
          <div className={module.Button} onClick={this.onSumbit} >
            <Button bradius='4px' >Sumbit</Button>
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
            <Icon />
          </div>
          Email has been sent to <b>{this.state.controls.email.value}</b> which contain link to reset your password!
          <div className={module.Note} >
            Link is valid for only 24hours and do not shear email/link with anyone.
          </div>
        </div>
      );
    }
    let ren = (
      <div>
        <div className={module.Header} >
          Fuse
        </div>
        <div className={module.Container} >
          {content}
        </div>
      </div>
    );
    return ren;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading.loading,
    done: state.resetpass.done,
    error: state.resetpass.error
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onSendMail: (email) => dispatch(sendMail(email)),
    onSet: (done, error) => dispatch(set(done, error)) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);