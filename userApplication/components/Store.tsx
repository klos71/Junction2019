import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
  Alert
} from "react-native";

import {
  Title,
  Modal,
  Portal,
  Provider,
  Button,
  Colors
} from "react-native-paper";

import QRCode from "react-native-qrcode-svg";
import CountDown from "react-native-countdown-component";

export default class Store extends Component {
  state = {
    awards: [
      { name: "BussTicket", cost: 10 },
      { name: "MovieTicket", cost: 70 },
      { name: "Fazer new Chocolate", cost: 40 }
    ],
    ShowCupons: false,
    CuponName: null,
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

  _toggleModal = () => {
    if (this.state.CuponName === null) {
      alert("You don't have any active cupons");
    } else {
      this.setState({ ShowCupons: !this.state.ShowCupons });
    }
  };
  shouldComponentUpdate() {
    return true;
  }

  _reedemecupon = (el) => {
    if (this.state.user.tokens < el.cost) {
      alert("To few tokens");
    } else {
      this.setState({ CuponName: el.name, ShowCupons: !this.state.ShowCupons });
    }
  };

  render() {
    let storeList = this.state.awards.map((el, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={styles.items}
          onPress={() => this._reedemecupon(el)}
        >
          <Title>{el.name}</Title>
          <Text>Prize:{el.cost} tokens</Text>
        </TouchableOpacity>
      );
    });
    if (this.state.user !== null) {
      return (
        <View style={styles.container}>
          <Title>
            {this.state.user.name} Current Tokens: {this.state.user.tokens}
          </Title>
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
                <CountDown
                  until={4682}
                  size={20}
                  timeToShow={["H", "M", "S"]}
                />
                <View style={{ padding: 40 }}>
                  <QRCode
                    value='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                    size={300}
                  ></QRCode>
                </View>
              </View>
            </View>
          </Modal>
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
