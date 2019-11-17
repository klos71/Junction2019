import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from "react-native";
import {
  ActivityIndicator,
  Colors,
  Title,
  Paragraph
} from "react-native-paper";

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

export default class Missions extends Component {
  state = {
    location: null,
    missions: []
  };
  constructor(props) {
    super(props);
    //console.log(props);
  }
  shouldComponentUpdate() {
    return true;
  }

  async componentWillMount() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    //console.log(location);
  }
  componentDidMount() {
    fetch("https://klosbook.klos71.net/events")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.events);
        this.setState({ missions: data });
      });
  }

  _StartMission(mission) {
    this.props.changeView(mission);
  }

  _calculateDistance(pos1, pos2) {
    var R = 6371000; // km
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
    if (this.state.location != null) {
      console.log(this.state.location.coords);
      let missionList = this.state.missions;
      missionList.forEach((el) => {
        el["dist"] = Math.round(
          this._calculateDistance(
            { lat: el.org.lat, lng: el.org.lng },
            {
              lat: this.state.location.coords.latitude,
              lng: this.state.location.coords.longitude
            }
          )
        );
      });
      missionList.sort((a, b) => {
        return a.dist - b.dist;
      });
      let missions = missionList.map((el, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={styles.items}
            onPress={() => this._StartMission(el)}
          >
            <Title>{el.title}</Title>
            <Title>From:{el.org.name}</Title>
            <Paragraph>{el.desc}</Paragraph>

            <Paragraph>
              {el.score} points {el.dist} M
            </Paragraph>
          </TouchableOpacity>
        );
      });
      return (
        <ScrollView style={styles.container}>
          <Title>Missions</Title>
          <View>{missions}</View>
        </ScrollView>
      );
    } else {
      return (
        <View style={styles.container}>
          <ActivityIndicator
            animating={true}
            color={Colors.blue800}
            size={"large"}
          ></ActivityIndicator>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30
    //alignItems: "center",
    //justifyContent: "center"
  },
  items: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black"
  }
});
