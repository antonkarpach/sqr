import React, { Component } from 'react';
import RichTextEditor from 'react-rte';
import { browserHistory } from "react-router";
import { request, onerror } from '../../lib/request';

import './CompanyEditPage.css';
import url from "url";
import connect from "react-redux/es/connect/connect";

class CompanyEditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: RichTextEditor.createEmptyValue()
    };

    request(`/api/company/get?id=${this.props.params.companyId}&access=1`)
      .then(res => this.setState({ value: RichTextEditor.createValueFromString(res.company.text || '', 'html') }))
      .catch(onerror);
  }

  onChange = value => this.setState({ value });

  save = () => {
    let data = new FormData();
    const owner = url.parse(window.location.href).query;
    data.append('companyId', this.props.params.companyId);
    data.append('text', this.state.value.toString('html'));
    request('/api/company/edit', data)
      .then(() => browserHistory.push(owner ? `/users/${owner}` : `/profile`))
      .catch(onerror);
  };

  render = () => (
    <div className={'w-75'}>
      <div className={'company-edit w-100'}>
        <RichTextEditor className={'rte'} value={this.state.value} onChange={this.onChange}/>
      </div>
      <button type={'submit'} className={'mt-2'} onClick={this.save}>{this.props.store.lang.companyEdit.save}</button>
      <h5 className="text-danger text-center" ref={m => this.message = m}/>
    </div>
  )
}

export default connect(store => ({ store }), null)(CompanyEditPage);