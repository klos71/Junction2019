const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.static(path.join(__dirname, "client/build")));
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

if (fs.existsSync(__dirname + "/users.json")) {
  var temp = fs.readFileSync(__dirname + "/users.json");
  temp = JSON.parse(temp);
  temp.forEach((user) => {
    user.doneEvents.forEach((event) => {
      ongoingEvenets.push({ name: user, event: event });
    });
  });
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});

app.get("/stations", (req, res) => {
  fetch("http://137.135.248.74/api/stations")
    .then((res) => res.json())
    .then((data) => {
      res.jsonp(data);
    });
});

app.get("/create/:user", (req, res) => {
  res.jsonp({
    name: req.params.user,
    id: users.length,
    tokens: 0,
    score: 0,
    mission: 0,
    doneEvents: [],
    kal: 0,
    km: 0,
    time: 0
  });
  users.push({
    name: req.params.user,
    id: users.length,
    tokens: 0,
    score: 0,
    mission: 0,
    doneEvents: [],
    kal: 0,
    km: 0,
    time: 0
  });
  fs.writeFileSync(__dirname + "/users.json", JSON.stringify(users));
});

app.get("/user/:user", (req, res) => {
  console.log(req.params.user);
  var found = false;
  users.map((el) => {
    if (el.user == req.params.user) {
      res.jsonp(el);
      found = true;
    }
  });
  if (!found) {
    res.json({ error: "User not found" });
  }
});

app.get("/users", (req, res) => {
  res.jsonp(users);
});

app.get("/events", (req, res) => {
  res.json(events);
});

app.post("/events", (req, res) => {
  var name = req.body.name;
  var reqEvent = req.body.event;
  var found = false;
  console.log(name, reqEvent);
  ongoingEvenets.forEach((el) => {
    if (el.event.eventID === reqEvent.eventID) {
      found = true;
    }
  });
  if (found) {
    res.json({ error: "Event is already ongoing", event: reqEvent });
  } else {
    ongoingEvenets.push({ name: name, event: reqEvent });
    res.json({ name: name, event: reqEvent });
    users.forEach((el) => {
      console.log(el);
      if (name.name == el.name) {
        el.doneEvents.push(reqEvent);
      }
    });
    fs.writeFileSync(__dirname + "/users.json", JSON.stringify(users));
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
