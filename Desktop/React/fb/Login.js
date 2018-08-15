import React from 'react';
import { View, Text, Button, TextInput  } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation';

import * as firebase from "firebase";
import DismissKeyboard from "dismissKeyboard";

export class LoginScreen extends React.Component {
  
  constructor(props) {
    super(props);

    firebase.auth().onAuthStateChanged((user) => {
      if (user){
        this.resetNavigation('Home');
      }
    });

    this.state = { username: 'Username' };
    this.state = { password: 'Password' };
  }

  resetNavigation(targetRoute, idParam) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: targetRoute, params: { id: idParam } }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  async loginFirebase(){
    DismissKeyboard();

    try {
        await firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password);

        this.resetNavigation('Home');

    } catch (error) {
        alert("Error: " + error.toString());
    }
  }

  async signupFirebase(){
    DismissKeyboard();

    try {
        await firebase.auth().createUserWithEmailAndPassword(this.state.username, this.state.password);

        alert("Your firebase account has been created!");

    } catch (error) {
        alert("Error: " + error.toString());
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}
        />
        <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
        />
        <Button title="Login" onPress={() => this.loginFirebase()}/>
        <Button title="Sign Up" onPress={() => this.signupFirebase()}/>
      </View>
    );
  }
}