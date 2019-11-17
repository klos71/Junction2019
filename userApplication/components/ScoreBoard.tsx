import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  AsyncStorage
} from "react-native";

import { Title } from "react-native-paper";

export default class ScoreBoard extends Component {
  state = {
    users: [],
    user: null
  };
  constructor(props) {
    super(props);
  }

  async componentWillMount() {
    try {
      const value = await AsyncStorage.getItem("user");
      console.log(value);

      if (value !== null) {
        this.setState({ user: value });
      }
    } catch (err) {
      console.log(err);
    }
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
      if (el.name === this.state.user) {
        return (
          <View key={index} style={styles.meItem}>
            <Title style={styles.meText}>Name: {el.name}</Title>
            <Title style={styles.meText}>Score: {el.score}</Title>
          </View>
        );
      } else {
        return (
          <View key={index} style={styles.items}>
            <Title>Name: {el.name}</Title>
            <Title>Score: {el.score}</Title>
          </View>
        );
      }
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
  },
  meItem: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#0000ff"
  },
  meText: {
    color: "#0000ff"
  }
});
