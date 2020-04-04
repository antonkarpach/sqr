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
      <form onSubmit={this.submit} ref={f => this.form = f} className={'form-auth'}>
        <h1>{this.lang.entrance}</h1>
        <input name="username" className="form-control" placeholder={this.lang.login}/>
        <input type="password" name="password" className="form-control" placeholder={this.lang.password}/>
        <table className="w-100">
          <td><button type="submit">{this.lang.enter}</button></td>
          <td width="40"><img src={require('../img/vk.png')} onClick={this.authVK} height="40"/></td>
          <td width="40"><img src={require('../img/facebook.png')} onClick={this.authFB} height="40"/></td>
        </table>
        <h5 className="text-danger" ref={m => this.message = m}/>
      </form>
    );
  }
}

export default connect(store => ({ store }), null)(AuthForm);