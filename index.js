const config = require('config');
require('express-async-errors');
const error = require('./middleware/error.middleware');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');

//import routes
const contactRouter = require('./routes/contacts');
const bookRouter = require('./routes/books');

//Configure ENV Variables

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(compression());

//Mongoose Connection

mongoose.connect(config.get('db'), {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection
  .then(() => {
    console.log('MongoDB connection esablished successfully');
  })
  .catch(() => {
    console.log('MongoDb could not connect');
  });

//Use MOD3 Routes
app.use('/contacts', contactRouter);
app.use('/books', bookRouter);

//error handling middleware
app.use(error);

//Port Connection
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
