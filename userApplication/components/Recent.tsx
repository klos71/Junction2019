import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import { Title, Paragraph, Colors } from "react-native-paper";

export default class Recent extends Component {
  state = {
    missions: [],
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
    if (this.state.user !== null) {
      let missions = this.state.user.doneEvents.map((el, index) => {
        let date = new Date(Date.now());
        return (
          <TouchableOpacity key={index} style={styles.items}>
            <Title>{el.orgStation}</Title>
            <Title>{el.Dstation}</Title>
            <Paragraph>Done: {date.toLocaleDateString()}</Paragraph>
          </TouchableOpacity>
        );
      });
      return (
        <ScrollView style={styles.container}>
          <Title>History</Title>
          {missions}
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
