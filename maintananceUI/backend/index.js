const express = require("express");

const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

var events = {
  events: [
    {
      eventID: 0,
      orgStation: "539 Aalto-yliopisto (M), Tietotie",
      orgLat: 60.184987,
      orgLng: 24.820099,
      Dstation: "557 Louhentori",
      Dlat: 60.18715,
      Dlong: 24.796959
    }
  ]
};

var ongoingEvenets = [];

app.get("/stations", (req, res) => {
  fetch("http://137.135.248.74/api/stations")
    .then((res) => res.json())
    .then((data) => {
      res.jsonp(data);
    });
});

app.get("/events", (req, res) => {
  res.json(events);
});

app.post("/events", (req, res) => {
  var name = req.body.name;
  var eventID = req.body.eventID;
  var temp = { name: name, eventID: eventID };
  var found = false;
  events.events.forEach((el) => {
    ongoingEvenets.forEach((element) => {
      console.log(element.eventID);
      console.log(el.eventID);
      if (element.eventID === el.eventID) {
        found = true;
      }
    });
  });
  if (found) {
    res.json({ error: "This event has already started" });
  } else {
    ongoingEvenets.push(temp);
    console.log(ongoingEvenets);
    res.json(temp);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
