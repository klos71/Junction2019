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
        this.setState({ missions: data.events });
      });
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
            <Title>{el.orgStation}</Title>
            <Title>{el.Dstation}</Title>
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
