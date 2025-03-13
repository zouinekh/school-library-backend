const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  availableCopies: { type: Number, required: true, min: 0 }
});

module.exports = mongoose.model('Book', BookSchema);