const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

//Create User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 288,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  }
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
  token;
};

//Model User Schema
const User = mongoose.model('User', userSchema);

//Validate User Request
function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(288),
    email: Joi.string().required().max(50).email(),
    password: Joi.string().required().min(5).max(1024)
  });

  return schema.validate(user);
}

module.exports.User = User;
module.exports.validateUser = validateUser;
