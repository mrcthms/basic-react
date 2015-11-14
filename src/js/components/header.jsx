import $ from 'jquery';
import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var loggedInOrOut = (<li className='header__list-item'><Link to='/login'>Log In</Link></li>);
    if (this.props.loggedIn) {
      loggedInOrOut = ['hello', 'logout'].map((item) => {
        if (item === 'hello') {
          return <li className='header__list-item'>Hello, {this.props.name}!</li>;
        } else if (item ==='logout') {
          return <li className='header__list-item'><Link to='/logout'>Logout</Link></li>
        }
      });
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
Header.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default Header;
