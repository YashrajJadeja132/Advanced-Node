const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const cors = require("cors");
const rateLimiter = require("./middleware/rateLimiter");
const errorHandler = require("./utils/errorHandler");
const { routers } = require("./utils/routes");

require("./config/db");

const app = express();

app.use(express.json());
app.use(logger("dev"));
app.use(cors());
app.use(rateLimiter);

app.use("/api/users", routers.userRouter);

app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Database connection error:", err));

module.exports = app;
