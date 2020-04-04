import React, {Component} from 'react';
import { request, onerror } from '../../../lib/request';

import TagInput from "../../TagInput";
import connect from "react-redux/es/connect/connect";

import('./CompanySettingsForm.css');

class CompanySettingsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      warning: '',
      company: {}
    };
    this.specialities = this.props.store.lang.specialities;

    request('/api/tag/all')
      .then(res => this.setState(res));
    if(this.props.companyId)
      request('/api/company/get?id=' + this.props.companyId + '&access=1')
        .then(res => {
          this.problemTextarea.value = res.company.about;
          this.setState({ company: res.company, tags: JSON.parse(res.company.tags) })
        })
        .catch(onerror);
  }

  onsubmit = (event) => {
    event.preventDefault();

    let warning = this.checkForm();
    if(warning) this.setState({ warning });
    else {
      const data = new FormData(this.form);
      if(this.props.owner) data.append('owner', this.props.owner);
      data.set('speciality', this.specialities.indexOf(data.get('speciality')));
      data.append('tags', JSON.stringify(this.state.tags));
      this.props.submit(data);
      request('/api/tag/use', data);
    }
  };

  checkForm = () => {
    if(!this.form.name.value) return this.lang.companyNameRequired;
    if(!this.form.speciality.value) return this.lang.specialityRequired;
  };

  select = ({ target }) => {
    let field = document.getElementsByName('speciality')[0];
    field.dataset.code = target.dataset.code;
    field.value = target.textContent;
  };

  render = () => {
    this.lang = this.props.store.lang.companySettings;
    return (
      <form className={'form-company-settings text-center'} ref={form => this.form = form}>
        <h1 className={'mb-5'}>{this.props.companyId ? this.lang.editCompany : this.lang.newCompany}</h1>
        <table className={'w-100'}>
          <tr>
            <td>{this.lang.name}</td>
            <td><input name="name" className="form-control" defaultValue={this.state.company.name}/></td>
            <td/>
          </tr>
          <tr>
            <td>{this.lang.speciality}</td>
            <td className={'position-relative'}>
              <input name="speciality" className="form-control"
                     defaultValue={this.specialities[this.state.company.speciality]} readOnly/>
              <button className="dropdown-toggle dropdown-toggle-split w-25" data-toggle="dropdown"/>
              <table className="dropdown-menu dropdown-menu-right table table-striped" onClick={this.select}>
                {this.specialities.map((item, index) => <tr className="dropdown-item-text" key={index}>{item}</tr>)}
              </table>
            </td>
            <td/>
          </tr>
          <tr>
            <td>{this.lang.aboutCompanies}</td>
            <td>
              <textarea id='d' name="about" className="form-control" ref={area => this.problemTextarea = area}
                        maxLength={100}
                        onChange={() => this.aboutLengthArea.textContent = `${this.problemTextarea.value.length}/100`}/>
              <small className={'text-muted float-right'} ref={area => this.aboutLengthArea = area}/>
            </td>
            <td/>
          </tr>
          <tr>
            <td>{this.lang.tags}</td>
            <td><TagInput tags={this.state.tags} suggestions={this.state.suggestions}
                          setState={this.setState.bind(this)}/></td>
            <td/>
          </tr>
          <tr>
            <td/>
            <td>
              <button type="submit" onClick={this.onsubmit.bind(this)}>{this.props.buttonText}</button>
            </td>
            <td/>
          </tr>
          <tr>
            <td/>
            <td><h5 className="text-danger">{this.state.warning}</h5></td>
            <td/>
          </tr>
        </table>
      </form>
    );
  }
};

export default connect(store => ({ store }), null)(CompanySettingsForm);