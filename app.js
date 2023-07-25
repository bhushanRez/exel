const express = require("express");
const xlsx = require("xlsx");
const cors = require("cors");

const connection = require("./connection/connection");
const routes = require("./routes/route");

const app = express();

app.use(cors());

app.use(express.json());



app.use("/", routes);

app.listen(4000, () => {
  console.log("app is listening");
});
