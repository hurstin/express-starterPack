const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const router = require('./router/route');
const AppError = require('./appError');
const globalErrorHandler = require('./controller/errorController');

dotenv.config({ path: './config.env' });

const app = express();

// global middlewares
// for setting security http headers
app.use(helmet());

// development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// limit requests from same ip
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'too many request from this ip, please try again in an hour',
});

//should be called before all route with '/api'
app.use('/api', limiter);

// body parser,reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

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
