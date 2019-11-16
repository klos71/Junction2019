import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Title, Paragraph } from "react-native-paper";

export default class Recent extends Component {
  state = {
    missions: [
      {
        origin: "test station",
        olat: 20,
        olng: 60,
        destination: "test2 station",
        dlat: 21,
        dlng: 61,
        time: new Date(Date.now() - 10000)
      },
      {
        origin: "test station",
        olat: 20,
        olng: 60,
        destination: "test2 station",
        dlat: 21,
        dlng: 61,
        time: new Date(Date.now())
      },
      {
        origin: "test station",
        olat: 20,
        olng: 60,
        destination: "test2 station",
        dlat: 21,
        dlng: 61,
        time: new Date(Date.now() - 10000)
      }
    ]
  };
  constructor(props) {
    super(props);
  }

  render() {
    let missions = this.state.missions.map((el, index) => {
      return (
        <TouchableOpacity key={index} style={styles.items}>
          <Title>{el.origin}</Title>
          <Title>{el.destination}</Title>
          <Paragraph>Done: {el.time.toDateString()}</Paragraph>
        </TouchableOpacity>
      );
    });
    return (
      <ScrollView style={styles.container}>
        <Title>Recent</Title>
        {missions}
      </ScrollView>
    );
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
