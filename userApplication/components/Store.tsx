import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { Title, Modal, Portal, Provider, Button } from "react-native-paper";

import QRCode from "react-native-qrcode-svg";

export default class Store extends Component {
  state = {
    awards: [
      { name: "BussTicket", cost: 10 },
      { name: "MovieTicket", cost: 70 },
      { name: "Fazer new Chocolate", cost: 40 }
    ],
    ShowCupons: false,
    CuponName: "BussTicket"
  };
  constructor(props) {
    super(props);
  }

  _toggleModal = () => {
    this.setState({ ShowCupons: !this.state.ShowCupons });
  };

  _reedemecupon = (text) => {
    this.setState({ CuponName: text, ShowCupons: !this.state.ShowCupons });
  };

  render() {
    let storeList = this.state.awards.map((el, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={styles.items}
          onPress={() => this._reedemecupon(el.name)}
        >
          <Title>{el.name}</Title>
          <Text>Prize:{el.cost} tokens</Text>
        </TouchableOpacity>
      );
    });
    return (
      <View style={styles.container}>
        <Title>Store Current Tokens: 15</Title>
        <View>{storeList}</View>
        <Button style={{ marginTop: 30 }} onPress={() => this._toggleModal()}>
          Show Redeemed Cupons
        </Button>

        <Modal
          visible={this.state.ShowCupons}
          onDismiss={() => this._toggleModal()}
        >
          <View>
            <View style={styles.modal}>
              <Title>{this.state.CuponName}</Title>
              <Text>Expires: 1H 29min</Text>
              <QRCode
                value='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                size={200}
              ></QRCode>
            </View>
          </View>
        </Modal>
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
  },
  modal: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
    margin: 15,
    backgroundColor: "#fff"
  }
});
