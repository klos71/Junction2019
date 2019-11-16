import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  ActivityIndicator
} from "react-native";

import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  List,
  Colors
} from "react-native-paper";

export default class HomeComponent extends Component {
  state = { user: null, howTo: false };
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate() {
    return true;
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
  _handlePress = () =>
    this.setState({
      expanded: !this.state.howTo
    });
  render() {
    if (this.state.user !== null) {
      return (
        <View style={styles.container}>
          <Card>
            <Card.Title
              title={this.state.user.name}
              subtitle='Bike Mover Supreme'
            ></Card.Title>
            <Card.Content>
              <Paragraph>
                Missions completed: {this.state.user.doneEvents.length}
              </Paragraph>
              <Paragraph>Score: {this.state.user.score}</Paragraph>
              <Paragraph>Tokens: {this.state.user.tokens} </Paragraph>
            </Card.Content>
          </Card>
          <List.Section>
            <List.Accordion
              title='How does it Work?'
              left={(props) => (
                <List.Icon {...props} icon='account-question-outline' />
              )}
            >
              <List.Item
                title='Missions'
                description='Missions will show up in the missions tab for you to complete'
              ></List.Item>

              <List.Item
                title='Tokens: '
                description='When you have completed missions you will get tokens, this
                tokens you can use to reedeme prizes in the store'
                descriptionNumberOfLines={4}
              ></List.Item>
            </List.Accordion>
          </List.Section>
        </View>
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
    //alignItems: "center",
    justifyContent: "center"
  }
});
