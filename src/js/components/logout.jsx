import React from 'react';
import auth from './auth.jsx';
import { Link, History, Navigation } from 'react-router';
import reactMixin from 'react-mixin';

class Logout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    auth.logout();
    this.transitionTo('/login');
  }

  render() {
    return (
      <div>
        <p>You are now logged out.</p>
       <p><Link to='/login'>Click here to login again</Link></p>
      </div>
    );
  }
}

Logout.contextTypes = {
  router: React.PropTypes.func.isRequired,
};

reactMixin(Logout.prototype, Navigation);

export default Logout
