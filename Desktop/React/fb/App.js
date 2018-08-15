import React from 'react';
import { View, Text, Button  } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation';
import { HomeScreen } from './Home';
import { DetailsScreen } from './Details';
import { LoginScreen } from './Login';

import * as firebase from "firebase";

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions:  {
        title: 'Home'
      }
    },
    Details: {
      screen: DetailsScreen,
      navigationOptions:  {
        title: 'Details',
        headerLeft: null
      }
    },
    Login: {
      screen: LoginScreen,
      navigationOptions:  {
        title: 'Login'
      }
    },
  },
  {
    initialRouteName: 'Login',
  }
);

export default class App extends React.Component {

  constructor(){
    super();
    firebase.initializeApp({
      apiKey: "AIzaSyBat6LWYwNx3bVDNO71_bti67jmD9fZDs8",
      authDomain: "desafio-4d6dd.firebaseapp.com",
      databaseURL: "https://desafio-4d6dd.firebaseio.com",
      projectId: "desafio-4d6dd",
      storageBucket: "desafio-4d6dd.appspot.com",
      messagingSenderId: "345495945107"
    });
  }

  render() {
    return <RootStack />;
  }
}