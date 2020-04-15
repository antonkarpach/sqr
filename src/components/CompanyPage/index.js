import React, {Component} from 'react';
import {connect} from 'react-redux';
import {request, onerror} from '../../lib/request';

import './CompanyPage.scss';

import Comment from '../Comment';
import CompanyInfoBox from '../CompanyInfoBox';

class CompanyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: null,
      comments: []
    };
    this.getCompany();
    window.socket.on('update company', () => this.getCompany());
  }

  getCompany = () => {
    request('/api/company/get?id=' + this.props.params.companyId)
      .then(res => this.setState(res))
      .catch(onerror);
  };

  onRate = ({target}) => {
    if (target.tagName !== 'IMG') return;
    let data = new FormData();
    data.append('rate', target.dataset.rate);
    data.append('companyId', this.state.company.id);
    request('/api/company/rate', data)
      .then(() => {
        window.socket.emit('update company');
        this.getCompany();
      })
  };

  comment = event => {
    event.preventDefault();
    let text = this.commentInput.value;
    if (text) {
      let data = new FormData(event.target);
      data.append('companyId', this.state.company.id);
      request('/api/company/comment', data)
        .then(() => {
          window.socket.emit('update company');
          this.getCompany();
        });
      this.commentInput.value = '';
    }
  };

  like = commentId => {
    let data = new FormData();
    data.append('commentId', commentId);
    request('/api/company/like', data)
      .then(() => {
        window.socket.emit('update company');
        this.getCompany()
      });
  };

  render = () => {
    this.lang = this.props.store.lang.company;
    return !this.props.store.user || !this.state.company ? null : (
      <div className="CompanyPage">
        <div className="CompanyPage__container">
          <div className="CompanyPage__container__card">
            <CompanyInfoBox company={this.state.company}/>
          </div>
          <div className="CompanyPage__container__info">
            {console.log(this.state.company.text)}
            <div className={'company-content'}
                 dangerouslySetInnerHTML={{__html: this.state.company.text || ''}}/>
            {this.props.store.user.guest ||
            <div className={'text-right mt-4'} onClick={this.onRate.bind(this)}>
              <span className={'align-middle'}>{this.lang.yourRating}</span>
              {this.state.company && [1, 2, 3, 4, 5].map(i => <img key={i} data-rate={i}
                                                                   src={require('../img/any/star.svg')}
                                                                   style={{opacity: i <= JSON.parse(this.state.company.ratings)[this.props.store.user.id] ? 1 : 0.25}}/>)}
            </div>}
          </div>
        </div>
        <div className="CompanyPage__comments">
          <h1 className="header">{this.lang.comments}</h1>
          {this.props.store.user.guest ||
          <form onSubmit={this.comment.bind(this)}><input name={'text'}
                                                          className={'form-control mt-4'}
                                                          placeholder={this.lang.comment}
                                                          ref={input => this.commentInput = input}/>
          </form>}
          {this.state.comments.length && this.state.comments.map(comment => <Comment
            data={comment} like={this.like}/>) || this.lang.noComments}
        </div>
      </div>
    )
  }
}

export default connect(store => ({store}), null)(CompanyPage);