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

var users = [];
if (fs.existsSync(__dirname + "/users.json")) {
  var temp = fs.readFileSync(__dirname + "/users.json");
  temp = JSON.parse(temp);

  temp.forEach((el) => {
    users.push(el);
  });
}

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
    },
    {
      eventID: 1,
      orgStation: "555 Kalevalantie",
      orgLat: 60.184765,
      orgLng: 24.804022,
      Dstation: "557 Louhentori",
      Dlat: 60.18715,
      Dlong: 24.796959
    },
    {
      eventID: 2,
      orgStation: "527 Otsolahti",
      orgLat: 60.178655,
      orgLng: 24.817423,
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

app.get("/user/:user", (req, res) => {
  console.log(req.params.user);
  var found = false;
  users.map((el) => {
    if (el.user == req.headers.user) {
      res.jsonp(el);
      found = true;
    }
  });
  if (!found) {
    res.jsonp({
      name: req.params.user,
      id: users.length,
      tokens: 0,
      score: 0,
      mission: 0,
      doneEvents: []
    });
    users.push({
      name: req.params.user,
      id: users.length,
      tokens: 0,
      score: 0,
      mission: 0,
      doneEvents: []
    });
  }
  fs.writeFileSync(__dirname + "/users.json", JSON.stringify(users));
});

app.get("/users", (req, res) => {
  res.jsonp(users);
});

app.get("/events", (req, res) => {
  res.json(events);
});

app.post("/events", (req, res) => {
  var name = req.body.name;
  var eventID = req.body.eventID;
  var temp = { name: name, eventID: eventID };
  var found = false;
  var event = null;
  events.events.forEach((el) => {
    ongoingEvenets.forEach((element) => {
      console.log(element.eventID);
      console.log(el.eventID);
      if (element.eventID === el.eventID) {
        found = true;
        event = el;
      }
    });
  });
  if (found) {
    res.json({ error: "This event has already started", event: event });
  } else {
    ongoingEvenets.push(temp);
    users.forEach((el) => {
      if (el.name === name) {
        el.doneEvents.push(temp);
      }
    });
    console.log(ongoingEvenets);
    res.json(temp);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
