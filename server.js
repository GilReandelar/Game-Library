require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const gameRoutes = require("./routes/games");
const authRoutes = require("./routes/auth");

const errorHandler = require("./middlewares/errorHandler");
const limiter = require("./middlewares/rateLimiter");
const logger = require("./middlewares/logger");

// express app
const app = express();

// middleware
app.use(express.json()); // parse JSON bodies (as sent by API clients)
app.use("/api", limiter); // Apply rate limiting to all /api routes
app.use(logger); // Logs all incoming requests

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
// Authentication routes
app.use("/auth", authRoutes);

// Game routes
app.use("/api/games", gameRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// error handler
app.use(errorHandler);
