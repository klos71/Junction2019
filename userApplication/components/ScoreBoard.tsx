import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";

import { Title } from "react-native-paper";

export default class ScoreBoard extends Component {
  state = {
    users: [
      { name: "test", score: 0 },
      { name: "test", score: 1 },
      { name: "test", score: 2 },
      { name: "test", score: 3 },
      { name: "yes", score: 400 }
    ]
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let list = this.state.users;
    list.sort((a, b) => {
      return b.score - a.score;
    });
    this.setState({ users: list });
  }

  render() {
    let board = this.state.users.map((el, index) => {
      return (
        <View key={index} style={styles.items}>
          <Title>Name: {el.name}</Title>
          <Title>Score: {el.score}</Title>
        </View>
      );
    });
    return (
      <View style={styles.container}>
        <Title style={{ fontSize: 24 }}>ScoreBoard</Title>
        <View style={styles.container}>
          <ScrollView>{board}</ScrollView>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "#fff",
    //alignItems: "center",
    justifyContent: "center"
  },
  items: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black"
  }
});
