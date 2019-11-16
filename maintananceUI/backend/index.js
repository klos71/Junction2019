const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");

var stations = fs.readFileSync(__dirname + "/csvjson.json");
stations = JSON.parse(stations);

app.get("/", (req, res) => res.json(stations));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

