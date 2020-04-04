import React, { Component } from "react";
import { connect } from 'react-redux';
import {onerror, request} from "../../lib/request";

import lockIcon from "../img/lock.png";
import unlockIcon from "../img/unlock.png";
import demoteIcon from "../img/demote.png";
import promoteIcon from "../img/promote.png";
import deleteIcon from "../img/delete.png";

import error from '../../lib/error';
import './AdminPage.css';

class UsersTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getUsers();
  }

  getUsers() {
    request('api/user/all')
      .then(res => this.setState({ users: res.users }))
      .catch(onerror);
  }

  delete = (id) => {
    if (!window.confirm(`${this.lang.confirmDeleting} #${id}?`)) return;
    let data = new FormData();
    data.append('id', id);
    request(`api/user/delete`, data)
      .then(() => this.getUsers())
      .catch(onerror);
  };

  edit = (id, changes) => {
    let data = new FormData();
    data.append('id', id);
    data.append('changes', JSON.stringify(changes));
    request(`api/user/edit`, data)
      .then(() => this.getUsers())
      .catch(onerror);
  };

  render = () => {
    this.lang = this.props.store.lang.admin;
    let user = this.props.store.user;
    return !user || !this.state.users || !this.lang ? null :
      user.guest ? error(1) : (
        <table className="table table-users table-striped table-borderless text-center text-light bg-dark w-75">
          <thead style={{background: 'black'}}>
          <td>ID</td>
          <td>{this.lang.login}</td>
          <td>Email</td>
          <td>{this.lang.createdAt}</td>
          <td>{this.lang.status}</td>
          <td/>
          </thead>
          <tbody>
          { this.state.users.map(user => {
            let date = new Date(Date.parse(user.createdAt));
            return (
              <tr>
                <td className={'align-middle'}>{user.id}</td>
                <td className={'align-middle'}><a href={`/users/${user.id}`}>{user.username || [,`vk:`, 'fb:'][user.authType] + user.outsideUserId}</a></td>
                <td className={'align-middle'}>{user.email}</td>
                <td className={'align-middle'}>{date.getDate()}.{date.getMonth()}.{date.getFullYear()}</td>
                <td className={'align-middle'}>{user.isActive ? this.lang.active : this.lang.blocked}</td>
                <td>
                  { user.isActive ?
                    <img src={lockIcon} onClick={this.edit.bind(this, user.id, {isActive: false})}/> :
                    <img src={unlockIcon} onClick={this.edit.bind(this, user.id, {isActive: true})}/> }
                  { user.isAdmin ?
                    <img src={demoteIcon} onClick={this.edit.bind(this, user.id, {isAdmin: false})}/> :
                    <img src={promoteIcon} onClick={this.edit.bind(this, user.id, {isAdmin: true})}/> }
                  <img src={deleteIcon} onClick={this.delete.bind(this, user.id)}/>
                </td>
              </tr>
            )
          }) }
          </tbody>
        </table>
      )
  }
}

export default connect(store => ({ store }), null)(UsersTable);