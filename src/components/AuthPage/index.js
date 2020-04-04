import React, { Component } from 'react';
import {browserHistory} from "react-router";
import {connect} from "react-redux";

import AuthForm from './AuthForm';
import RegForm from './RegForm';

import './AuthPage.css';

class AuthPage extends Component {
  render = () => {
    let user = this.props.store.user;
    if(!user) return null;
    if(!user.guest) {
      browserHistory.push('/profile');
      return null;
    }
    return (
      <div className="text-center col-3">
        <AuthForm/>
        <h5 className="mt-3 mb-2 text-left">{this.props.store.lang.login.authHelp}</h5>
        <RegForm/>
      </div>
    );
  }
}

export default connect(store => ({ store }), null)(AuthPage);