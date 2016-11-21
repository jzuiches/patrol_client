
import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  AsyncStorage,
  Dimensions
} from 'react-native';


import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/Ionicons';
import BackButton from '../../shared/BackButton';
import Colors from '../../styles/colors';
import { API, DEV } from '../../config';
import { formStyles, globals } from '../../styles';
import { ImageOptions, DefaultAvatar } from '../../fixtures';
const styles = formStyles;
const {
  width: deviceWidth,
  height: deviceHeight
} = Dimensions.get('window');


class Register extends Component{
  constructor(){
    super();
    this.goBack = this.goBack.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name : '',
      email : '',
      password : '',
      password_confirmation : '',
      errorMsg      : '',
    }
  }
  goBack(){
    this.props.navigator.pop();
  }
  handleSubmit(){
    let user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
    };

    fetch(`${API}/users`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(user)
    })
    .then(response => response.json)
    .then(data => this.loginUser(this.state.email, this.state.password))
    .catch(err => {})
    .done()
}

  loginUser(email, password){
    console.log("loggin in new USER", password);
    fetch(`${API}/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email: email, password: password})
    })

    .then(response => response.json())
    .then(data => this.fetchUserInfo(data))
    .catch(err => {})
    .done();
}
    fetchUserInfo(response){
      AsyncStorage.setItem('authResponse', response);
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
      this.setState({ errorMsg: 'Connection error.'})
    }







  render(){
    let titleConfig = { title: 'Register', tintColor: 'white' };
    return (
      <View style={globals.flexContainer}>
        <NavigationBar
          title={titleConfig}
          tintColor='red'
          leftButton={<BackButton handlePress={this.goBack}/>}
        />
        <ScrollView style = {globals.inactive}>
        <Text style={styles.h4}>*Name</Text>
        <View style={styles.formField}>
          <TextInput
            maxLength={20}
            onChangeText={(name) => this.setState({ name })}
            onSubmitEditing={() => this.email.focus()}
            placeholder="Your name"
            placeholderTextColor='#bbb'
            ref={(el) => this.name = el }
            returnKeyType="next"
            style={styles.input}
          />
        </View>
         <Text style={styles.h4}>* Email</Text>
         <View style={styles.formField}>
           <TextInput
             autoCapitalize="none"
             keyboardType="email-address"
             maxLength={144}
             onChangeText={(email) => this.setState({ email })}
             onSubmitEditing={() => this.password.focus()}
             ref={(el) => this.email = el }
             placeholder="Your email address"
             placeholderTextColor='#bbb'
             returnKeyType="next"
             style={styles.input}
           />
         </View>
         <Text style={styles.h4}>* Password</Text>
         <View style={styles.formField}>
           <TextInput
             autoCapitalize="none"
             maxLength={20}
             onChangeText={(password) => this.setState({ password })}
             onSubmitEditing={() => this.password_confirmation.focus()}
             placeholder="Your password"
             placeholderTextColor='#bbb'
             ref={(el) => this.password = el }
             returnKeyType="next"
             secureTextEntry={true}
             style={styles.input}
           />
         </View>
         <Text style={styles.h4}>* Password Confirmation</Text>
         <View style={styles.formField}>
           <TextInput
             autoCapitalize="none"
             maxLength={20}
             onChangeText={(password_confirmation) => this.setState({ password_confirmation })}
             placeholder="Your password again"
             placeholderTextColor='#bbb'
             ref={(el) => this.password_confirmation = el }
             returnKeyType="next"
             secureTextEntry={true}
             style={styles.input}
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
        onPress={this.handleSubmit}
      >
        <Text style={globals.largeButtonText}>Submit</Text>
      </TouchableOpacity>
      </View>
    )
  }
};

export default Register;
