import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import MainPage from './components/MainPage';
import AdminPage from './components/AdminPage';
import AuthPage from './components/AuthPage';
import ProfilePage from './components/ProfilePage';
import SearchPage from './components/SearchPage';
import CompanyNewPage from './components/CompanySettingsPage/new';
import CompanyPage from './components/CompanyPage';
import CompanyEditPage from './components/CompanyEditPage';
import CompanySettingsPage from './components/CompanySettingsPage/existing';

import ErrorPage from './components/ErrorPage';

export default (
  <Route path={'/'} component={App}>
    <IndexRoute component={MainPage}/>
    <Route exact path={'/admin'} component={AdminPage}/>
    <Route exact path={'/login'} component={AuthPage}/>
    <Route exact path={'/profile'} component={ProfilePage}/>
    <Route exact path={'/users/:userId'} component={ProfilePage}/>
    <Route exact path={'/search'} component={SearchPage}/>
    <Route exact path={'/companies/new'} component={CompanyNewPage}/>
    <Route exact path={'/companies/:companyId'} component={CompanyPage}/>
    <Route exact path={'/companies/:companyId/edit'} component={CompanyEditPage}/>
    <Route exact path={'/companies/:companyId/settings'} component={CompanySettingsPage}/>
    <Route exact path={'/error:errorId'} component={ErrorPage}/>
  </Route>
)