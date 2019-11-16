import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Missions from "./components/Missions";
import Recent from "./components/Recent";
import ScoreBoard from "./components/ScoreBoard";
import HomeComponent from "./components/Home";
import Profile from "./components/Profile";
import Store from "./components/Store";
import MissionMap from "./components/MissionMap";

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import { AsyncStorage } from "react-native";

import {
  Provider as PaperProvider,
  BottomNavigation,
  TextInput,
  Button
} from "react-native-paper";

const Home = () => <HomeComponent></HomeComponent>;

const MissionsRoute = () => <Missions></Missions>;

const RecentsRoute = () => <Recent></Recent>;

const ScoreBoardRoute = () => <ScoreBoard></ScoreBoard>;

const ProfileRoute = () => <Profile></Profile>;

const StoreRoute = () => <Store></Store>;

const MissionMapRoute = () => <MissionMap></MissionMap>;

export default class App extends Component {
  state = {
    user: null,
    userInput: null,
    index: 0,
    routes: [
      { key: "home", title: "Home", icon: "home", color: "#0000ff" },
      {
        key: "mission",
        title: "Missions",
        icon: "trophy-award",
        color: "#0000ff"
      },
      { key: "recents", title: "Recents", icon: "history", color: "#0000ff" },
      { key: "map", title: "Map", icon: "map", color: "#0000ff" },
      {
        key: "scoreboard",
        title: "Scores",
        icon: "bulletin-board",
        color: "#0000ff"
      },
      { key: "profile", title: "Profile", icon: "face", color: "#0000ff" },
      { key: "store", title: "Store", icon: "store", color: "#0000ff" }
    ]
  };
  _handleIndexChange = (index) => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    home: Home,
    mission: MissionsRoute,
    recents: RecentsRoute,
    map: MissionMapRoute,
    scoreboard: ScoreBoardRoute,
    profile: ProfileRoute,
    store: StoreRoute
  });

  async componentWillMount() {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        this.setState({ user: value });
      }
    } catch (err) {
      console.log(err);
    }
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    let location = await Location.getCurrentPositionAsync({});
    //this.setState({ location });
    //console.log(location);
  }

  _storeData = async (user) => {
    try {
      await AsyncStorage.setItem("user", user);
      console.log(user);
      this.setState({ user: user });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    if (this.state.user === null) {
      return (
        <View style={styles.container}>
          <TextInput
            label='NickName'
            value={this.state.userInput}
            onChangeText={(text) => this.setState({ userInput: text })}
          />
          <Button
            icon='content-save'
            mode='contained'
            onPress={() => this._storeData(this.state.userInput)}
          >
            Set Name
          </Button>
        </View>
      );
    } else {
      return (
        <PaperProvider>
          <BottomNavigation
            navigationState={this.state}
            onIndexChange={this._handleIndexChange}
            renderScene={this._renderScene}
          />
        </PaperProvider>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0000ff",
    //alignItems: "center",
    justifyContent: "center"
  }
});
