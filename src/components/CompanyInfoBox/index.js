import React, { Component } from 'react';

import './CompanyInfoBox.scss';
import connect from "react-redux/es/connect/connect";

class CompanyInfoBox extends Component {
  render = () => {
    this.lang = this.props.store.lang.companyInfoBox;
    let company = this.props.company;
    return (
      <div className={'Card'}>
        <span className={'Card__name'}><a href={`/companies/${company.id}`}>{company.name}</a></span>
        <span className={'Card__type'}>({this.props.store.lang.specialities[company.speciality]})</span>
        <span className={'Card__description'}>{this.lang.aboutCompany}{company.about}</span>
        <span className={'Card__rangs'}>
          <span className={'Card__rangs__name'}>{this.lang.rating}</span>
          <div className={'Card__rangs__stars'}>
            {[1, 2, 3, 4, 5].map(i =>
              <img key={i} src={require(i <= company.rating ? '../img/star.png' : '../img/star3.png')}/>)}
          </div>
        </span>
      </div>
    )
  }
}

export default connect(store => ({ store }), null)(CompanyInfoBox);
