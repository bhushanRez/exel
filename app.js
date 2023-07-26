const express = require("express");
const cors = require("cors");
const connection=require('./connection/connection');
const routes = require("./routes/route");
const adminRoutes=require('./routes/authRoute');
const dataRoutes=require('./routes/dataRoute');
const app = express();

app.use(cors());

app.use(express.json());



app.use("/", routes);

app.use('/auth',adminRoutes);

app.use('/data',dataRoutes);



app.listen(4000, () => {
  console.log("app is listening");
});
