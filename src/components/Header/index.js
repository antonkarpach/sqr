import React, { Component } from 'react';
import {connect} from "react-redux";

import { request, onerror } from '../../lib/request';

import './Header.css';

import logoImg from '../img/logo.svg';
import userIcon from '../img/avatar_sm.png';
import doorIcon from '../img/door.png';
import {browserHistory} from "react-router";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {settingsOpened: false};
  }

  translate = lang => {
    request(`/api/lang/translate?${lang}`)
      .catch(onerror);
  };

  logout = () => {
    if(this.props.store.user.authType === 1) window.VK.Auth.logout();
    if(this.props.store.user.authType === 2) window.FB.logout();
    request('/api/user/logout')
      .then(() => browserHistory.push('/login'));
  };

  render = () => {
    let closeSettings = () => {
      this.setState({settingsOpened: false});
      document.removeEventListener('click', closeSettings);
    };
    this.state.settingsOpened && document.addEventListener('click', closeSettings);
    return (
      <div className="header">
        <a href="/"><img src={logoImg} className='imgLogo'/></a>
        <div className="actions float-right">
          <form action='/search' className={'d-inline'}>
            <input name={'query'} className={'search align-middle mb-0'}/>
            <img src={require("../img/search.png")} onClick={() => document.forms[0].submit()}/>
          </form>
          {this.props.store.user && <a href={this.props.store.user.guest ? '/login' : '/profile'}><img
            src={this.props.store.user.guest ? doorIcon : userIcon}/></a>}
          <img src={require("../img/settings2.png")}
               onClick={() => this.state.settingsOpened || this.setState({settingsOpened: true})}/>
          {<div className={'settings'}
                style={this.state.settingsOpened ? {opacity: 1, visibility: 'visible' } : { opacity: 0, visibility: 'hidden' }}>
            <span onClick={() => this.translate(0)}
                  className={this.props.store.user && !this.props.store.user.lang ? 'selected' : 'unselected'}>ru </span>|
            <span onClick={() => this.translate(1)}
                  className={this.props.store.user && this.props.store.user.lang === 1 ? 'selected' : 'unselected'}> en</span>
            { this.props.store.user && this.props.store.user.guest || <button onClick={this.logout} className={'mt-1'}>{this.props.store.lang.profile.exit}</button> }
          </div>}
        </div>
      </div>
    );
  }
}

export default connect(store => ({ store }), null)(Header);
