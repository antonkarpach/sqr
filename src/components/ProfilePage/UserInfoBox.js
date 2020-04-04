import React, { Component } from "react";
import { browserHistory} from "react-router";
import { request, onerror } from '../../lib/request';
import EditInPlace from "react-edit-in-place";
import {connect} from "react-redux";

class UserInfoBox extends Component {
  logout = () => {
    if(this.props.store.user.authType === 1) window.VK.Auth.logout();
    if(this.props.store.user.authType === 2) window.FB.logout();
    request('/api/user/logout')
      .then(() => browserHistory.push('/login'));
  };

  edit = (value, field) => {
    let data = new FormData();
    data.append('id', this.props.user.id);
    data.append('changes', JSON.stringify({ [field]: value }));
    request('/api/user/edit', data)
      .catch(onerror);
  };

  render = () => {
    this.lang = this.props.store.lang.profile;
    return (
      <div className="user-info col-3 p-5">
        <img className="avatar w-100" src={require('../img/avatar.png')}/>
        <span className="h1 mt-4 mb-4 d-block text-center">{this.props.user.username}</span>
        { this.props.user.isAdmin && [<div><strong>{this.lang.rights }</strong>{this.lang.admin}</div>, <a href="/admin"><button className={'mt-1'}>{this.lang.administration}</button></a>]}
        <hr/>
        {this.lang.firstName}<EditInPlace value={this.props.user.firstName || this.lang.notSpecified} name={'firstName'} onChange={this.edit}/><br/>
        {this.lang.lastName}<EditInPlace value={this.props.user.secondName || this.lang.notSpecified} name={'secondName'} onChange={this.edit}/><br/>
        {this.lang.sex}<EditInPlace value={this.props.user.sex || this.lang.notSpecified} name="sex" type="select" dropDownOptions={this.lang.sexOptions} onChange={this.edit}/><br/>
        {this.lang.aboutMe}<EditInPlace value={this.props.user.about || this.lang.notSpecified} type={'textarea'} name={'about'} onChange={this.edit}/><br/>
        <div className="table table-sm table-borderless w-100">
          <div><strong>{this.lang.numberOfCompanies}</strong>{this.props.numberOfCompanies}</div>
        </div>
        <a href={`/companies/new${this.props.user.isOwner ? '' : `?${this.props.user.id}` }`}><button>{this.lang.createCompany}</button></a>
        {this.props.user.isOwner && [<hr/>, <button onClick={this.logout} className={'mt-1'}>{this.lang.exit}</button>]}
      </div>
    )
  }
}

export default connect(
  store => ({ store }),
  dispatch => ({
    loadUser: user => dispatch({ type: 'LOAD_USER', payload: user })
  }))(UserInfoBox);