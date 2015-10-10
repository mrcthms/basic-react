import React from 'react';
import auth from './auth.jsx';
import Router from 'react-router';
import { Link } from 'react-router';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      signedUp: false,
      username: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    var username = React.findDOMNode(this.refs.username).value.trim();
    var pass = React.findDOMNode(this.refs.password).value.trim();
    var confirmPass = React.findDOMNode(this.refs.passwordConfirm).value.trim();

    if(pass === confirmPass) {
      auth.signup(username, pass, (signedUp) => {
        if (!signedUp) {
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
          console.log('signed up successfully with ' + email);
        }
      });
    } else {
      this.setState({
        error: 'Your passwords do not match'
      });
    }
  }

  render() {
    var loginMessage = '';
    if (this.state.loggedIn) {
      loginMessage = (
        <div>
          <p>Signed up as {this.state.username}</p>
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
        <div className={'form-group'}>
          <label className='control-label'>Confirm Password</label>
          <input type='text' className='form-control' ref='passwordConfirm' placeholder="Password" />
        </div>
        <button type='submit' className='btn btn-primary'>Submit</button>
        {this.state.error && (
          <p>Bad login information</p>
        )}
      </form>
    );
  }
}

Signup.contextTypes = {
  router: React.PropTypes.func
};

export default Signup;
