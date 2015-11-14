import React from 'react';
import auth from './auth.jsx';
import Router from 'react-router';
import { Link, Navigation } from 'react-router';
import reactMixin from 'react-mixin';

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
        this.transitionTo('/');
        return this.setState({
          error: false,
          loggedIn: true,
          username: username
        });
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
      <form className='login [ grid ]' onSubmit={this.handleSubmit}>
        {loginMessage}
        <div className='[ grid__col grid__col--half ]'>
          <h1 className='login__title'>Your Christmas Gift&nbsp;List Planner</h1>
        </div>
        <div className='[ grid__col grid__col--half ]'>
          <div className='form-group'>
            <input type='text' className='form-group__input' ref='username' placeholder="Username" autoFocus/>
            <label className='form-group__label'>Username</label>
          </div>
          <div className={'form-group'}>
            <input type='text' className='form-group__input' ref='password' placeholder="Password" />
            <label className='form-group__label'>Password</label>
          </div>
          <button type='submit' className='btn btn-primary'><span>Submit</span></button>
        </div>
        {this.state.error && (
          <p>Bad login information</p>
        )}
      </form>
    );
  }
}

Login.contextTypes = {
  router: React.PropTypes.func.isRequired
};

reactMixin(Login.prototype, Navigation);


export default Login;
