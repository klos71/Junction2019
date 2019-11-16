import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

export default class MissionMap extends Component {
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
      let origin = {
        latitude: this.state.location.coords.latitude,
        longitude: this.state.location.coords.longitude
      };
      let destination = { latitude: 60.1895949, longitude: 24.8278988 };

      return (
        <View style={styles.container}>
          <MapView
            initialRegion={{
              latitude: this.state.location.coords.latitude,
              longitude: this.state.location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
            style={{
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height
            }}
          >
            <Marker coordinate={origin} pinColor={"#00cc00"}></Marker>
            <Marker coordinate={destination} pinColor={"#0066ff"}></Marker>
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={"AIzaSyChMiDG06JcWCf3oyof_z6gTcHxuMQUeDY"}
              mode={"BICYCLING"}
              strokeColor='blue'
            />
          </MapView>
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
