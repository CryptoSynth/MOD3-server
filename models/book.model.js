const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

//Create Book Scehma
const bookSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    maxlength: 50
  },
  date: {
    type: String,
    required: true
  },
  startTime: {
    type: Number,
    required: true
  },
  endTime: {
    type: Number,
    required: true
  }
});

//Model Book Schema
const Book = mongoose.model('Book', bookSchema);

//Validate Book Request
function validateBook(book) {
  const schema = Joi.object({
    email: Joi.string().required().max(50).email(),
    date: Joi.string().required(),
    startTime: Joi.number().required(),
    endTime: Joi.number().required()
  });
  return schema.validate(book);
}

module.exports.Book = Book;
module.exports.validateBook = validateBook;
