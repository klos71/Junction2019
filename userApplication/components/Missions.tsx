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
    missions: [
      {
        id: 0,
        origin: "test station",
        olat: 60.1899949,
        olng: 24.8298988,
        destination: "test2 station",
        dlat: 60.1999949,
        dlng: 24.8378988
      },
      {
        id: 1,
        origin: "test station",
        olat: 60.1899949,
        olng: 24.8298988,
        destination: "test2 station",
        dlat: 60.204543,
        dlng: 24.811243
      },
      {
        id: 2,
        origin: "test station",
        olat: 60.1899949,
        olng: 24.8298988,
        destination: "test2 station",
        dlat: 60.204543,
        dlng: 24.811243
      },
      {
        id: 3,
        origin: "test station",
        olat: 60.1899949,
        olng: 24.8298988,
        destination: "test2 station",
        dlat: 60.204543,
        dlng: 24.811243
      },
      {
        id: 4,
        origin: "test station",
        olat: 60.1899949,
        olng: 24.8298988,
        destination: "test2 station",
        dlat: 60.204543,
        dlng: 24.811243
      },
      {
        id: 5,
        origin: "test station",
        olat: 60.1899949,
        olng: 24.8298988,
        destination: "test2 station",
        dlat: 60.1979949,
        dlng: 24.8378988
      },
      {
        id: 6,
        origin: "test station",
        olat: 20,
        olng: 60,
        destination: "test2 station",
        dlat: 21,
        dlng: 61
      }
    ]
  };
  constructor(props) {
    super(props);
    //console.log(props);
  }

  async componentWillMount() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    //console.log(location);
  }

  _StartMission(mission) {
    this.props.changeView(mission);
  }

  render() {
    if (this.state.location != null) {
      let missions = this.state.missions.map((el, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={styles.items}
            onPress={() => this._StartMission(el)}
          >
            <Title>{el.origin}</Title>
            <Title>{el.destination}</Title>
            <Paragraph>15 min</Paragraph>
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
