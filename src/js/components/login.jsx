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
      email: null
    };
    // context.router
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    //var { router } = this.context;
    //console.log(router, this.context);
    //var nextPath = router.getCurrentQuery().nextPath();
    var email = React.findDOMNode(this.refs.email).value.trim();
    var pass = React.findDOMNode(this.refs.password).value.trim();

    auth.login(email, pass, (loggedIn) => {
      if (!loggedIn) {
        return this.setState({
          error: true,
          loggedIn: false
        });
      } else {
        return this.setState({
          error: false,
          loggedIn: true,
          email: email
        });
        console.log('logged in successfully with ' + email + ' and ' + pass);
      }

      //if (nextPath) {
        //router.replaceWith(nextPath);
        //console.log('logged in');
      //} else {
        //router.replaceWith('/login');
      //}
    });
  }

  render() {
    var loginMessage = '';
    if (this.state.loggedIn) {
      loginMessage = (
        <div>
          <p>Logged in as {this.state.email}</p>
          <p><Link to='/'>See your items</Link></p>
        </div>
      );
    }
    return (
      <form onSubmit={this.handleSubmit}>
        {loginMessage}
        <div className={'form-group'}>
          <label className='control-label'>Username</label>
          <input type='text' className='form-control' ref='email' placeholder="Username" autoFocus/>
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
