import React, { Component } from 'react';
import {browserHistory} from "react-router";
import {onerror, request} from "../../lib/request";

import CompanySettingsForm from './CompanySettingsForm';
import url from "url";
import connect from "react-redux/es/connect/connect";

class CompanySettingsPage extends Component {
  owner = url.parse(window.location.href).query;

  submit = data =>
    request('/api/company/new', data)
      .then(res => browserHistory.push(`/companies/${res.companyId}/edit${this.owner ? `?${this.owner}` : `` }`))
      .catch(onerror);

  render = () => <CompanySettingsForm submit={this.submit} owner ={this.owner} buttonText={this.props.store.lang.companySettings.create}/>;
}

export default connect(store => ({ store }), null)(CompanySettingsPage);