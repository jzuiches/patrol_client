import React, { Component } from 'react';
import { Navigator } from 'react-native';

import TrainingInputView from './TrainingInputView';
import TrainingForm from './TrainingForm';
import { globals } from '../../styles';

class TrainingNav extends Component{
  constructor(){
    super();
    this.state = {
      division: '',
      trainings :[],
      ready : false,
    }
  }
  render(){
    return (
      <Navigator
      style={globals.flex}
      initialRoute={{name: 'TrainingInputView' }}
      renderScene={(route, navigator) => {
        switch (route.name){
          case 'TrainingInputView' :
          return (
            <TrainingInputView
            {...this.props}
            {...this.state}
            navigator={navigator}
            />
          );
          case 'TrainingForm':
          return (
            <TrainingForm
            {...this.props}
            {...this.state}
            {...route}
            navigator={navigator}
            />
          );
        }
      }}
      />
    );
  }
};

export default TrainingNav;
