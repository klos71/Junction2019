import React, { Component } from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";

import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  List
} from "react-native-paper";

export default class HomeComponent extends Component {
  state = { user: null, howTo: false };
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
  _handlePress = () =>
    this.setState({
      expanded: !this.state.howTo
    });
  render() {
    return (
      <View style={styles.container}>
        <Card>
          <Card.Title
            title={this.state.user}
            subtitle='Bike Mover Supreme'
          ></Card.Title>
          <Card.Content>
            <Paragraph>Missions completed</Paragraph>
            <Paragraph>Score</Paragraph>
            <Paragraph>Tokens </Paragraph>
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
