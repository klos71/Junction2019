import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focus: [60.1855949, 24.8248988],
      lat: 60.1855949,
      lng: 24.8248988,
      zoom: 15,
      markers: []
    };
    this.focusOnStation = this.focusOnStation.bind(this);
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        //console.log(pos.coords);
        this.setState({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    }
    fetch("https://klosbook.klos71.net/stations")
      .then((res) => res.json())
      .then((data) => {
        var temp = data;
        temp.forEach((el) => {
          el["dist"] = this._calculateDistance(
            { lat: el.Y, lng: el.X },
            { lat: this.state.lat, lng: this.state.lng }
          ).toFixed(2);
        });
        temp.sort(function(a, b) {
          return a.dist - b.dist;
        });
        this.setState({ markers: temp });
      });
  }

  focusOnStation(pos) {
    console.log(pos);
    this.setState({ focus: [pos[0], pos[1]] });
  }

  _calculateDistance(pos1, pos2) {
    var R = 6371; // km
    var dLat = this.toRad(pos2.lat - pos1.lat);
    var dLon = this.toRad(pos2.lng - pos1.lng);
    var lat1 = this.toRad(pos1.lat);
    var lat2 = this.toRad(pos2.lat);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return d;
  }
  toRad(Value) {
    return (Value * Math.PI) / 180;
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    let markers = this.state.markers.map((el, index) => {
      return (
        <Marker position={[el.Y, el.X]} key={index}>
          <Popup>
            Name: {el.data.name} <br /> EmptySlots: {el.data.free_slots}
            <p>
              Distance: {el.dist}
              Km
            </p>
          </Popup>
        </Marker>
      );
    });

    let stations = this.state.markers.map((el, index) => {
      return (
        <div
          key={index}
          onClick={() => this.focusOnStation([el.Y, el.X])}
          className='stationsList'
        >
          <p>Name: {el.data.name}</p>
          <p>EmptySlots:{el.data.free_slots}</p>
          <p>
            Distance:{" "}
            {this._calculateDistance(
              { lat: el.Y, lng: el.X },
              { lat: this.state.lat, lng: this.state.lng }
            ).toFixed(2)}{" "}
            Km
          </p>
        </div>
      );
    });

    return (
      <div className='flex-container'>
        <div className='alertContainer'>{stations}</div>
        <Map center={this.state.focus} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />

          {markers}
        </Map>
      </div>
    );
  }
}