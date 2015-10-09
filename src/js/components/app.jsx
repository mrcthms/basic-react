import React from 'react';
import { RouteHandler } from 'react-router';
import Navbar from  './navbar.jsx';
import auth from './auth.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: auth.loggedIn()
    };
  }

  setStateOnAuth(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    });
  }

  componentWillMount() {
    auth.onChange = this.setStateOnAuth.bind(this);
    //auth.login();
  }

  render() {
    console.log(this.state);
    return (
      <div className="xmas-list">
        <Navbar loggedIn={this.state.loggedIn} />
        <RouteHandler />
      </div>
    );
  }
}

export default App;
