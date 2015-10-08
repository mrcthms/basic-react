
module.exports = {
  login(email, pass, cb) {
    cb = arguments[arguments.length - 1];
    if (localStorage.basic_react_auth_token) {
      if (cb) {
        cb(true);
        this.onChange(true);
        return;
      }
    }
    authenticateUser(email, pass, (res) => {
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

function authenticateUser(email, pass, cb) {
  setTimeout(() => {
    if (email === 'joe@example.com' && pass === 'password1') {
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      });
    } else {
      cb({
        authenticated: false
      });
    }
  }, 0);
}
