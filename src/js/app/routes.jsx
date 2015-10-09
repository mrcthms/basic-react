import React from 'react';
import { Route } from 'react-router';
import App from '../components/app.jsx';
import Home from '../components/home.jsx';
import Login from '../components/login.jsx';
import Logout from '../components/logout.jsx';
import Signup from '../components/signup.jsx';

export default (
  <Route handler={App}>
    <Route path='/' handler={Home} />
    <Route path='/login' handler={Login} />
    <Route path='/logout' handler={Logout} />
    <Route path='/signup' handler={Signup} />
  </Route>
);
