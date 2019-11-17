import React, { Component } from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import {
  ActivityIndicator,
  Colors,
  Title,
  Paragraph,
  Card
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
          <Card>
            <Card.Title
              title={this.state.user.name}
              subtitle='Bike Mover Supreme'
            ></Card.Title>
            <Card.Content>
              <Title>Missions done: {this.state.user.doneEvents.length}</Title>
              <Title>Score: {this.state.user.score}</Title>
              <Paragraph>Tokens: {this.state.user.tokens}</Paragraph>

              <Paragraph>Calories burnt: {this.state.user.kal}</Paragraph>
              <Paragraph>Distance travled: {this.state.user.km} Km</Paragraph>
              <Paragraph>Time spent moving: {this.state.user.time} H</Paragraph>
            </Card.Content>
          </Card>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //alignItems: "center",
    justifyContent: "center"
  }
});
