const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const movieRoutes = require("./routes/movie.routes");
const userRoutes = require("./routes/user.routes")

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

app.use(express.json())

app.use("/api/movies", movieRoutes);
app.use("/api/user", userRoutes);

module.exports = app;