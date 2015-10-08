var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  salt: {
    type: String
  },
  hash: {
    type: String
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  }]
});

module.exports = mongoose.model('User', userSchema);
