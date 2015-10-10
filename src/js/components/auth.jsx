import $ from 'jquery';
import localStorage from 'localStorage';
import { LOGIN_URL, SIGNUP_URL } from '../config';

module.exports = {
  login(username, password, cb) {
    cb = arguments[arguments.length - 1];
    if (localStorage.basicReactAuthToken) {
      if (cb) {
        cb(true);
        this.onChange(true, username);
        return;
      }
    }
    authenticateUser(username, password, (res) => {
      if (res.authenticated) {
        localStorage.basicReactAuthToken = res.token;
        localStorage.xmasListUsername = res.username;
        if (cb) {
          cb(true);
        }
        this.onChange(true, username);
      } else {
        if (cb) {
          cb(false);
        }
        this.onChange(false);
      }
    });
  },
  signup(username, password, cb) {
    cb = arguments[arguments.length - 1];
    signupUser(username, password, (res) => {
      if (res.signedUp) {
        if (cb) {
          cb(true);
        }
        this.login(username, password, (loggedIn) => {

        });
      } else {
        if (cb) {
          cb(false);
        }
        //this.onSignupChange(false);
      }
    });
  },
  getToken() {
    return localStorage.basicReactAuthToken;
  },
  logout(cb) {
    delete localStorage.basicReactAuthToken;
    if (cb) {
      cb();
    }
    this.onChange(false);
  },
  loggedIn() {
    return !!localStorage.basicReactAuthToken;
  },
  getUsername() {
    return localStorage.xmasListUsername || '';
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
        token: data.message._id,
        username: username
      });
    },
    error: (xhr, status, err) => {
      cb({
        authenticated: false
      });
    }
  });
}

function signupUser(username, password, cb) {
  $.ajax({
    url: SIGNUP_URL,
    type: 'POST',
    data: { username, password },
    success: (data) => {
      cb({
        signedUp: true
      });
    },
    error: (hxr, status, err) =>  {
      cb({
        signedUp: false
      });
    }
  });
}
