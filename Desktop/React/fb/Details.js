import React from 'react';
import { View, Text, Button, TextInput  } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';

export class DetailsScreen extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = { username: 'Username' };
    this.state = { password: 'Password' };
  }

  insertUser(targetRoute, idParam) {

    var userId = firebase.auth().currentUser.uid;

    firebase.database().ref('users/' + userId).set({
      password: this.state.password,
      email: this.state.username,
      info: 'Informações importantes!'
    }).then(sucess => {
      alert('Ok!');
    }).catch(error => {
      alert(error);
    });

  }
  
  render() {

    const {params} = this.props.navigation.state;
    const id = params ? params.id : null;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen {id}</Text>
        <Button title="Back" onPress={() => this.props.navigation.goBack()}/>
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
        <Button title="Insert User" onPress={() => this.insertUser()}/>
      </View>
    );
  }
}