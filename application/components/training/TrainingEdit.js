import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from 'react-native-navbar';
import React, { Component } from 'react';
import moment from 'moment';
import { View, ListView, ScrollView, TouchableOpacity, Text, Image, ActionSheetIOS } from 'react-native';
import { find, findIndex, isEqual } from 'underscore';

import BackButton from '../../shared/BackButton';
import { User } from '../../fixtures';
import { Divisions } from '../../fixtures';
import { globals, groupsStyles, formStyles } from '../../styles';

const styles = groupsStyles;



class TrainingEdit extends Component{
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




        <ScrollView
        style={globals.flex}

        >
          <Image source={Divisions[this.props.training.training_division_id-1].image} style={styles.groupTopImage}>
            <View style={styles.overlayBlur}>
              <Text style={styles.h1}>{Divisions[this.props.training.training_division_id-1].training_type}</Text>
            </View>
            <View style={styles.bottomPanel}>
            <TouchableOpacity>
              <Text style={[globals.h4, globals.primaryText]}>
                {moment(this.props.training.training_date).subtract(1, 'days').format('MMMM Do YYYY')}
                <Icon
                     name="ios-create-outline"
                     color='#777'
                     size={30}
                     style={globals.pa2}
                   />

              </Text>

              </TouchableOpacity>
            </View>
          </Image>
          <View style={formStyles.formField}>
             <TouchableOpacity
               style={formStyles.flexRow}

             >


             <Text style={styles.h2}>Trainer</Text>
             <Text style={[globals.h5, globals.ph2]}>{this.props.training.trainer}</Text>



              <Icon
                 name="ios-create-outline"
                 color='#777'
                 size={30}
                 style={globals.mr1}
               />

             </TouchableOpacity>
           </View>

          <View style={globals.lightDivider} />

          <View style={formStyles.formField}>
             <TouchableOpacity
               style={formStyles.flexRow}

             >



            <Text style={styles.h2}>Location</Text>
            <Text style={[globals.h5, globals.ph2]}>{this.props.training.location}</Text>



               <Icon
                 label='edit'
                 name="ios-create-outline"
                 color='#777'
                 size={30}
                 style={globals.mr1}
               />
             </TouchableOpacity>
           </View>
         <View style={globals.lightDivider}/>
         <View style={formStyles.formField}>
            <TouchableOpacity
              style={formStyles.flexRow}
            >
            <Text style={styles.h2}>Comments</Text>
            <Text style={[globals.h5, globals.ph2]}>{this.props.training.comments}</Text>

             <Icon
                name="ios-create-outline"
                color='#777'
                size={30}
                style={globals.mr1}
              />

            </TouchableOpacity>
          </View>

         <View style={globals.lightDivider} />
         <View style={formStyles.formField}>
            <TouchableOpacity
              style={formStyles.flexRow}
            >

            <Text style={styles.h2}>Training Time</Text>
            <Text style={[globals.h5, globals.ph2]}>{this.props.training.t_time}</Text>
             <Icon
                name="ios-create-outline"
                color='#777'
                size={30}
                style={globals.mr1}
              />

            </TouchableOpacity>
          </View>

          <View style={globals.lightDivider} />

          <View style={formStyles.formField}>
             <TouchableOpacity
               style={formStyles.flexRow}
             >
             <Text style={styles.h2}>Training Codes</Text>
             <View>
               {this.props.training.training_codes.map((code, id) => {
                 return (
                   <Text style={[ globals.ph2]} key={id}>{code.training_name}</Text>
                 );
               })}
             </View>
              <Icon
                 name="ios-create-outline"
                 color='#777'
                 size={30}
                 style={globals.mr1}
               />

             </TouchableOpacity>
           </View>
          <View style={globals.lightDivider} />
          <TouchableOpacity
          style={[formStyles.submitButton,{backgroundColor: Colors.patrolBlue}]}
          onPress={this.handleSubmit}
          >
          <Text style={globals.largeButtonText}>Submit</Text>
          </TouchableOpacity>



        </ScrollView>
      </View>
    )
  }
};

export default TrainingEdit;
