const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const compression = require("compression");

const StatusResource = require("./resources/status.resource");
const UptimeResource = require("./resources/uptime.resource");

const app = express();

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(compression());
app.use(cors(corsOptions));

// parse requests
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));

//  === Routes
app.use("/status", new StatusResource().router);
app.use("/uptime", new UptimeResource().router);

module.exports = app;