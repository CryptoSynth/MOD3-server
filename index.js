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
const authRouter = require('./routes/auth');

//Configure ENV Variables
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(compression());

//JWT Secret Key configured
const jwtPrivateKey = config.get('jwtPrivateKey');
if (!jwtPrivateKey) {
  console.log('FATAL ERROR: jwtPrivateKey is not defined!');
  process.exit(1);
}

//Mongoose Connection
const db = config.get('db');

const envType =
  process.env.NODE_ENV === 'production' ? 'Production' : 'Development';

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
    process.exit(1);
  });

//Use MOD3 Routes
app.use('/contacts', contactRouter);
app.use('/books', bookRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);

//error handling middleware
app.use(error);

//Port Connection
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
