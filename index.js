const express = require("express");

const app = express();
const port = 8080;
app.use(express.json());

app.get("/", (req, res) => {
  try {
    res.send("hello saya reza");
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, () => {
  console.log(`SERVER RUNNING ON PORT ${port}`);
});
