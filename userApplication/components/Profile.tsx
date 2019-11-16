import React, { Component } from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import {
  ActivityIndicator,
  Colors,
  Title,
  Paragraph
} from "react-native-paper";

export default class Profile extends Component {
  state = { user: null };
  constructor(props) {
    super(props);
  }
  async componentWillMount() {
    try {
      const value = await AsyncStorage.getItem("user");
      console.log(value);

      if (value !== null) {
        fetch("https://klosbook.klos71.net/user/" + value)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            this.setState({ user: data });
          });
      }
    } catch (err) {
      console.log(err);
    }
  }

  shouldComponentUpdate() {
    return true;
  }
  render() {
    if (this.state.user === null) {
      return (
        <View style={styles.container}>
          <ActivityIndicator
            animating={true}
            color={Colors.blue800}
            size={"large"}
          ></ActivityIndicator>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Title>{this.state.user.name}</Title>
          <Paragraph>
            Missions done: {this.state.user.doneEvents.length}
          </Paragraph>
          <Paragraph>Score: {this.state.user.score}</Paragraph>
          <Paragraph>Tokens: {this.state.user.tokens}</Paragraph>
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
