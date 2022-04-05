const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require('dotenv').config();
const sequelize = require("./configs/dbconfig");
require("./models/person");
const route=require("./router/xlrouter");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use("/",route);

const port = process.env.PORT;
app.listen(port, () => console.log("Listening on", port));


sequelize.authenticate().then(() => console.log("Connected to DB Successfully ")).catch(err => console.log("DB Connection Failed", err.message));
sequelize.sync({force:true});