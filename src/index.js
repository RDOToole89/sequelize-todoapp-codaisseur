const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hello world!");
});

const PORT = 4000;

app.listen(PORT, (req, res) => {
  console.log(`Server listening on port ${PORT}.`);
});
