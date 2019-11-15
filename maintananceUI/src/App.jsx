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
      markers: [
        {
          name: "test",
          lat: 60.1859949,
          lng: 24.8248988,
          Slots: 10,
          emptySlots: 4
        },
        {
          name: "test",
          lat: 60.1895949,
          lng: 24.8278988,
          Slots: 15,
          emptySlots: 22
        }
      ]
    };
    this.focusOnStation = this.focusOnStation.bind(this);
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        console.log(pos.coords);
        this.setState({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    }
  }

  focusOnStation(pos) {
    console.log(pos);
    this.setState({ focus: [pos[0], pos[1]] });
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    let markers = this.state.markers.map((el, index) => {
      return (
        <Marker position={[el.lat, el.lng]} key={index}>
          <Popup>
            Name: {el.name} <br /> EmptySlots: {el.emptySlots}
          </Popup>
        </Marker>
      );
    });

    let stations = this.state.markers.map((el, index) => {
      return (
        <div key={index} onClick={() => this.focusOnStation([el.lat, el.lng])}>
          <p>Name: {el.name}</p>
          <p>EmptySlots:{el.emptySlots}</p>
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
