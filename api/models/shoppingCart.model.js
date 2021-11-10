const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const shoppingCartSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 1,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);

module.exports = ShoppingCart;
