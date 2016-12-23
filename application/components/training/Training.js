
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from 'react-native-navbar';
import React, { Component } from 'react';
import moment from 'moment';
import { View, ListView, ScrollView, TouchableOpacity, Text, Image, ActionSheetIOS } from 'react-native';
import { find, findIndex, isEqual } from 'underscore';

import BackButton from '../../shared/BackButton';
import { User } from '../../fixtures';
import { Divisions } from '../../fixtures';
import { globals, groupsStyles } from '../../styles';

const styles = groupsStyles;



class Training extends Component{
  constructor(){
    super();
    this.goBack = this.goBack.bind(this);
  }
  goBack(){
    this.props.navigator.pop();
  }
  render(){
    console.log("user for training", this.props)
    let titleConfig = {
      title: `${this.props.user.name}`,
      tintColor: 'white'
    };
    return (
      <View style={globals.flexContainer}>
        <NavigationBar
          tintColor='red'
          title={titleConfig}
          leftButton={<BackButton handlePress={this.goBack}/>}
        />




        <ScrollView style={globals.flex}>
          <Image source={Divisions[this.props.training.training_division_id-1].image} style={styles.groupTopImage}>
            <View style={styles.overlayBlur}>
              <Text style={styles.h1}>{Divisions[this.props.training.training_division_id-1].training_type}</Text>
            </View>
            <View style={styles.bottomPanel}>
              <Text style={[globals.h4, globals.primaryText]}>
                {moment(this.props.training.training_date).format('MMMM Do YYYY')}
              </Text>
            </View>
          </Image>
          <Text style={styles.h2}>Trainer</Text>
          <Text style={[globals.h5, globals.ph2]}>{this.props.training.trainer}</Text>

          <View style={globals.lightDivider} />
          <Text style={styles.h2}>Location</Text>
          <Text style={[globals.h5, globals.ph2]}>{this.props.training.location}</Text>
          <View style={globals.lightDivider}/>
          <Text style={styles.h2}>Comments</Text>
          <Text style={[globals.h5, globals.ph2]}>{this.props.training.comments}</Text>

          <View style={globals.lightDivider} />
          <Text style={styles.h2}>Training Time</Text>
          <Text style={[globals.h5, globals.ph2]}>{this.props.training.t_time}</Text>

          <View style={globals.lightDivider} />
          <Text style={styles.h2}>Training Codes</Text>
          <View>
            {this.props.training.training_codes.map((code, id) => {
              return (
                <Text style={[globals.h5, globals.ph2]} key={id}>{code.training_name}</Text>
              );
            })}
          </View>
          <View style={globals.lightDivider} />
        </ScrollView>
      </View>
    )
  }
};

export default Training;
