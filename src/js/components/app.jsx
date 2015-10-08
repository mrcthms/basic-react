import React from 'react';
import { RouteHandler } from 'react-router';
import Navbar from  './navbar.jsx';

class App extends React.Component {
  render() {
    return (
      <div className="xmas-list">
        <Navbar />
        <RouteHandler />
      </div>
    );
  }
}

export default App;
