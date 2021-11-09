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
  category: {
    type: String,
    default: "",
    trim: true,
  },
}, {
  timestamps: true,
});

const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);

module.exports = ShoppingCart;
