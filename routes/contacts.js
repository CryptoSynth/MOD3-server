const { Contact, validateContact } = require('../models/contact.model');
const express = require('express');

//load router
const router = express.Router();

router.get('/', async (req, res) => {
  const contact = await Contact.find();
  res.send(contact);
});

//POST /add
router.post('/add', async (req, res) => {
  const { error } = validateContact(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let contact = await Contact.findOne({ email: req.body.email });
  if (contact)
    return res.status(400).send('Looks like you already contacted us!');

  contact = new Contact({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    message: req.body.message
  });

  contact = await contact.save();
  res.send(contact);
});

module.exports = router;
