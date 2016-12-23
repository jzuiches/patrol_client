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
import { API } from '../../config';
import { Divisions, patroller, trainings, User } from '../../fixtures';
import { rowHasChanged } from '../../utilities';
import { globals, messagesStyles } from '../../styles';
const styles = messagesStyles;
export const SelectBox = () => {
return (
    <View style = {styles.boxSelect}>
    <TouchableOpacity
      style={globals.flexRow}
      onPress={() => togglePageLayout()}
    >
    <Text>list by date</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={globals.flexRow}
      onPress={() => togglePageLayout()}
    >
    <Text>list by division</Text>
    </TouchableOpacity>
    </View>
  )
}

class Trainings extends Component{
  constructor(){
    super();
    this.deleteTraining = this.deleteTraining.bind(this);
    this._renderRow = this._renderRow.bind(this);
    this.dataSource = this.dataSource.bind(this);
    this.visitTraining = this.visitTraining.bind(this);
    this.visitTrainingEdit = this.visitTrainingEdit.bind(this);
    this.getSwipeoutBtns = this.getSwipeoutBtns.bind(this);
    this.trainingsRender = this.trainingsRender.bind(this);
    this.state = {
      swipeState: false,
      listByDate: false
    };
  }

divisionFinder(division){
    return division.id === training.training_division_id
  }

convertTrainingArrayToMap(){
  let trainingDivisionMap = {};
  console.log("convert", Divisions[1].training_type);
  this.props.trainings.forEach(function(training){
    if ( !trainingDivisionMap[Divisions[training.training_division_id-1].training_type]){

      trainingDivisionMap[Divisions[training.training_division_id-1].training_type] =  [];
    }
    trainingDivisionMap[Divisions[training.training_division_id-1].training_type].push(training);
  });
  return trainingDivisionMap;
}

renderSectionHeader(sectionData, division){
  return(
    <Text style={styles.sectionHeader}>{division}</Text>
  )
}
  _renderRow(training){
    return (
        <Swipeout backgroundColor='white' right={this.getSwipeoutBtns(training)} close={this.state.swipeState}>
      <TouchableOpacity
      style={globals.flexContainer}
      onPress={() => this.visitTraining(training)}
      >
        <View style={globals.flexRow}>
          <Image
            style={globals.avatar}
            source={Divisions[training.training_division_id-1].image}
          />
          <View style={globals.flex}>
            <View style={globals.textContainer}>
            <Text style={styles.h3b}>
              {Divisions[training.training_division_id-1].training_type}
            </Text>
            </View>
            <View style={globals.textContainer}>
              <Text style={styles.h5}>
                {training.location}
              </Text>
              <Text style={styles.h6}>
                {moment(training.training_date).calendar(null, {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd',
    sameElse: 'MM/DD/YYYY'
})}
              </Text>
            </View>
            <Text style={[styles.h4, globals.mh1]}>
              {training.comments.substring(0, 40)}
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
    onPress: () => {this.deleteTraining(training.id)}
  }
  ]
}

deleteTraining(id){
  this.setState({swipeState: true})
  this.props.deleteFromTrainings(id);
  fetch(`${API}/trainings/${id}`,{
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .catch(err =>{})
  .done();
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

  dataSource(trainingData){
    return(
      new ListView.DataSource({
        rowHasChanged: rowHasChanged,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      })
      .cloneWithRowsAndSections(trainingData)
    );
  }

  trainingsRender(){
    console.log("PP", this.props);
    {if (! this.props.trainings.length) {
    return (
      <View>
        <Text style={[styles.h4, globals.pa1]}>You Have No Logged Trainings</Text>
        </View>

    )}else{
  return (



      <ListView
      dataSource={this.dataSource(this.convertTrainingArrayToMap())}
      contentInset={{ bottom: 49, top: -20 }}
      renderRow={this._renderRow}
      renderSectionHeader={this.renderSectionHeader}
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
        tintColor='red'
      />
      <SelectBox/>

      {this.trainingsRender()}
      </View>
    )
 }
}
export default Trainings;
