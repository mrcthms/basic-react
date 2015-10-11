import $ from 'jquery';
import React from 'react';
import { Link } from 'react-router';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var loggedInOrOut = (<li className='header__list-item'><Link to='/login'>Log In</Link></li>);
    if (this.props.loggedIn) {
      loggedInOrOut = (<li className='header__list-item'><Link to='/logout'>Logout {this.props.name}</Link></li>);
    }
    var showSignup = !this.props.loggedIn ? <li className='header__list-item'><Link to='/signup'>Sign Up</Link></li> : '';
    return (
      <header className='header'>
        <nav className='header__nav'>
          <ul className='header__list'>
            <li className='header__list-item'><Link to='/'>Home</Link></li>
            {loggedInOrOut}
            {showSignup}
          </ul>
        </nav>
      </header>
    );
  }
}
Navbar.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default Navbar;
