import React, { Component } from 'react';
import {browserHistory} from "react-router";
import {onerror, request} from "../../lib/request";

import CompanySettingsForm from './CompanySettingsForm';
import url from "url";
import connect from "react-redux/es/connect/connect";

class CompanySettingsPage extends Component {
  owner = url.parse(window.location.href).query;
  companyId = this.props.params.companyId;

  submit = data => {
    data.append('companyId', this.companyId);
    request('/api/company/edit', data)
      .then(() => browserHistory.push(this.owner ? `/users/${this.owner}` : `/profile`))
      .catch(onerror);
  };

  render = () => <CompanySettingsForm submit={this.submit} companyId={this.companyId} owner ={this.owner} buttonText={this.props.store.lang.companySettings.save}/>;
}

export default connect(store => ({ store }), null)(CompanySettingsPage);