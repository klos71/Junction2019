import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

export default class MissionMap extends Component {
  state = { location: null, mission: null };
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

  async componentDidMount() {
    if (this.state.location == null) {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      let location = await Location.getCurrentPositionAsync({});
      this.setState({ location });
    }
    let temp = this.props.getMission();
    console.log(temp);
    if (temp !== null) {
      this.setState({ mission: temp });
      this.forceUpdate();
    }
  }

  _force() {
    this.forceUpdate();
  }

  render() {
    let origin;
    let destination;

    if (this.state.location !== null) {
      if (this.state.mission !== null) {
        //console.log(this.state.mission.olat);
        //console.log(this.state.mission.olng);
        origin = {
          latitude: this.state.mission.olat,
          longitude: this.state.mission.olng
        };
        destination = {
          latitude: this.state.mission.dlat,
          longitude: this.state.mission.dlng
        };
        //console.log(destination);

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
        if (this.state.location !== null) {
          if (this.state.mission !== null) {
            this.forceUpdate();
          }
        }
        return (
          <View style={styles.container}>
            <ActivityIndicator
              animating={true}
              color={Colors.red600}
              size={"large"}
            ></ActivityIndicator>
          </View>
        );
      }
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
