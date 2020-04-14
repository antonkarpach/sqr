import React, { Component } from 'react';
import { browserHistory} from "react-router";
import { request, onerror } from '../../lib/request';
import connect from "react-redux/es/connect/connect";

class AuthForm extends Component {
  authVK = () => window.VK.Auth.login(({ session }) => session && this.authOutside(session.user.id, session.user.first_name, 1));
  authFB = () => window.FB.login(() => window.FB.api('/me', res => this.authOutside(res.id, res.name.match(/[^ ]+/i)[0], 2)));
  authOutside = (outsideUserId, firstName, authType) => {
    let data = new FormData();
    data.append('outside-user', JSON.stringify({ outsideUserId, firstName, authType }));
    request('/api/user/login', data)
      .then(() => browserHistory.push('profile'))
      .catch(onerror);
  };

  submit = (event) => {
    event.preventDefault();

    let warning = this.isValid(this.form);
    if(warning) this.message.textContent = warning;
    else request('/api/user/login', new FormData(this.form))
      .then(res => {
        if(res.warning) this.message.textContent = res.warning;
        else browserHistory.push('profile');
      }).catch(onerror);
  };

  isValid = (form) => {
    if(!form.username.value) return this.lang.loginRequired;
    if(!form.password.value) return this.lang.passwordRequired;
  };

  render = () => {
    this.lang = this.props.store.lang.login;
    return (
      <form onSubmit={this.submit} ref={f => this.form = f} className="AuthForm">
        <h1 className="header">{this.lang.entrance}</h1>
        <div className="AuthForm__container">
          <div className="AuthForm__username">Имя</div>
          <input name="username" className="AuthForm__usernameInput" placeholder={this.lang.login}/>
          <div className="AuthForm__password">Пароль</div>
          <input type="password" name="password" className="AuthForm__passwordInput" placeholder={this.lang.password}/>
          <div className="AuthButtons">
            <button type="submit">{this.lang.enter}</button>
            <div className="anotherBn1">
              <img src={require('../img/any/vk-brands.svg')} onClick={this.authVK} height="40"/>
            </div>
            <div className="anotherBn2">
              <img src={require('../img/any/facebook-white.svg')} onClick={this.authFB} height="40"/>
            </div>
          </div>
          <h5 className="text-danger" ref={m => this.message = m}/>
          <h5 className="">{this.props.store.lang.login.authHelp}</h5>
          <div className="regCont">
            <a className="regBtn" href="/registration" >Регистрация</a>
          </div>
        </div>
      </form>
    );
  }
}

export default connect(store => ({ store }), null)(AuthForm);