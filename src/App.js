import React from 'react';
import Header from './components/Header';
import './App.scss';

// import './bower_components/bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.css';
import './components/style.css';
import {connect} from 'react-redux';
import {request} from './lib/request';
import config from "./config";
import Test from "./components/Test/Test";
import HorizontalMenu from "./components/horizontal-menu/HorizontalMenu";
import Footer from "./components/footer/Footer";

const App = (props) => {
  let getUser = () => {
    request('/api/user/get')
      .then(res => {
        props.translate(res.lang);
        props.loadUser(res.user);
      });
  };

  window.VK.init(config.vk);
  window.FB.init(config.fb);

  getUser();
  window.socket.on('update user', () => getUser());

  return (
    <div className='App'>
      {/*<Test/>*/}
      <div className="Head__header">
        <Header/>
        <HorizontalMenu/>
      </div>
      <div className="Content">
        { props.children }
      </div>
      <Footer/>
    </div>
  );
};

export default connect(() => {}, dispatch => ({
  loadUser: user => dispatch({ type: 'LOAD_USER', payload: user }),
  translate: lang => dispatch({ type: 'TRANSLATE', payload: lang })
}))(App);
