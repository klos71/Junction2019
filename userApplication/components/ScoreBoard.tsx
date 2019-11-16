import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";

import { Title } from "react-native-paper";

export default class ScoreBoard extends Component {
  state = {
    users: []
  };
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate() {
    return true;
  }

  componentDidMount() {
    fetch("https://klosbook.klos71.net/users")
      .then((res) => res.json())
      .then((data) => {
        let list = data;
        list.sort((a, b) => {
          return b.score - a.score;
        });
        this.setState({ users: list });
      });
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
