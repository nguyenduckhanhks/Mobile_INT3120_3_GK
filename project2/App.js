import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import Home from "./components/Home"
import Movie from "./components/Movie"

const AppNavigator = createStackNavigator(
  {
    HomeScreen: {
      screen: Home
    },
    MovieScreen: {
      screen: Movie 
    }
  },
  {
    initialRouteName: 'HomeScreen'
  }
)

const Apps = createAppContainer(AppNavigator)

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Apps/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
});
