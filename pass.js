/**
 * Module dependencies.
 */

var crypto = require('crypto');
var User = require('./models/user');

/**
 * Bytesize.
 */

var len = 128;

/**
 * Iterations. ~300ms
 */

var iterations = 12000;

/**
 * Hashes a password with optional `salt`, otherwise
 * generate a salt for `pass` and invoke `fn(err, salt, hash)`.
 *
 * @param {String} password to hash
 * @param {String} optional salt
 * @param {Function} callback
 * @api public
 */

module.exports.hash = function (pwd, salt, fn) {
  if (arguments.length === 3) {
    crypto.pbkdf2(pwd, salt, iterations, len, function (err, hash) {
      fn(err, hash.toString('base64'));
    });
  } else {
    fn = salt;
    crypto.randomBytes(len, function (err, salt) {
      if (err) {
        return fn(err);
      }
      salt = salt.toString('base64');
      crypto.pbkdf2(pwd, salt, iterations, len, function (err, hash) {
        if (err) {
          return fn(err);
        }
        fn(null, salt, hash.toString('base64'));
      });
    });
  }
};

module.exports.authenticate = function (name, pwd, fn) {
  User.findOne({
    username: name
  }, function (err, user) {
    if (err) {
      return fn(new Error(err));
    }
    if (!user) {
      return fn(new Error('cannot find user'));
    }
    module.exports.hash(pwd, user.salt, function (err, hash) {
      if (err) {
        return fn(err);
      }
      if (hash === user.hash) {
        return fn(null, user);
      }
      fn(new Error('invalid password'));
    });
  });
};

module.exports.restrict = function (req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied';
    res.redirect('/login');
  }
};
