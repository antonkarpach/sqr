import React, {Component} from 'react';
import {connect} from "react-redux";

import {request, onerror} from '../../lib/request';

import './Header.scss';

import logoImg2 from '../img/logo-header-blue-short.svg';
import logoImg1 from '../img/logo-header-blue.svg'

import userIcon from '../img/any/user.svg';
import doorIcon from '../img/any/sign-out-alt-solid.svg';
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
    if (this.props.store.user.authType === 1) window.VK.Auth.logout();
    if (this.props.store.user.authType === 2) window.FB.logout();
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
      <div className="Header__container">
        <div className="Header">
          <a href="/" className='Header__logo'>
            <div className="logoImg1">
              <img src={logoImg1}/>
            </div>
            <div className="logoImg2">
              <img src={logoImg2}/>
            </div>
          </a>
          <div className="Header__block">
            <form action='/search' className="Header__block__search">
              <div className="ImageIcon1">
                <img src={require("../img/any/search-solid.svg")}
                     onClick={() => document.forms[0].submit()}/>
              </div>
              <input name={'query'} className="Input"/>
            </form>
            <div className="Header__block__actions">
              <div className="Header__actions__settings">
                {<div className="Settings"
                      style={this.state.settingsOpened ? {
                        opacity: 1,
                        visibility: 'visible',
                        position: 'absolute'
                      } : {opacity: 0, visibility: 'hidden', position: 'absolute', bottom: '3rem'}}>
            <span onClick={() => this.translate(0)}
                  className={this.props.store.user && !this.props.store.user.lang ? 'selected' : 'unselected'}>ru </span>|
                  <span onClick={() => this.translate(1)}
                        className={this.props.store.user && this.props.store.user.lang === 1 ? 'selected' : 'unselected'}> en </span>|
                  <span onClick={() => this.translate(2)}
                        className={this.props.store.user && this.props.store.user.lang === 2 ? 'selected' : 'unselected'}> 中文</span>
                </div>}
                <div className="ImageIcon">
                  <img src={require("../img/any/settings.svg")}
                       onClick={() => this.state.settingsOpened || this.setState({settingsOpened: true})}/>
                </div>
              </div>
              {
                this.props.store.user &&
                <a className="ImageIcon" href={this.props.store.user.guest ? '/login' : '/profile'}>
                  <img src={this.props.store.user.guest ? doorIcon : userIcon}/>
                </a>
              }
              <div className="ImageIcon">
                {this.props.store.user && this.props.store.user.guest ||
                <a onClick={this.logout}>
                  <img src={doorIcon}/>
                </a>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(store => ({store}), null)(Header);
