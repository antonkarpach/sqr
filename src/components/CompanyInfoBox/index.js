import React, { Component } from 'react';

import './CompanyInfoBox.css';
import connect from "react-redux/es/connect/connect";

class CompanyInfoBox extends Component {
  render = () => {
    this.lang = this.props.store.lang.companyInfoBox;
    let company = this.props.company;
    return (
      <div className={'company'}>
        <span className={'h2 text-center mt-4'}><a href={`/companies/${company.id}`}>{company.name}</a></span>
        <span className={'h5 text-center text-success mb-5'}>({this.props.store.lang.specialities[company.speciality]})</span>
        <span className={'h5 m-1'}>{this.lang.aboutCompany}{company.about}</span>
        <span className={'h5 m-1'}>{this.lang.tags}{JSON.parse(company.tags).map(tag => <span
          className={'tag'}>{tag.text}</span>)}</span>
        <span className={'h5 m-1 mb-4'}>
          <span className={'mr-3'}>{this.lang.rating}</span>
          <div className={'d-inline'}>
            {[1, 2, 3, 4, 5].map(i =>
              <img key={i} src={require(i <= company.rating ? '../img/star.png' : '../img/star3.png')}/>)}
          </div>
        </span>
      </div>
    )
  }
}

export default connect(store => ({ store }), null)(CompanyInfoBox);