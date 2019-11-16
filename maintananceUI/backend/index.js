const express = require("express");

const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

var stations = fs.readFileSync(__dirname + "/csvjson.json");
stations = JSON.parse(stations);

app.get("/stations", (req, res) => res.jsonp(stations));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
