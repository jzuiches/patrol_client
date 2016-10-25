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


export default class patrol extends Component {
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
          case 'Dashboard':
          return (
            <Dashboard navigator={navigator}/>
          )
         }
       }}
      />
    );
  }
}



AppRegistry.registerComponent('patrol', () => patrol);
