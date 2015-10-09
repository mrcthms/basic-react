import React from 'react';
import auth from './auth.jsx';
import Router from 'react-router';
import { Link } from 'react-router';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      loggedIn: false,
      username: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    var username = React.findDOMNode(this.refs.username).value.trim();
    var pass = React.findDOMNode(this.refs.password).value.trim();

    auth.login(username, pass, (loggedIn) => {
      if (!loggedIn) {
        return this.setState({
          error: true,
          loggedIn: false
        });
      } else {
        return this.setState({
          error: false,
          loggedIn: true,
          username: username
        });
        console.log('logged in successfully with ' + email);
      }
    });
  }

  render() {
    var loginMessage = '';
    if (this.state.loggedIn) {
      loginMessage = (
        <div>
          <p>Logged in as {this.state.username}</p>
          <p><Link to='/'>See your items</Link></p>
        </div>
      );
    }
    return (
      <form onSubmit={this.handleSubmit}>
        {loginMessage}
        <div className={'form-group'}>
          <label className='control-label'>Username</label>
          <input type='text' className='form-control' ref='username' placeholder="Username" autoFocus/>
        </div>
        <div className={'form-group'}>
          <label className='control-label'>Password</label>
          <input type='text' className='form-control' ref='password' placeholder="Password" />
        </div>
        <button type='submit' className='btn btn-primary'>Submit</button>
        {this.state.error && (
          <p>Bad login information</p>
        )}
      </form>
    );
  }
}

Login.contextTypes = {
  router: React.PropTypes.func
};

export default Login;
