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
let db = config.get('db');

console.log(db);

if (process.env.NODE_ENV === 'production') {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('MongoDB Production connection established successfully');
    })
    .catch(() => {
      console.log('MongoDb Production could not connect');
    });
} else {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('MongoDB Developement connection established successfully');
    })
    .catch(() => {
      console.log('MongoDb Developement could not connect');
    });
}

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
