import React, {Component} from 'react';
import {connect} from 'react-redux';
import Switch from "react-switch";

import CompanyInfoBox from '../CompanyInfoBox';
import {request, onerror} from '../../lib/request';

import './MainPage.scss';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.getCompanies();
        this.state = {
            companies: null,
            tags: [],
            popular: false
        };
        this.lang = this.props.store.lang.main;

        request('/api/tag/all')
            .then(res => {
                this.setState({tags: res.suggestions});
                setInterval(() => {
                    this.forceUpdate();
                }, 5000);
            });
    }

    handleSort(popular) {
        let companies = this.state.companies.sort(
            popular ?
                (w1, w2) => w1.rating < w2.rating ? 1 : -1 :
                (w1, w2) => w1.updatedAt < w2.updatedAt ? 1 : -1
        );
        this.setState({popular, companies: companies});
    }

    getCompanies() {
        request('api/company/all')
            .then(res => {
                this.state.companies = res.companies;
                this.handleSort(false);
            })
            .catch(onerror);
    }

    render = () => {
        this.lang = this.props.store.lang.main;
        if (!this.state.companies) return null;
        if (!this.state.companies.length) return <span
            className={'w-100 mt-5 display-4 text-center'}>{this.lang.noCompanies}<br/>{this.lang.firstCompany}</span>;
        return (
            <div className="MainPage">
                <div className={'col-9 text-center h2'}>
                    <span style={{
                        color: this.state.popular ? 'black' : '#006cd2',
                        transition: '0.25s'
                    }}>{this.lang.latest}</span>
                    <Switch
                        checked={this.state.popular}
                        onChange={this.handleSort.bind(this)}
                        onColor="#F55800"
                        onHandleColor="#FF5800"
                        offHandleColor="#09f"
                        offColor="#08f"
                        handleDiameter={30}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={20}
                        width={48}
                        className="react-switch align-middle m-2"
                        id="material-switch"
                    />
                    <span style={{
                        color: this.state.popular ? '#e45300' : 'black',
                        transition: '0.25s'
                    }}>{this.lang.popular}</span>
                </div>
                <div className="Cards">
                    <div className={'Cards__container'}>
                        {this.state.companies.map(company =>
                            <CompanyInfoBox company={company}/>
                        )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(store => ({store}), null)(MainPage);

