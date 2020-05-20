const bcrypt = require('bcrypt');
const { User, validateUser } = require('../models/user.model');
const express = require('express');

// load router
const router = express.Router();

//POST /signup
router.post('/signup', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already signed up!');

  //generate salt and hash user password
  const salt = await bcrypt.genSalt(10);
  const secret = await bcrypt.hash(req.body.password, salt);

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: secret
  });

  await user.save();

  //generate JWT
  const token = user.generateAuthToken();

  //set header w/ token and user info
  res.header('x-auth-token', token).send({
    name: user.name,
    email: user.email
  });
});

module.exports = router;
