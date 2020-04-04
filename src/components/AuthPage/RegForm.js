import React, { Component } from 'react';
import {browserHistory} from "react-router";
import { request, onerror } from '../../lib/request';
import connect from "react-redux/es/connect/connect";

class RegForm extends Component {
  lang = this.props.store.lang.login;

  submit = (event) => {
    event.preventDefault();

    let warning = this.isValid(this.form);
    if(warning) this.message.textContent = warning;
    else request('/api/user/register', new FormData(this.form))
      .then(res => {
        if(res.warning) this.message.textContent = res.warning;
        else browserHistory.push('/profile');
      }).catch(onerror);
  };

  isValid = (form) => {
    if(!form.email.value || !form.username.value || !form.password.value) return this.lang.allFieldsRequired;
    if(form.password.value !== form.passwordRepeat.value) return this.lang.wrongPasswordRepeat;
  };

  render = () => {
    this.lang = this.props.store.lang.login;
    return (
      <form onSubmit={this.submit} ref={f => this.form = f}>
        <h1>{this.lang.registration}</h1>
        <input type="email" name="email" className="form-control" placeholder="Email"/>
        <input name="username" className="form-control" placeholder={this.lang.login}/>
        <input type="password" name="password" className="form-control" placeholder={this.lang.password}/>
        <input type="password" name="passwordRepeat" className="form-control" placeholder={this.lang.passwordRepeat}/>
        <button type="submit">{this.lang.register}</button>
        <h5 className="text-danger" ref={m => this.message = m}/>
      </form>
    );
  }
}

export default connect(store => ({ store }), null)(RegForm);