/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  View,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';

import Landing from './application/components/Landing';
import { globals } from './application/styles';
import Dashboard from './application/components/Dashboard';
import Register from './application/components/accounts/Register';
import Login from './application/components/accounts/Login';
import { API, DEV } from './application/config';

const Loading = () => (
  <View style={globals.flexCenter}>
    <ActivityIndicator size='large'/>
  </View>
);

export default class patrol extends Component {
  constructor(){
   super();
   this.deleteFromTrainings = this.deleteFromTrainings.bind(this);

   this.updateUser = this.updateUser.bind(this);
   this.logout = this.logout.bind(this);
   this.state = {
     user: null,
     trainings: [],
     ready: false,
     initialRoute :'Landing',
   };
 }

 componentDidMount(){
   this._loadLoginCredentials()
 }

 async _loadLoginCredentials(){
   try {
     let authResponse = await AsyncStorage.getItem('authResponse');
     console.log('authResponse', authResponse)
     let authId = await AsyncStorage.getItem('authId');
     console.log('authId', authId);
     if (authResponse) {
       this.fetchUser(authResponse, authId);
     } else {
       this.ready();
     }
   } catch (err) {
     this.ready(err);
   }
 }

ready(err){
  this.setState({ready: true });
}

fetchUser(authResponse, authId){
  fetch(`${API}/users/${authId}`, {
    headers: {
      'Content-Type': 'application/json',
       'Authorization': 'Bearer '+`${authResponse}`
             }
           })
             .then(response => response.json())

             .then(user => this.setState({

               trainings: user.trainings,
               ready: true,
               initialRoute: 'Dashboard',
               user: user

             }))
             .catch(err => this.ready(err))
             .done();
}

 updateUser(user){
   this.setState({ user: user,
   trainings: user.trainings });
 }

 logout(){
   this.nav.push( { name: 'Landing' });
   this.updateUser(null);
   this.setState({ trainings: []});
 }

 deleteFromTrainings(id){
   console.log("TR", this.state.trainings);
   let { trainings } = this.state
   console.log("DECONS", trainings)
   filtered = [];
   let filtered = trainings.filter(function(training){

     return training.id !== id;

   })

   this.setState({ trainings : filtered});
   console.log("DELETED STATE", this.state.trainings)
 }


  render() {
    if ( ! this.state.ready ) { return <Loading /> }
    return (
      <Navigator
      style={globals.flex}
      ref={ (el) => this.nav = el }
      initialRoute={{ name: this.state.initialRoute }}
      renderScene={( route, navigator ) => {
        switch(route.name){
          case 'Landing':
          return (
            <Landing navigator={navigator}/>
          );
          case 'Login':
          return (
            <Login
            updateUser={this.updateUser}
            navigator={navigator}/>
          );
          case 'Register':
          return (
            <Register
            updateUser={this.updateUser}
            navigator={navigator}/>
          );
          case 'Dashboard':
          return (
            <Dashboard
            updateUser={this.updateUser}
            navigator={navigator}
            user={this.state.user}
            trainings={this.state.trainings}
            logout={this.logout}
            deleteFromTrainings={this.deleteFromTrainings}
          />
          )
         }
       }}
      />
    );
  }
}



AppRegistry.registerComponent('patrol', () => patrol);
