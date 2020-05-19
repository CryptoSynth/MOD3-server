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
const userRouter = require('./routes/users');

//Configure ENV Variables
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(compression());

//Mongoose Connection
const db = config.get('db');

const envType =
  process.env.NODE_ENV === 'production' ? 'Development' : 'Production';

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(`MongoDB ${envType} connection established successfully`);
  })
  .catch(() => {
    console.log(`MongoDB ${envType} could not connect`);
  });

//Use MOD3 Routes
app.use('/contacts', contactRouter);
app.use('/books', bookRouter);
app.use('/users', userRouter);

//error handling middleware
app.use(error);

//Port Connection
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
