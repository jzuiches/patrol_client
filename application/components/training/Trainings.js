import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ListView
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from 'react-native-navbar';
import Colors from '../../styles/colors';
import moment from 'moment';
import Swipeout from 'react-native-swipeout';
import { Divisions, patroller, trainings, User } from '../../fixtures';
import { rowHasChanged } from '../../utilities';
import { globals, messagesStyles } from '../../styles';
const styles = messagesStyles;


class TrainingView extends Component{
  constructor(){
    super();
    this._renderRow = this._renderRow.bind(this);
    this.dataSource = this.dataSource.bind(this);
    this.visitTraining = this.visitTraining.bind(this);
    this.visitTrainingEdit = this.visitTrainingEdit.bind(this);
    this.getSwipeoutBtns = this.getSwipeoutBtns.bind(this);
    this.trainingsRender = this.trainingsRender.bind(this);
  }



  _renderRow(training){
    console.log(training.location);
    return (
        <Swipeout backgroundColor='white' right={this.getSwipeoutBtns(training)}>
      <TouchableOpacity
      style={globals.flexContainer}
      onPress={() => this.visitTraining(training)}
      >
        <View style={globals.flexRow}>
          <Image
            style={globals.avatar}
            source={require('../../assets/images/skier.png')}
          />
          <View style={globals.flex}>
            <View style={globals.textContainer}>
            <Text style={styles.h3}>
              {Divisions[training.training_division_id-1].training_type}
            </Text>
            </View>
            <View style={globals.textContainer}>
              <Text style={styles.h5}>
                {training.location}
              </Text>
              <Text style={styles.h6}>
                {moment(training.training_date).fromNow()}
              </Text>
            </View>
            <Text style={[styles.h4, globals.mh1]}>
              {training.comments.substring(0, 40)}...
            </Text>
          </View>
          <View style={styles.arrowContainer}>
            <Icon
              size={30}
              name="ios-arrow-forward"
              color={Colors.bodyTextLight}
            />
          </View>
        </View>
        <View style={styles.divider}/>
      </TouchableOpacity>
      </Swipeout>
    )
  }

  getSwipeoutBtns(training){
    return [
    {
      text: 'Edit',
      backgroundColor: Colors.patrolBlue,
      onPress: () => {this.visitTrainingEdit(training)}
    },
  {
    text: 'Delete',
    backgroundColor: 'red',
    onPress: () => {this.props.deleteTraining()}
  }
  ]
}

  visitTrainingEdit(training){
    this.props.navigator.push({
      name: 'TrainingEdit',
      training
    })
  }

  visitTraining(training){
    this.props.navigator.push({
      name: 'Training',
      training
    })
  }

  dataSource(){
    console.log(this.props.user.trainings.length===0);
    return(
      new ListView.DataSource({
        rowHasChanged: rowHasChanged
      })
      .cloneWithRows(this.props.user.trainings)
    );
  }

  trainingsRender(){

    {if (this.props.user.trainings.length === 0){
    return (
      <View>
        <Text style={[styles.h4, globals.pa1]}>You Have No Logged Trainings</Text>
        </View>

    )}else{
  return (



      <ListView
      dataSource={this.dataSource()}
      contentInset={{ bottom: 49 }}
      renderRow={this._renderRow}
      enableEmptySections={true}
      />

  )}
  }
}

  render(){
    let titleConfig = { title: 'Trainings', tintColor: 'white' };

    return(
      <View style={globals.flexContainer}>
      <NavigationBar
        title={titleConfig}
        tintColor={Colors.patrolBlue}
      />
      {this.trainingsRender()}
      </View>
    )
 }
}
export default TrainingView;
