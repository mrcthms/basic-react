var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
  _creator: [{
    type: Number,
    ref: 'User'
  }],
  name: {
    type: String
  },
  url: {
    type: String
  },
  price: {
    type: String
  },
  isBought: {
    type: Boolean,
    default: false
  },
  assignee: {
    type: String
  },
  whoFor: {
    type: String
  }
});

module.exports = mongoose.model('Item', itemSchema);
