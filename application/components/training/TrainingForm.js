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
  TextInput
} from 'react-native';

import ModalPicker from 'react-native-modal-picker';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Dropdown, { Select, Option, OptionList } from 'react-native-selectme';
import BackButton from '../../shared/BackButton';
import { formStyles, globals, selectStyles, optionTextStyles, overlayStyles } from '../../styles';
import  Colors  from '../../styles/colors';
import { TrainingCodes, TrainingTime, ListOfPatrollers } from '../../fixtures';
const styles = formStyles;
const {
  width: deviceWidth,
  height: deviceHeight
} = Dimensions.get('window');

const PickerItemIOS = PickerIOS.Item;

class TrainingForm extends Component{
  constructor(){
    super();
    this.toggleModal = this.toggleModal.bind(this);
    this.togglePatrollerModal = this.togglePatrollerModal.bind(this);
    this.goBack = this.goBack.bind(this);
    this.state = {
      showModal: false,
      showPatrollerModal: false,
      training_division_id: '',
      location:             '',
      trainer:              '',
      comments:             '',
      training_time:        '',
      training_code_id:     '',
      date: new Date(),
      timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
    }
  }
  goBack(){
    this.props.navigator.pop();
  }

  toggleModal(){
    this.setState({ showModal: ! this.state.toggleModal })
  }
  togglePatrollerModal(){
    this.setState({ showPatrollerModal: ! this.state.togglePatrollerModal })
  }

onDateChange = (date) => {
  this.setState({date: date});
};

onTimezoneChange = (event) => {
  var offset = parseInt(event.nativeEvent.text, 10);
  if (isNaN(offset)) {
    return;
  }
  this.setState({timeZoneOffsetInHours: offset});
};



  render(){
    console.log("TRainginCODES", TrainingCodes);

    let titleConfig = { title: 'Training Input Form', tintColor: 'white' };
    return (
    <View style={[globals.flexContainer, globals.inactive]}>
    <NavigationBar
      title={titleConfig}
      tintColor={Colors.patrolBlue}
      leftButton={<BackButton handlePress={this.goBack}/>}
    />

    <KeyboardAwareScrollView
        style={[styles.formContainer, globals.pv1]}
        contentInset={{bottom: 49}}
      >

    <Text style={[globals.h4, globals.pa2]}>
          Enter Your Training
          </Text>
          <Text style={styles.h4}>* Training Date</Text>
          <DatePickerIOS
            date={this.state.date}
            mode="date"
            timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
            onDateChange={this.onDateChange}
          />

          <Text style={styles.h4}>* Training Location</Text>
         <View style={styles.formField}>
           <TextInput
             autoCapitalize="none"
             maxLength={20}
             onChangeText={(password) => this.setState({ password })}
             onSubmitEditing={() => this.firstName.focus()}
             placeholder="ex. Red Dog"
             placeholderTextColor={Colors.copyMedium}
             ref={(el) => this.password = el }
             returnKeyType="next"

             style={styles.input}
           />
         </View>
         <Text style={styles.h4}>* Trainer</Text>
         <View style={styles.formField}>
          <TouchableOpacity
            style={styles.flexRow}
            onPress={this.togglePatrollerModal}
          >
            <Text style={styles.input}>
            Choose Trainer
            </Text>
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
      visible={this.state.showPatrollerModal}
      onRequestClose={this.saveStart}
      >
      <View style={styles.modal}>
         <View style={styles.datepicker}>
        <PickerIOS
          optionListRef={() => this.patrollerOptions}
          style={selectStyles}
          styleText={optionTextStyles}
          width={deviceWidth}
        >
          {ListOfPatrollers.map((patroller, idx) => (
            <PickerItemIOS
              styleText={optionTextStyles}
              key={patroller.id}
              value={patroller.name}
              label={patroller.name}
            />
          ))}
        </PickerIOS>
        <View style={styles.btnGroup}>
             <TouchableOpacity
               style={styles.pickerButton}
               onPress={() => this.setState({ showPatrollerModal: false })}
             >
               <Text style={styles.btnText}>
                 Cancel
               </Text>
             </TouchableOpacity>
             <TouchableOpacity
               style={[styles.pickerButton, globals.brandPrimary]}
               onPress={this.saveStart}
             >
               <Text style={[styles.btnText, { color: 'red' }]}>
                 Save
               </Text>
             </TouchableOpacity>
           </View>
           </View>
           </View>
           </Modal>




         <Modal
       animationType='slide'
       transparent={true}
       visible={this.state.showModal}
       onRequestClose={this.saveStart}
       >
       <View style={styles.modal}>
          <View style={styles.datepicker}>
         <PickerIOS
           optionListRef={() => this.timeOptions}
           style={selectStyles}
           styleText={optionTextStyles}
           width={deviceWidth}
         >
           {TrainingTime.map((time, idx) => (
             <PickerItemIOS
               styleText={optionTextStyles}
               key={idx}
               value={time.name}
               label={time.name}
             />
           ))}
         </PickerIOS>
         <View style={styles.btnGroup}>
              <TouchableOpacity
                style={styles.pickerButton}
                onPress={() => this.setState({ showModal: false })}
              >
                <Text style={styles.btnText}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.pickerButton, globals.brandPrimary]}
                onPress={this.saveStart}
              >
                <Text style={[styles.btnText, { color: 'red' }]}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
            </View>
            </View>
            </Modal>



           <Text style={styles.h4}>  Comments</Text>
           <View>
             <TextInput
               style={styles.largeInput}
               blurOnSubmit={true}
               onChangeText={(comments) => this.setState({ comments })}
               placeholder="comments"
               placeholderTextColor='#bbb'
               multiline={true}
               ref={(el) => this.lastName = el }
               returnKeyType="next"
             />
          </View>










             <Text style={styles.h4}>
               Select Training Code
             </Text>
             <Select
               defaultValue="Add a code"
               height={55}
               onSelect={this.selectTechnology}
               optionListRef={() => this.options}
               style={selectStyles}
               styleText={optionTextStyles}
               width={deviceWidth}
             >
               {TrainingCodes.map((code, idx) => (
                 <Option
                   styleText={optionTextStyles}
                   key={idx}
                 >
                   {code.name}
                 </Option>
               ))}
             </Select>
             <OptionList
                overlayStyles={overlayStyles}
                ref={(el) => this.options = el }
              />


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
