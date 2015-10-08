import React from 'react';
import auth from './auth.jsx';
import Router from 'react-router';
import { Link } from 'react-router';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
    context.router
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    var { router } = this.context;
    console.log(router);
    var nextPath = router.getCurrentQuery().nextPath();
    var email = React.findDOMNode(this.refs.email).value.trim();
    var pass = React.findDOMNode(this.refs.pass).value.trim();

    auth.login(email, pass, (loggedIn) => {
      if (!loggedIn) {
        return this.setState({
          error: true
        });
      }
      if (nextPath) {
        router.replaceWith(nextPath);
      } else {
        router.replaceWith('/login');
      }
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className={'form-group'}>
          <label className='control-label'>Username</label>
          <input type='text' className='form-control' ref='name' placeholder="Username" autoFocus/>
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
  router: React.PropTypes.func.isRequired
};

export default Login;
