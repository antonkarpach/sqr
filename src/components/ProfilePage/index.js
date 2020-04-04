import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import {connect} from 'react-redux';
import { request, onerror } from '../../lib/request';

import CompaniesTable from './CompaniesTable';
import UserInfoBox from './UserInfoBox';

import './ProfilePage.css';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    if(props.params.userId) this.getUser();
    else this.getCompanies();
    this.state = {};
  }

  getCompanies() {
    request('/api/user/companies')
      .then(res => this.setState(res))
      .catch(onerror);
  }

  getUser() {
    let data = new FormData();
    data.append('id', this.props.params.userId);
    request('/api/user/get', data)
      .then(res => this.setState(res))
      .catch(onerror);
  }

  render = () => {
    let user;
    if(this.props.params.userId) user = this.state.user;
    else {
      user = this.props.store.user;
      if(user)
        if(user.guest) return browserHistory.push('/login'), null;
        else user.isOwner = true;
    }
    if(!user) return null;
    if(!this.state.companies) return null;
    return (
      <div className="row w-75">
        <UserInfoBox user={user} numberOfCompanies={this.state.companies.length}/>
        <CompaniesTable companies={this.state.companies} getCompanies={this.getCompanies.bind(this)} user={user}/>
      </div>
    )
  }
}

export default connect(store => ({ store }), null)(ProfilePage);