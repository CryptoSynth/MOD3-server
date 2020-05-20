const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const { User } = require('../models/user.model');
const express = require('express');

// load router
const router = express.Router();

//POST /signup
router.post('/user', async (req, res) => {
  const { error } = validateAuth(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');

  //decode user password
  const secretValid = await bcrypt.compare(req.body.password, user.password);
  if (!secretValid) return res.status(400).send('Invalid email or password.');

  //generate JWT
  const token = user.generateAuthToken();

  //send JWT to user
  res.send(token);
});

//Validate Auth Request
function validateAuth(req) {
  const schema = Joi.object({
    email: Joi.string().required().max(50).email(),
    password: Joi.string().required().min(5).max(1024)
  });

  return schema.validate(req);
}

module.exports = router;
