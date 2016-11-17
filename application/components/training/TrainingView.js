import React, { Component } from 'react';
import { Navigator } from 'react-native';
import { flatten, uniq } from 'underscore';
import TrainingEdit from './TrainingEdit';

import Training from './Training';
import Trainings from './Trainings';
import { globals } from '../../styles';

class TrainingView extends Component{
  constructor(){
    super();
    this.state = {
      trainings : [],
      ready         : false,
      users         : [],
    };
  }
  render(){
    return (
      <Navigator
        style={globals.flex}
        initialRoute={{ name: 'Trainings' }}
        renderScene={(route, navigator) => {
          switch(route.name){
            case 'Trainings':
              return (
                <Trainings
                  {...this.props}
                  {...this.state}
                  navigator={navigator}
                />
            );
            case 'Training':
              return (
                <Training
                  {...this.props}
                  {...this.state}
                  {...route}
                  navigator={navigator}
                />
            );
            case 'TrainingEdit':
              return (
                <TrainingEdit
                  {...this.props}
                  {...this.state}
                  {...route}
                  navigator={navigator}
                />
              );
          }
        }}
      />
    )
  }
}

export default TrainingView;
