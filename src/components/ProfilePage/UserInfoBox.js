import React, { Component } from "react";
import { browserHistory} from "react-router";
import { request, onerror } from '../../lib/request';
import EditInPlace from "react-edit-in-place";
import {connect} from "react-redux";
import './UserInfoBox.scss';

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
      <div className="UserInfoBox">
        <div className="UserInfoBox__info">
          <div className="UserInfoBox__info__name">{this.props.user.username}</div>
          <img className="UserInfoBox__info__avatar" src={require('../img/avatar.png')}/>
        </div>
        <div className="UserInfoBox__change">
          <div className="UserInfoBox__change__place">{this.lang.firstName}<EditInPlace value={this.props.user.firstName || this.lang.notSpecified} name={'firstName'} onChange={this.edit}/></div>
          <div className="UserInfoBox__change__place">{this.lang.lastName}<EditInPlace value={this.props.user.secondName || this.lang.notSpecified} name={'secondName'} onChange={this.edit}/></div>
            <div className="UserInfoBox__change__place">{this.lang.sex}<EditInPlace value={this.props.user.sex || this.lang.notSpecified} name="sex" type="select" dropDownOptions={this.lang.sexOptions} onChange={this.edit}/></div>
              <div className="UserInfoBox__change__place">{this.lang.aboutMe}<EditInPlace value={this.props.user.about || this.lang.notSpecified} type={'textarea'} name={'about'} onChange={this.edit}/></div>
            <div><strong>{this.lang.numberOfCompanies}</strong>{this.props.numberOfCompanies}</div>
          <a href={`/companies/new${this.props.user.isOwner ? '' : `?${this.props.user.id}` }`}><button>{this.lang.createCompany}</button></a>
          { this.props.user.isAdmin && [<div className="blockAdmin"><strong>{this.lang.rights }</strong>{this.lang.admin}</div>, <a href="/admin"><button className="bntAdmin">{this.lang.administration}</button></a>]}
        </div>
      </div>
    )
  }
}

export default connect(
  store => ({ store }),
  dispatch => ({
    loadUser: user => dispatch({ type: 'LOAD_USER', payload: user })
  }))(UserInfoBox);