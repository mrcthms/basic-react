import $ from 'jquery';
import localStorage from 'localStorage';
import { LOGIN_URL } from '../config';

module.exports = {
  login(username, password, cb) {
    cb = arguments[arguments.length - 1];
    if (localStorage.basic_react_auth_token) {
      if (cb) {
        cb(true);
        this.onChange(true);
        return;
      }
    }
    authenticateUser(username, password, (res) => {
      if (res.authenticated) {
        localStorage.basic_react_auth_token = res.token;
        if (cb) {
          cb(true);
        }
        this.onChange(true);
      } else {
        if (cb) {
          cb(false);
        }
        this.onChange(false);
      }
    });
  },
  getToken() {
    return localStorage.basic_react_auth_token;
  },
  logout(cb) {
    delete localStorage.basic_react_auth_token;
    if (cb) {
      cb();
    }
    this.onChange(false);
  },
  loggedIn() {
    return !!localStorage.basic_react_auth_token;
  },

  onChange() {

  }
};

function authenticateUser(username, password, cb) {
  $.ajax({
    url: LOGIN_URL,
    type: 'POST',
    data: { username, password },
    success: (data) => {
      cb({
        authenticated: true,
        token: data.message._id
      });
    },
    error: (xhr, status, err) => {
      cb({
        authenticated: true
      });
    }
  });
}
