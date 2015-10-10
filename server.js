var swig = require('swig');
var React = require('react');
var Router = require('react-router');
var routes = require('./src/js/app/routes');
var express = require('express');
var ExpressLocation = require('react-router-express');
var path = require('path');
var async = require('async');
var request = require('request');
var xml2js = require('xml2js');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var Item = require('./models/item');
var User = require('./models/user');
var pass = require('./pass');
var config = require('./config');

mongoose.connect(config.database);
mongoose.connection.on('error', function () {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

var app = express();

app.set('port', process.env.PORT || 6789);
// Session
app.use(session({
  resave: true,
  saveUninitialized: false,
  secret: 'ssh, it is a secret'
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * GET /api/items
 * Gets the current items in the database.
 */
app.get('/api/items', function (req, res, next) {
  var id = req.session.user ? req.session.user._id : req.query.userId;
  Item.find({
    _creator: id
  }, function (err, items) {

    if (err) {
      return next(err);
    }

    if (!items) {
      return res.status(404).send({ message: 'No items found.' });
    }

    res.send(items);
  });
});

/**
 * POST /api/items
 * Adds new items to the database
 */
app.post('/api/items', function (req, res, next) {
  var name = req.body.name;
  var url = req.body.url;
  var price = req.body.price;
  var isBought = req.body.isBought;
  var whoIsBuying = req.body.whoIsBuying;
  var whoFor = req.body.whoFor;
  var _creator = req.body._creator;

  var item = new Item({
    name: name,
    url: url,
    price: price,
    isBought: isBought,
    whoIsBuying: whoIsBuying,
    whoFor: whoFor,
    _creator: _creator
  });

  item.save(function (err, savedItem) {
    if (err) {
      return next(err);
    }
    res.send(savedItem);
  });
});

/**
 * GET /create-admin-user
 * Easy way of adding an administrative user to the database
 */
app.get('/create-admin-user', function (req, res, next) {
  var user = new User();
  user.username = 'marc';
  pass.hash('password', function (err, salt, hash) {
    if (err) {
      console.log(err);
    }
    user.salt = salt;
    user.hash = hash;
    user.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('user saved');
        res.status(200).end();
      }
    });
  });
});

/**
 * POST /api/login
 * Authenticate a user
 */
app.post('/api/login', function (req, res) {
  pass.authenticate(req.body.username, req.body.password, function (err, user) {
    if (user) {
      req.session.regenerate(function () {
        req.session.user = user;
        res.send({
          message: user
        });
      });
    } else {
      res.send(401);
    }
  });
});

/**
 * POST /api/signup
 * Sign a user up
 */
app.post('/api/signup', function (req, res) {
  User.findOne({
    username: req.body.username
  }, function (err, user) {
    if (user) {
      res.send(401);
    } else {
      var newUser = new User();
      newUser.username = req.body.username;
      pass.hash(req.body.password, function (err, salt, hash) {
        if (err) {
          console.log(err);
        }
        newUser.salt = salt;
        newUser.hash = hash;
        newUser.save(function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('user saved');
            res.status(200).end();
          }
        });
      });
    }
  });
});

app.use(function (req, res) {
  Router.run(routes, req.path, function (Handler) {
    var html = React.renderToString(React.createElement(Handler));
    var page = swig.renderFile('views/index.html', { html: html });
    res.send(page);
  });
});

var server = require('http').createServer(app);

server.listen(app.get('port'), function () {
  console.log('express server listening on port ' + app.get('port'));
});
