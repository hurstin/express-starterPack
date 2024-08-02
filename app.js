const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const router = require('./router/route');
const AppError = require('./appError');
const globalErrorHandler = require('./controller/errorController');

dotenv.config({ path: './config.env' });

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

// app.use((req, res, next) => {
//   res.send('hello from the backend');
//   next();
// });

app.use('/starter/api/v1', router);

// to handle route that is not defined and it must alway come last after all other routes
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `can't find ${req.originalUrl} on the server`,
  // });
  next(new AppError(`can't find ${req.originalUrl} on the server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
