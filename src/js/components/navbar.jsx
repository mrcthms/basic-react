import $ from 'jquery';
import React from 'react';
import { Link } from 'react-router';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var loggedInOrOut = (<li><Link to='/login'>Log In</Link></li>);
    if (this.props.loggedIn) {
      loggedInOrOut = (<li><Link to='/logout'>Logout {this.props.name}</Link></li>);
    }
    var showSignup = !this.props.loggedIn ? <li><Link to='/signup'>Sign Up</Link></li> : '';
    return (
      <nav className='navbar navbar-default navbar-static-top'>
        <ul className='nav navbar-nav'>
          <li><Link to='/'>Home</Link></li>
          {loggedInOrOut}
          {showSignup}
        </ul>
      </nav>
    );
  }
}
Navbar.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default Navbar;
