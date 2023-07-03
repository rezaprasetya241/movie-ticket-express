const express = require("express");
const cors = require("cors");
const moviesRoutes = require("./src/movies/routes");

const app = express();
const port = 8080;
app.use(express.json());
app.use(cors());

// app.get("/", (req, res) => {
//   try {
//     res.send("hello saya reza");
//   } catch (error) {
//     res.send(error);
//   }
// });
app.use("/api/v1/movies", moviesRoutes);

app.listen(port, () => {
  console.log(`SERVER RUNNING ON PORT ${port}`);
});
