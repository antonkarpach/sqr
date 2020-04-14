import React, {Component} from 'react';
import {connect} from 'react-redux';

import {request, onerror} from "../../lib/request";

import TagCloud from '../TagCloud';
import TagInput from '../TagInput';
import CompanyInfoBox from "../CompanyInfoBox";

import './SearchPage.scss';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    const {tag, query} = props.store.routing.locationBeforeTransitions.query;
    this.state = {
      query,
      tags: tag ? [{id: tag, text: tag}] : [],
      suggestions: []
    };

    this.richSearch();
    request('/api/tag/all')
      .then(res => {
        this.setState(res);
        setInterval(() => {
          this.forceUpdate();
        }, 5000);
      });
  }

  richSearch = () => {
    let data = new FormData();
    data.append('query', this.state.query);
    data.append('speciality', this.state.speciality);
    data.append('tags', JSON.stringify(this.state.tags));
    request('/api/company/search', data)
      .then(res => this.setState({
        companies: (this.state.query || this.state.speciality || this.state.tags.length) ? res.companies : null
      }))
      .catch(onerror);
  };

  select = ({target}) => {
    let field = document.getElementsByName('speciality')[0];
    this.state.speciality = target.dataset.code;
    field.value = target.textContent;
    this.richSearch();
  };

  searchByTagCloud = ({target}) => {
    if (!target.children.length && this.state.suggestions.length) {
      this.state.tags = [{id: target.textContent, text: target.textContent}];
      this.richSearch();
    }
  };

  onChange = ({target}) => {
    this.state[target.name] = target.value;
    this.richSearch();
  };

  render = () => {
    this.lang = this.props.store.lang.search;
    return (
      <div className={'SearchPage'}>
        <div className="SearchPage__container">
          <h1 className="header">Страница поиска</h1>
          <div className="SearchTextName">
            <div className="name">Название</div>
            <input name={'query'} className="SearchText" defaultValue={this.state.query}
                   onChange={this.onChange} placeholder={this.lang.search} autoFocus/>
          </div>
          {/*       <div className="SearchCategory">*/}

          {/*       </div>*/}
          {/*<input name="speciality" className="SearchCategory" placeholder={this.lang.chooseSpeciality} readOnly/>*/}
          {/*<button className="SearchCategoryAcc" data-toggle="dropdown"/>*/}
          {/*<table className="dropdown-menu dropdown-menu-right table table-striped" onClick={this.select}>*/}
          {/*  {this.props.store.lang.specialities.map((item, index) => <tr className="dropdown-item-text"*/}
          {/*                                                               data-code={index} key={index}>{item}</tr>)}*/}
          {/*</table>*/}
          {this.state.companies ?
            this.state.companies.length ?
              <div className="SearchCards">
                {this.state.companies.map(company => <div className="SearchCards__item"
                                                          key={company.id}>
                  <CompanyInfoBox company={company}/></div>)}
              </div> :
              <span
                className={'message w-100 d-inline-block text-center'}>{this.lang.noResults}</span> :
            <TagCloud tags={this.state.suggestions} cloudStyle={{marginTop: 100}}
                      tagStyle={{color: 'black'}} width={600}
                      search={this.searchByTagCloud}/>
          }
        </div>
      </div>
    );
  }
}

export default connect(store => ({store}), null)(SearchPage);