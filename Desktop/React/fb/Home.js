import React from 'react';
import { View, Text, Button  } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation';

import * as firebase from "firebase";
import DismissKeyboard from "dismissKeyboard";

export class HomeScreen extends React.Component {
  resetNavigation(targetRoute, idParam) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: targetRoute, params: { id: idParam } }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }
  
  async logout() {
    DismissKeyboard();
    await firebase.auth().signOut().then(success => {
      this.resetNavigation('Login');
    }).catch(error => {
      alert('Error: ' + error.toString());
    });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button title="Details" onPress={() => this.props.navigation.navigate('Details', {id: 86})}/>
        <Button title="Details 2" onPress={() => this.resetNavigation('Details', 100)}/>
        <Button title="Logout" onPress={() => this.logout()}/>
      </View>
    );
  }
}