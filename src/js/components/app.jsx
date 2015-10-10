import React from 'react';
import { RouteHandler } from 'react-router';
import Navbar from  './navbar.jsx';
import auth from './auth.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: auth.loggedIn(),
      name: auth.getUsername()
    };
  }

  setStateOnAuth(loggedIn, name = "") {
    this.setState({
      loggedIn: loggedIn,
      name: name
    });
  }

  componentWillMount() {
    auth.onChange = this.setStateOnAuth.bind(this);
    //auth.onSignupChange
  }

  render() {
    return (
      <div className="xmas-list">
        <Navbar loggedIn={this.state.loggedIn} name={this.state.name} />
        <RouteHandler />
      </div>
    );
  }
}

export default App;
