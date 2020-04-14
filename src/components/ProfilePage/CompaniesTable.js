import React, { Component } from "react";
import {onerror, request} from "../../lib/request";

import editIcon from "../img/edit.png";
import deleteIcon from "../img/delete.png";
import settingsIcon from "../img/settings.png";
import connect from "react-redux/es/connect/connect";

class CompaniesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: props.companies,
      sort: 4
    };
  }

  sort = ({ target }) => {
    if(target.classList.contains('sort') && !target.classList.contains('current')) {
      let { sortby } = target.dataset;
      let current = target.parentNode.getElementsByClassName('current')[0];
      if(current) current.classList.remove('current');
      target.classList.add('current');
      this.setState({ companies: this.props.companies.slice().sort((a, b) => a[sortby] < b[sortby] ? 1 : -1) })
    }
  };

  deleteCompany({ id, name }) {
    if (!window.confirm(`${this.lang.confirmDelete} "${name}"?`)) return;
    let data = new FormData();
    data.append('companyId', id);
    request('api/company/delete', data)
      .then(() => this.props.getCompanies())
      .catch(onerror);
  }

  render = () => {
    this.lang = this.props.store.lang.profile;
    return (
      <div className="CompaniesTable">
        <table className="content">
          <thead style={{background: '#1c3664'}} onClick={this.sort}>
            <td/>
            <td className={'sort'} data-sortBy="name">{this.lang.name}</td>
            <td>{this.lang.aboutCompany}</td>
            <td className={'cell-sm sort'} data-sortBy="updatedAt">{this.lang.updatedAt}</td>
            <td className={'cell-sm sort'} data-sortBy="rating">{this.lang.rating}</td>
          </thead>
          <tbody>
          { this.table = this.state.companies
            .map(company => {
            let date = new Date(Date.parse(company.updatedAt));
            return (
              <tr>
                <td className="Settings">
                  <a href={`/companies/${company.id}/settings${this.props.user.isOwner ? `` : `?${this.props.user.id}` }`}><img src={settingsIcon}/></a>
                  <a href={`/companies/${company.id}/edit${this.props.user.isOwner ? `` : `?${this.props.user.id}` }`}><img src={editIcon}/></a>
                  <img src={deleteIcon} onClick={this.deleteCompany.bind(this, company)}/>
                </td>
                <td className={'align-middle text-truncate'}>
                  <a href={`/companies/${company.id}`}>{company.name}</a>
                  <br/>
                  <span className={'text-success text-truncate'}>({this.props.store.lang.specialities[company.speciality]})</span>
                </td>
                <td className={'align-middle'}>{company.about}</td>
                <td className={'cell-sm align-middle'}>{date.getDate()}.{date.getMonth()+1}.{date.getFullYear()}</td>
                <td className={'cell-sm align-middle'}>{company.rating}</td>
              </tr>
            )}) }
          { this.table.length ? null : <tr><td colSpan="5">{this.lang.noCompanies}</td></tr> }
          </tbody>
        </table>
      </div>
    )
  }
}

export default connect(store => ({ store }), null)(CompaniesTable);