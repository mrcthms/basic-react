import React from 'react';
import auth from './auth.jsx';
import { Link, History } from 'react-router';

class Logout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    auth.logout();
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

export default Logout
