
import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/Ionicons';
import BackButton from '../../shared/BackButton';
import Colors from '../../styles/colors';
import { globals, formStyles } from '../../styles';
import { API, DEV } from '../../config';

const styles = formStyles;

class Login extends Component{
  constructor(){
    super();
    this.goBack = this.goBack.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeEmail = this.changeEmail.bind(this);


    this.state = {
      email         : '',
      password      : '',
      errorMsg      : '',
    };
  }
  goBack(){
    this.props.navigator.pop();
  }
//   loginUser(){
//     console.log("loggin in");
//   fetch(`${API}/login`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       email: this.state.email,
//       password: this.state.password
//     })
//   })
//   .then(response => response.json())
//   .then(response => {
//       console.log(`${API}/users/${response.id}`);
//       fetch(`${API}/users/${response.id}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       })
//       .then(response => response.json())
//       .then(user => console.log('USER', user))
//       .catch(err => {
//         this.setState({ errorMsg: 'Connection problem.'})
//       })
//       .done();
//     })
//   .catch(err => {
//     this.setState({ errorMsg: 'Connection thing.'})
//   })
//   .done();
// }
loginUser(){
  if (DEV) { console.log('Logging in...'); }
  fetch(`${API}/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      email: this.state.email,
      password: this.state.password
    })
  })
  .then(response => response.json())
  .then(data => this.loginStatus(data))
  .catch(err => this.connectionError())
  .done();
}
loginStatus(response){
  if (response.status === 401){
    this.setState({ errorMsg: 'Email or password was incorrect.' });
  } else {
    this.fetchUserInfo(response)
  }
}
fetchUserInfo(response){
  console.log('fetching user', response);
  AsyncStorage.setItem('authResponse', response.auth_token);
  AsyncStorage.setItem('authId', response.user.id.toString());
  fetch(`${API}/users/${response.user.id}`, {
    headers: {
      'Content-Type': 'application/json',
       'Authorization': 'Bearer '+`${response.auth_token}`
             }
           })
  .then(response => response.json())
  .then(user => this.updateUserInfo(user))
  .catch(err => this.connectionError())
  .done();
}
updateUserInfo(user){
  if (DEV) { console.log('Logged in user:', user); }
  this.props.updateUser(user);
  this.props.navigator.push({ name: 'Dashboard' })
}
connectionError(){
  this.setState({ errorMsg: 'Connection error joe.'})
}
  changeEmail(email){
    this.setState({ email })
  }
  changePassword(password){
    this.setState({ password })
  }
  render(){
    let titleConfig = { title: 'Login', tintColor: 'white' };
    return (
      <View style={globals.flexContainer}>
        <NavigationBar
          title={titleConfig}
          tintColor='red'
          leftButton={<BackButton handlePress={this.goBack}/>}
        />
        <ScrollView style={styles.container}>
            <Text style={styles.h3}>
              Login with your email and password.
            </Text>
            <Text style={styles.h4}>
              Email
            </Text>
            <View style={styles.formField}>
              <TextInput
                autoFocus={true}
                returnKeyType="next"
                onSubmitEditing={() => this.password.focus()}
                onChangeText={this.changeEmail}
                keyboardType="email-address"
                maxLength={140}
                placeholderTextColor={Colors.copyMedium}
                style={styles.input}
                placeholder="Your email address"
                autoCapitalize="none"
              />
            </View>
            <Text style={styles.h4}>Password</Text>
            <View style={styles.formField}>
              <TextInput
                ref={(el) => this.password = el }
                returnKeyType="next"
                onChangeText={this.changePassword}
                secureTextEntry={true}
                autoCapitalize="none"
                maxLength={140}
                placeholderTextColor={Colors.copyMedium}
                style={styles.input}
                placeholder="Your password"
              />
            </View>
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>
                {this.state.errorMsg}
              </Text>
            </View>
          </ScrollView>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={this.loginUser}
          >
            <Text style={globals.largeButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
    )
  }
};

export default Login;
