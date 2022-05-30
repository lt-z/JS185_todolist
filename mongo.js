const mongoose = require('mongoose');
const config = require('./lib/config');

const password = config.MONGO_PW;

const url = `mongodb+srv://fullstack:${password}@cluster0.gim4j.mongodb.net/noteApp?retryWrites=true&w=majority`;

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
