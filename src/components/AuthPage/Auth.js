import React, { Component } from 'react';
import {browserHistory} from "react-router";
import {connect} from "react-redux";

import AuthForm from './AuthForm';

import './AuthPage.scss';

class AuthPage extends Component {
  render = () => {
    let user = this.props.store.user;
    if(!user) return null;
    if(!user.guest) {
      browserHistory.push('/profile');
      return null;
    }
    return (
      <div className="AuthPage">
        <AuthForm/>
      </div>
    );
  }
}

export default connect(store => ({ store }), null)(AuthPage);