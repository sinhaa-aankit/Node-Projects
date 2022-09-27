const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//Middleware
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

app.use('/api/v1/tours', tourRouter); // mounting multiple tours routes
app.use('/api/v1/users', userRouter); // mounting multiple users routes

//Unhandled Routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//Global Error handling middleware
app.use(globalErrorHandler);

module.exports = app;
