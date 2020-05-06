const { Book, validateBook } = require('../models/book.model');
const express = require('express');
const moment = require('moment');

//load router
const router = express.Router();

//GET /
router.get('/', async (req, res) => {
  const book = await Book.find().select({ date: 1, startTime: 1, endTime: 1 });
  res.send(book);
});

//POST /add
router.post('/add', async (req, res) => {
  const { error } = validateBook(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const start = req.body.startTime;
  const end = req.body.endTime;

  console.log(typeof start);
  console.log(end);

  const isOverlap = await Book.findOne({
    $or: [
      {
        $and: [
          { startTime: { $gte: start } },
          { startTime: { $lte: end } },
          { date: { $eq: req.body.date } }
        ],
        $and: [
          { endTime: { $gte: start } },
          { endTime: { $lte: end } },
          { date: { $eq: req.body.date } }
        ]
      }
    ]
  });

  if (isOverlap)
    return res
      .status(400)
      .send(
        `Sorry, ${moment(req.body.startTime).format('hh:mm A')} - ${moment(
          req.body.endTime
        ).format('hh:mm A')} @ ${moment(req.body.date, 'YYYY-MM-DD').format(
          'MM/DD/YYYY'
        )} is unavailiable. Please choose another time or date.`
      );

  let book = await Book.findOne({ email: req.body.email });
  if (book)
    return res
      .status(400)
      .send('Looks like you already booked an appointment!');

  book = new Book({
    email: req.body.email,
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime
  });

  book = await book.save();
  res.send(book);
});

module.exports = router;
