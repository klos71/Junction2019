import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
  Image,
  ImageBackground
} from "react-native";
import {
  ActivityIndicator,
  Colors,
  Button,
  Title,
  Paragraph
} from "react-native-paper";

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapView, { Marker, Callout } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { white } from "react-native-paper/lib/typescript/src/styles/colors";

export default class MissionMap extends Component {
  state = { location: null, mission: null, updateindex: 0, complete: false };
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
      this.setState({ updateindex: this.state.updateindex + 1 });
    }
  }

  _force() {
    console.log(this.state.updateindex);

    let temp = this.props.getMission();
    console.log(temp);
    if (temp !== null) {
      this.setState({ mission: temp });
      this.setState({ updateindex: this.state.updateindex + 1 });
    }
  }
  _handleCompleteMission() {
    this.setState({ complete: !this.state.complete });
  }
  _dismissCompleteModal() {
    this.setState({ complete: false });

    this.props.changeView(0);
    this.props.forceAppUpdate();
  }
  render() {
    let origin;
    let destination;

    if (this.state.location !== null) {
      if (this.state.mission !== null) {
        //console.log(this.state.mission.olat);
        //console.log(this.state.mission.olng);
        origin = {
          latitude: this.state.mission.orgLat,
          longitude: this.state.mission.orgLng
        };
        destination = {
          latitude: this.state.mission.Dlat,
          longitude: this.state.mission.Dlong
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
                flex: 5
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
            <View>
              <Button
                mode='contained'
                color={Colors.green800}
                onPress={() => this._handleCompleteMission()}
                style={{
                  width: Dimensions.get("window").width,
                  height: 50,
                  alignItems: "center"
                }}
              >
                Complete Mission
              </Button>
            </View>
            <Modal visible={this.state.complete}>
              <View>
                <View style={styles.modal}>
                  <ImageBackground
                    source={require("../assets/7DZz.gif")}
                    style={{
                      width: Dimensions.get("window").width,
                      height: Dimensions.get("window").height,
                      opacity: 0.8
                    }}
                  >
                    <View style={styles.container2}>
                      <Text style={styles.text}>CONGRATULATIONS!</Text>
                      <Text style={styles.text}>Score: 15</Text>
                      <Text style={styles.text}>Tokens: 3</Text>
                      <Text style={styles.text}>Kalories Burnt: 15</Text>
                      <Text style={styles.text}>Distance: 15</Text>
                      <Text style={styles.text}>Time Spent: 15</Text>
                      <Button
                        onPress={() => this._dismissCompleteModal()}
                        mode='contained'
                        style={{
                          width: Dimensions.get("window").width,
                          marginTop: 300
                        }}
                        color={Colors.lime600}
                        icon='trophy-award'
                      >
                        Back to Home
                      </Button>
                    </View>
                  </ImageBackground>
                </View>
              </View>
            </Modal>
          </View>
        );
      } else {
        return (
          <View style={styles.container} key={this.state.updateindex}>
            <ActivityIndicator
              animating={true}
              color={Colors.red600}
              size={"large"}
            ></ActivityIndicator>
            <Button
              color={Colors.lime600}
              icon='reload'
              mode='contained'
              onPress={() => this._force()}
              style={{ width: Dimensions.get("window").width }}
            >
              Reload Map
            </Button>
          </View>
        );
      }
    } else {
      return (
        <View style={styles.container} key={this.state.updateindex}>
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
  },
  modal: {
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    //backgroundColor: "#0000ff",
    height: Dimensions.get("window").height
  },
  container2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    alignSelf: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: 28
  }
});
