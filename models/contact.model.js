const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

//Create Exercise Schema
const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 50
  },
  email: {
    type: String,
    unique: true,
    required: true,
    maxlength: 50
  },
  phone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 20
  },
  message: {
    type: String,
    maxlength: 255
  }
});

//Model Exercuse Schema
const Contact = mongoose.model('Contact', contactSchema);

//Validate Contact Request
function validateContact(contact) {
  const schema = Joi.object({
    firstName: Joi.string().required().max(50),
    lastName: Joi.string().required().max(50),
    email: Joi.string().required().max(50).email(),
    phone: Joi.string().required().max(20).min(10),
    message: Joi.string().required().max(255)
  });

  return schema.validate(contact);
}

module.exports.Contact = Contact;
module.exports.validateContact = validateContact;
