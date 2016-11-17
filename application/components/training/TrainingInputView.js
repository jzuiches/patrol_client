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
  console.log("Division", Divisions);

return (
    <View style = {styles.boxContainer}>
        {Divisions.map((division, idx) => {
          return (
          <TouchableOpacity
            key={idx}
            style={globals.flexRow}
            onPress={() => visitDivisionForm(division)}
          >
            <Image
              source={require('../../assets/images/skier.png')}
              style={[styles.groupImage, {backgroundColor: 'transparent',}] }
            >
              <View style={styles.groupBackground} >
                <Text style={styles.groupText}>
                  {division}
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
  }
  visitDivisionForm(){
    this.props.navigator.push({
      name: 'TrainingForm',
    })
  }
  render(){
    let titleConfig = { title: 'Training Divisions', tintColor: 'white' };
    return (
    <View style={globals.flexContainer}>
    <NavigationBar
      title={ titleConfig }
      tintColor={Colors.patrolBlue}
    />
    <ScrollView style={[globals.flex, globals.mt1, globals.pb4]}>
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
