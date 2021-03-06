import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';


import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from 'react-native-navbar';
import Colors from '../../styles/colors';
import { Divisions } from '../../fixtures';
import { globals, groupsStyles } from '../../styles';
const styles = groupsStyles;


export const DivisionBoxes = ({visitDivisionForm}) => {
  console.log("Divisions", Divisions);


return (
    <View style = {styles.boxContainer}>
        {Divisions.map((division, id) => {
          return (
          <TouchableOpacity
            key={id}
            style={globals.flexRow}
            onPress={() => visitDivisionForm(division)}
          >
            <Image
              source={division.image}
              style={[styles.groupImage, {backgroundColor: 'transparent',}] }
            >
              <View style={styles.groupBackground} >
                <Text style={styles.groupText}>
                  {division.training_type}
                </Text>
              </View>
            </Image>
          </TouchableOpacity>
        )
        })}
    </View>
);
}


class TrainingInputView extends Component{

  constructor(){
    super();
    this.visitDivisionForm = this.visitDivisionForm.bind(this);
    this.state = {
      division : ''
    }
  }
  visitDivisionForm(division){
    this.props.navigator.push({
      name: 'TrainingForm',
      division
    });
  }


  render(){
      console.log("div props", this.props);
    let titleConfig = { title: 'Training Divisions', tintColor: 'white' };
    return (
    <View style={globals.flexContainer}>
    <NavigationBar
      title={ titleConfig }
      tintColor='red'
    />
    <ScrollView
    style={[globals.flex, globals.mt1, globals.pb4]}
    contentInset={{bottom: 49}}
    >
     <Text style={[globals.h4, globals.mh2]}>Select a Training Division</Text>

      <DivisionBoxes
      navigator={navigator}
      visitDivisionForm={this.visitDivisionForm}

      />

      </ScrollView>
    </View>
      )
    }
  };

export default TrainingInputView;
