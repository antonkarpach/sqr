import React, { Component } from 'react';
import {browserHistory} from "react-router";
import {connect} from "react-redux";

import RegForm from './RegForm';

import './AuthPage.scss';

class RegPage extends Component {
  render = () => {
    let user = this.props.store.user;
    if(!user) return null;
    if(!user.guest) {
      browserHistory.push('/profile');
      return null;
    }
    return (
      <div className="AuthPage">
        <RegForm/>
      </div>
    );
  }
}

export default connect(store => ({ store }), null)(RegPage);