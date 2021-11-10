const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const catelogueSchema = new Schema({
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

const Catelogue = mongoose.model('Catelogue', catelogueSchema);

module.exports = Catelogue;
