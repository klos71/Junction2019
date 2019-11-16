import React, { Component } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
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

export default class App extends Component {
  state = {
    user: null,
    userInput: null,
    index: 0,
    timer: 0,
    updateIndex: 0,
    routes: [
      { key: "home", title: "Home", icon: "home", color: "#0000ff" },
      {
        key: "mission",
        title: "Missions",
        icon: "trophy-award",
        color: "#0000ff"
      },
      { key: "recents", title: "History", icon: "history", color: "#0000ff" },
      { key: "map", title: "Map", icon: "map", color: "#0000ff" },
      {
        key: "scoreboard",
        title: "Scores",
        icon: "bulletin-board",
        color: "#0000ff"
      },
      { key: "profile", title: "Profile", icon: "face", color: "#0000ff" },
      { key: "store", title: "Store", icon: "store", color: "#0000ff" }
    ],
    mission: null
  };
  _handleIndexChange = (index) => this.setState({ index });
  _handleMissionMap = (mission) => {
    fetch("https://klosbook.klos71.net/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.user,
        event: mission
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          this.setState({ mission: mission });
          console.log(mission);
          this._handleIndexChange(3);
        }
      });
  };

  _returnMission() {
    return this.state.mission;
  }

  MissionMapRoute = () => (
    <MissionMap
      getMission={() => this._returnMission()}
      mission={this.state.mission}
      changeView={(index) => this._handleIndexChange(index)}
      forceAppUpdate={() => this._RefreshApplicationUI()}
    ></MissionMap>
  );
  Home = () => <HomeComponent user={this.state.user}></HomeComponent>;

  MissionsRoute = () => (
    <Missions changeView={(index) => this._handleMissionMap(index)}></Missions>
  );
  _timerCounter = (e) => {
    this.setState({ timer: e });
  };

  RecentsRoute = () => <Recent></Recent>;

  ScoreBoardRoute = () => <ScoreBoard></ScoreBoard>;

  ProfileRoute = () => <Profile></Profile>;

  StoreRoute = () => (
    <Store timerCounter={(e) => this._timerCounter(e)}></Store>
  );

  _renderScene = BottomNavigation.SceneMap({
    home: this.Home,
    mission: this.MissionsRoute,
    recents: this.RecentsRoute,
    map: this.MissionMapRoute,
    scoreboard: this.ScoreBoardRoute,
    profile: this.ProfileRoute,
    store: this.StoreRoute
  });

  _RefreshApplicationUI() {
    this.setState({ updateIndex: this.state.updateIndex + 1 });
  }

  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        fetch("https://klosbook.klos71.net/user/" + value)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.error) {
            } else {
              this.setState({ user: data, loading: false });
            }
          });
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
      fetch("https://klosbook.klos71.net/create/" + user)
        .then((res) => res.json())
        .then((data) => {
          this.setState({ user: data, loading: false });
        });
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
        <PaperProvider key={this.state.updateIndex}>
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
