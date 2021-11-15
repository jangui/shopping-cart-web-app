const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const catalogueSchema = new Schema({
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
});

const Catalogue = mongoose.model('Catalogue', catalogueSchema);

module.exports = Catalogue;
