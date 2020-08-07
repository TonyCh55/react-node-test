const mongoUrl =
  "mongodb://tonY:qwerty55@ds133632.mlab.com:33632/tony_database";
const DB = mongoUrl;
const PORT = 3001;

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const moviesRouter = require("../routes/movies");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use("/api/movies", moviesRouter);

mongoose
  .connect(DB, { useNewUrlParser: true })
  .then(() => console.log("Database is connected"))
  .catch((err) => console.log(`Can't connect to the database ${err}`));

app.listen(PORT, () => {
  console.log(`This server is running on port: ${PORT}`);
});

module.exports = app;
