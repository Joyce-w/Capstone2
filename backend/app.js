const express = require('express');
const cors = require("cors");

//Import routes file that you will be using
const plantRoutes = require("./routes/plants")

const morgan = require("morgan");
const app = express();

//add middleware 

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: false }));

app.use("/plants", plantRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

/// sample app.js file below

// "use strict";

// /** Express app for jobly. */

// const express = require("express");
// const cors = require("cors");

// const { NotFoundError } = require("./expressError");

// const { authenticateJWT } = require("./middleware/auth");
// const authRoutes = require("./routes/auth");
// const companiesRoutes = require("./routes/companies");
// const usersRoutes = require("./routes/users");
// const jobsRoutes = require("./routes/jobs");

// const morgan = require("morgan");

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(morgan("tiny"));
// app.use(authenticateJWT);

// app.use("/auth", authRoutes);
// app.use("/companies", companiesRoutes);
// app.use("/users", usersRoutes);
// app.use("/jobs", jobsRoutes);


// /** Handle 404 errors -- this matches everything */
// app.use(function (req, res, next) {
//   return next(new NotFoundError());
// });

// /** Generic error handler; anything unhandled goes here. */
// app.use(function (err, req, res, next) {
//   if (process.env.NODE_ENV !== "test") console.error(err.stack);
//   const status = err.status || 500;
//   const message = err.message;

//   return res.status(status).json({
//     error: { message, status },
//   });
// });