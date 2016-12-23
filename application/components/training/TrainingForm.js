import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  DatePickerIOS,
  PickerIOS,
  Modal,
  TextInput,
  AsyncStorage
} from 'react-native';

import ModalPicker from 'react-native-modal-picker';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Dropdown, { Select, Option, OptionList } from 'react-native-selectme';
import { uniq } from 'underscore';
import BackButton from '../../shared/BackButton';
import { formStyles, globals, selectStyles, optionTextStyles, overlayStyles } from '../../styles';
import  Colors  from '../../styles/colors';
import { API } from '../../config';
import {
  BeaconCodes,
  LiftCodes,
  RopeCodes,
  FuniCodes,
  Routes,
  TobogganCodes,
  DogCodes,
  MiscCodes,
  TrainingTime,
  ListOfPatrollers
} from '../../fixtures';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import TrainingCodeList from '../../shared/TrainingCodeList';
const styles = formStyles;
const {
  width: deviceWidth,
  height: deviceHeight
} = Dimensions.get('window');

const PickerItemIOS = PickerIOS.Item;

Date.prototype.toJSON = function(){ return moment(this).format(); }



class TrainingForm extends Component{
  constructor(){
    super();
    this.toggleTimeModal = this.toggleTimeModal.bind(this);
    this.toggleTrainerModal = this.toggleTrainerModal.bind(this);
    this.toggleRouteModal = this.toggleRouteModal.bind(this);
    this.goBack = this.goBack.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectTrainingCodeId = this.selectTrainingCodeId.bind(this);
    this.removeTrainingCodeId = this.removeTrainingCodeId.bind(this);
    this.trainingCodes = this.trainingCodes.bind(this);
    this.saveRoute = this.saveRoute.bind(this);
    this.saveTrainer = this.saveTrainer.bind(this);
    this.saveTime = this.saveTime.bind(this);
    this.trainingCodeSelection = this.trainingCodeSelection.bind(this);
    this.renderLocation = this.renderLocation.bind(this);
    this.renderTime = this.renderTime.bind(this);
    this.state = {
      showTimeModal: false,
      showTrainerModal: false,
      showRouteModal:     false,
      training_division_id: '',
      location:             '',
      firstRoute:           '',
      route:                '',
      firstTrainer:         '',
      trainer:              '',
      comments:             '',
      firstTime:            '',
      training_time:        '',
      training_code_id:     [],
      date: new Date(),
      // timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
    }
  }


  trainingCodes(){
    switch(this.props.division.id){
      case(1):
      return(
        BeaconCodes
      );
      case(2):
      return(
        LiftCodes
      );
      case(3):
      return(
        RopeCodes
      );
      case(5):
      return(
        FuniCodes
      );
      case(6):
      return(
        TobogganCodes
      );
      case(7):
      return(
        DogCodes
      );
      case(8):
      return(
        MiscCodes
      );
    }
  }

  goBack(){
    this.props.navigator.pop();
  }

  trainingCodeSelection(){
    let {training_code_id} = this.state;

    if (this.props.division.id != 4){

      return(
      <View>
      <Text style={styles.h4}>
        Select Training Code
      </Text>
      <Select
        defaultValue="Add as many codes as you like"
        height={55}
        optionListRef={() => this.options}
        style={selectStyles}
        styleText={optionTextStyles}
        width={deviceWidth}
        onSelect={this.selectTrainingCodeId}
      >
        {this.trainingCodes().map((code) => (
          <Option
            styleText={optionTextStyles}
            key={code.name}
          >
            {code.name}
          </Option>
        ))}
      </Select>
      <OptionList
         overlayStyles={overlayStyles}
         ref={(el) => this.options = el }
       />
       <View>
       <TrainingCodeList training_codes = {training_code_id} handlePress={this.removeTrainingCodeId}/>
       </View>
       </View>
     )
   }
 };


   selectTrainingCodeId(code){
     let { training_code_id } = this.state;
    console.log("STATE", this.state);
     this.setState({
       training_code_id: uniq(this.state.training_code_id.concat(code))
     });
   }

   removeTrainingCodeId(index){
     let { training_code_id } = this.state;
     this.setState({
       training_code_id: [
         ...training_code_id.slice(0,index),
         ...training_code_id.slice(index+1)
       ]
     })
   }

handleSubmit(){

    console.log("the submit button props", this.props);

    let training = {
      user_id: this.props.user.id,
      training_division_id: this.props.division.id,
      location: this.state.location,
      trainer: this.state.trainer,
      comments: this.state.comments,
      t_time: this.state.training_time,
      training_date: this.state.date,
      training_codes: this.state.training_code_id.map((c) => (
        {training_name: c}
      ))
    };
      console.log("Trainings!!", this.props.user.trainings )
      console.log("THE Date!!", this.state.date)
    fetch(`${API}/trainings`, {

    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(training)
    })
    .then(response => response.json())
    .then(data => this.updateTrainingInfo(data))
    .catch(err => {})
    .done()
}

updateTrainingInfo(data){

  this.props.trainings.push(data)
  this.props.trainings.sort(function(a, b){
  return new Date(b.training_date) - new Date(a.training_date);
})

  this.props.navigator.push({ name: 'TrainingInputView' })
}



  toggleTimeModal(){
    this.setState({ showTimeModal: ! this.state.toggleTimeModal })
  }
  toggleTrainerModal(){
    this.setState({ showTrainerModal: ! this.state.toggleTrainerModal })
  }
  toggleRouteModal(){
      this.setState({ showRouteModal: ! this.state.toggleRouteModal })
  }

  saveRoute(){

    this.setState({
      showRouteModal: false,
      location: this.state.firstRoute
    });

  }

  saveTrainer(){
    this.setState({
    showTrainerModal: false,
    trainer: this.state.firstTrainer
  });
  }

  saveTime(){
    this.setState({
    showTimeModal: false,
    training_time: this.state.firstTime
  });
  }

onDateChange = (date) => {
  this.setState({date: date});
  console.log("date in dateChange?", date)
};

// onTimezoneChange = (event) => {
//   var offset = parseInt(event.nativeEvent.text, 10);
//   if (isNaN(offset)) {
//     return;
//   }
//   this.setState({timeZoneOffsetInHours: offset});
// };

showRoute(){
  if (this.state.firstRoute === ''){
    return (
    <Text style={styles.input}>
    Choose Route
    </Text>
  )
  }else{
    return (
    <Text style={styles.input}>
    {this.state.firstRoute}
    </Text>
  )
  }
}

renderLocation(){
  if (this.props.division.id === 4){
    return(
      <View>
  <Text style={styles.h4}>* Training Route</Text>
  <View style={styles.formField}>
   <TouchableOpacity
     style={styles.flexRow}
     onPress={this.toggleRouteModal}
   >

    {this.showRoute()}



     <Icon
       name="ios-arrow-forward"
       color='#777'
       size={30}
       style={globals.mr1}
     />
   </TouchableOpacity>
 </View>

<Modal
animationType='slide'
transparent={true}
visible={this.state.showRouteModal}
onRequestClose={this.saveRoute}
>
<View style={styles.modal}>
<View style={styles.datepicker}>
<PickerIOS
 selectedValue={this.state.firstRoute}
 onValueChange={(firstRoute) => this.setState({firstRoute})}
 style={selectStyles}
 styleText={optionTextStyles}
 width={deviceWidth}
>
 {Routes.map((route, id) => (
   <PickerItemIOS
     styleText={optionTextStyles}
     key={route.name}
     value={route.name}
     label={route.name}
   />
 ))}
</PickerIOS>
<View style={styles.btnGroup}>
    <TouchableOpacity
      style={styles.pickerButton}
      onPress={() => this.setState({ showRouteModal: false })}
    >
      <Text style={styles.btnText}>
        Cancel
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.pickerButton, globals.brandPrimary]}
      onPress={this.saveRoute}
    >
      <Text style={[styles.btnText, { color: 'red' }]}>
        Save
      </Text>
    </TouchableOpacity>
  </View>
  </View>
  </View>
  </Modal>

 </View>

  )
  }else{
  return(
    <View>
  <Text style={styles.h4}>* Training Location</Text>
  <View style={styles.formField}>
   <TextInput
     autoCapitalize="none"
     maxLength={20}
     onChangeText={(location) => this.setState({ location })}
     placeholder="ex. Red Dog"
     placeholderTextColor={Colors.copyMedium}
     ref={(el) => this.password = el }
     returnKeyType="next"

     style={styles.input}
   />
  </View>
  </View>
  )}

}

showTrainer(){
  if (this.state.firstTrainer === '') {
    return (
      <Text style={styles.input}>
      Choose Trainer
      </Text>
    )
  }else{
    return (
      <Text style={styles.input}>
      {this.state.firstTrainer}
      </Text>
    )

  }
}
renderTrainer(){
    return(
      <View>
  <Text style={styles.h4}>* Trainer</Text>
  <View style={styles.formField}>
   <TouchableOpacity
     style={styles.flexRow}
     onPress={this.toggleTrainerModal}
   >

    {this.showTrainer()}

     <Icon
       name="ios-arrow-forward"
       color='#777'
       size={30}
       style={globals.mr1}
     />
   </TouchableOpacity>
 </View>

<Modal
animationType='slide'
transparent={true}
visible={this.state.showTrainerModal}
onRequestClose={this.saveTrainer}
>
<View style={styles.modal}>
<View style={styles.datepicker}>
<PickerIOS
 selectedValue={this.state.firstTrainer}
 onValueChange={(firstTrainer) => this.setState({firstTrainer})}
 style={selectStyles}
 styleText={optionTextStyles}
 width={deviceWidth}
>
  {ListOfPatrollers.map((trainer) => (
    <PickerItemIOS
      styleText={optionTextStyles}
      key={trainer.name.toLowerCase().replace(/\b[a-z]/g,function(f){return f.toUpperCase();})}
      value={trainer.name.toLowerCase().replace(/\b[a-z]/g,function(f){return f.toUpperCase();})}
      label={trainer.name.toLowerCase().replace(/\b[a-z]/g,function(f){return f.toUpperCase();})}
    />
  ))}
</PickerIOS>
<View style={styles.btnGroup}>
    <TouchableOpacity
      style={styles.pickerButton}
      onPress={() => this.setState({ showTrainerModal: false })}
    >
      <Text style={styles.btnText}>
        Cancel
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.pickerButton, globals.brandPrimary]}
      onPress={this.saveTrainer}
    >
      <Text style={[styles.btnText, { color: 'red' }]}>
        Save
      </Text>
    </TouchableOpacity>
  </View>
  </View>
  </View>
  </Modal>

 </View>
 )
 }

 showTime(){
   if (this.state.firstTime === '') {
     return (
       <Text style={styles.input}>
       Choose Training Time
       </Text>
     )
   }else{
     return (
       <Text style={styles.input}>
       {this.state.firstTime}
       </Text>
     )

   }
 }
 renderTime(){
     return(
       <View>
   <Text style={styles.h4}>* Training Time</Text>
   <View style={styles.formField}>
    <TouchableOpacity
      style={styles.flexRow}
      onPress={this.toggleTimeModal}
    >

     {this.showTime()}

      <Icon
        name="ios-arrow-forward"
        color='#777'
        size={30}
        style={globals.mr1}
      />
    </TouchableOpacity>
  </View>

 <Modal
 animationType='slide'
 transparent={true}
 visible={this.state.showTimeModal}
 onRequestClose={this.saveTime}
 >
 <View style={styles.modal}>
 <View style={styles.datepicker}>
 <PickerIOS
  selectedValue={this.state.firstTime}
  onValueChange={(firstTime) => this.setState({firstTime})}
  style={selectStyles}
  styleText={optionTextStyles}
  width={deviceWidth}
 >
 {TrainingTime.map((time) => (
   <PickerItemIOS
     styleText={optionTextStyles}
     key={time.name}
     value={time.name}
     label={time.name}
   />
 ))}
</PickerIOS>
 <View style={styles.btnGroup}>
     <TouchableOpacity
       style={styles.pickerButton}
       onPress={() => this.setState({ showTimeModal: false })}
     >
       <Text style={styles.btnText}>
         Cancel
       </Text>
     </TouchableOpacity>
     <TouchableOpacity
       style={[styles.pickerButton, globals.brandPrimary]}
       onPress={this.saveTime}
     >
       <Text style={[styles.btnText, { color: 'red' }]}>
         Save
       </Text>
     </TouchableOpacity>
   </View>
   </View>
   </View>
   </Modal>

  </View>
  )
  }


  render(){

    console.log("date?", this.state.date)

    let titleConfig = { title: 'Training Input Form', tintColor: 'white' };


    return (
    <View style={[globals.flexContainer, globals.inactive]}>
    <NavigationBar
      title={titleConfig}
      tintColor='red'
      leftButton={<BackButton handlePress={this.goBack}/>}
    />

    <KeyboardAwareScrollView
        style={[styles.formContainer, globals.pv1]}
        contentInset={{bottom: 49}}
      >

    <Text style={[globals.h4, globals.pa2]}>
          Enter Your Training for {this.props.division.training_type}
          </Text>
          <Text style={styles.h4}>* Training Date:   {moment(this.state.date).calendar(null, {
            sameDay: '[Today]',
            nextDay: '[Tomorrow]',
            nextWeek: 'dddd',
            lastDay: '[Yesterday]',
            lastWeek: '[Last] dddd',
            sameElse: 'MM/DD/YYYY'
          })}</Text>
          <DatePickerIOS
            date={this.state.date}
            mode="date"
            onDateChange={this.onDateChange}
          />

        { this.renderLocation() }

        { this.renderTrainer() }



         { this.renderTime()}




          <Text style={styles.h4}>  Comments</Text>
          <View>
            <TextInput
              style={styles.largeInput}
              blurOnSubmit={true}
              onChangeText={(comments) => this.setState({ comments })}
              placeholder="comments"
              placeholderTextColor='#bbb'
              multiline={true}

              returnKeyType="next"
            />
         </View>

         {this.trainingCodeSelection(this.state)}

          <TouchableOpacity
          style={[styles.submitButton,{backgroundColor: Colors.patrolBlue}]}
          onPress={this.handleSubmit}
          >
          <Text style={globals.largeButtonText}>Submit</Text>
          </TouchableOpacity>



            </KeyboardAwareScrollView>

          </View>


        );
      }
};

export default TrainingForm;
