import React from 'react';
import { Route } from 'react-router';
import App from '../components/app.jsx';
import Home from '../components/home.jsx';

export default (
  <Route handler={App}>
    <Route path='/' handler={Home} />
  </Route>
);
