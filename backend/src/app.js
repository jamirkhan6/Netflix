const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const movieRoutes = require("./routes/movie.routes");
const userRoutes = require("./routes/user.routes")
const protectRoute = require("./middlewares/auth.middleware")

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

app.use(express.json())

app.use("/api/user", userRoutes);
app.use("/api/movies", protectRoute , movieRoutes);

module.exports = app;