import React, { Component } from 'react';

import './ErrorPage.css';
import connect from "react-redux/es/connect/connect";

class ErrorPage extends Component {
  id = this.props.params && this.props.params.errorId || this.props.id;
  render = () => {
    this.errors = this.props.store.lang.errors;
    return (
      <div className={'error-box w-50'}>
        <h5 className="text-danger text-center">
          { this.errors[this.id] || this.errors[0] }
        </h5>
      </div>
    )
  }
}

export default connect(store => ({ store }), null)(ErrorPage);