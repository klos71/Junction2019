import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { Title } from "react-native-paper";

export default class Store extends Component {
  state = {
    awards: [
      { name: "BussTicket", cost: 10 },
      { name: "MovieTicket", cost: 70 },
      { name: "Fazer new Chocolate", cost: 40 }
    ]
  };
  constructor(props) {
    super(props);
  }

  render() {
    let storeList = this.state.awards.map((el, index) => {
      return (
        <TouchableOpacity key={index} style={styles.items}>
          <Title>{el.name}</Title>
          <Text>Prize:{el.cost} tokens</Text>
        </TouchableOpacity>
      );
    });
    return (
      <View style={styles.container}>
        <Title>Store Current Tokens: 15</Title>
        <View>{storeList}</View>
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
  },
  items: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
    margin: 15
  }
});
