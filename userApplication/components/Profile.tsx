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
        this.setState({ user: value });
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Title>{this.state.user}</Title>
        <Paragraph>Missions done: 15</Paragraph>
        <Paragraph>Score: 45</Paragraph>
        <Paragraph>Tokens: 45</Paragraph>
      </View>
    );
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
