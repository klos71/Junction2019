import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

export default class Missions extends Component {
  state = { location: null };
  constructor(props) {
    super(props);
  }

  async componentWillMount() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    console.log(location);
  }

  render() {
    if (this.state.location != null) {
      return (
        <View style={styles.container}>
          <Text>Missions</Text>
          <Text>{this.state.location.coords.latitude}</Text>
        </View>
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
    alignItems: "center",
    justifyContent: "center"
  }
});
