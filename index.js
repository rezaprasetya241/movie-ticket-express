const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// routes
const moviesRoutes = require("./src/movies/routes");
const userRoutes = require("./src/users/routes");

const app = express();
const port = 8080;
app.use(express.json());
app.use(cors());

app.use("/api/v1/movies", moviesRoutes);
app.use("/api/v1/users", userRoutes);

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`SERVER RUNNING ON PORT ${port}`);
});
