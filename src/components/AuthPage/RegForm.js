import React, { Component } from 'react';
import {browserHistory} from "react-router";
import { request, onerror } from '../../lib/request';
import connect from "react-redux/es/connect/connect";
import './RegForm.scss';

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
      <div className="RegForm">
        <div className="RegForm__container">
          <h1 className="header" >{this.lang.registration}</h1>
          <form onSubmit={this.submit} ref={f => this.form = f}>
            <div className="RegForm__container__email">Email</div>
            <input type="email" name="email" className="RegForm__containerInp"/>
            <div className="RegForm__container__login">{this.lang.login}</div>
            <input name="username" className="RegForm__containerInp"/>
            <div className="RegForm__container__Password">{this.lang.password}</div>
            <input type="password" name="password" className="RegForm__containerInp"/>
            <div className="RegForm__container__Password">{this.lang.passwordRepeat}</div>
            <input type="password" name="passwordRepeat" className="RegForm__containerInp"/>
            <button type="submit">{this.lang.register}</button>
            <h5 className="text-danger" ref={m => this.message = m}/>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(store => ({ store }), null)(RegForm);