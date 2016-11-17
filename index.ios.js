/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator
} from 'react-native';

import Landing from './application/components/Landing';
import { globals } from './application/styles';
import Dashboard from './application/components/Dashboard';
import Register from './application/components/accounts/Register';
import Login from './application/components/accounts/Login';

export default class patrol extends Component {
  constructor(){
   super();
   this.updateUser = this.updateUser.bind(this);
   this.state = {
     user: null
   };
 }
 updateUser(user){
   this.setState({ user: user });
 }
  render() {
    return (
      <Navigator
      style={globals.flex}
      initialRoute={{ name: 'Landing' }}
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
            <Register navigator={navigator}/>
          );
          case 'Dashboard':
          return (
            <Dashboard
            updateUser={this.updateUser}
            navigator={navigator}
            user={this.state.user}/>
          )
         }
       }}
      />
    );
  }
}



AppRegistry.registerComponent('patrol', () => patrol);
