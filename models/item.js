var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
  _creator: [{
    type: String,
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
  whoIsBuying: {
    type: String
  },
  whoFor: {
    type: String
  }
});

module.exports = mongoose.model('Item', itemSchema);
