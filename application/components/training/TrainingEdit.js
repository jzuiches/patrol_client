import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  DatePickerIOS,
  Modal,
  TextInput
} from 'react-native';
import moment from 'moment';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/Ionicons';
import Dropdown, { Select, Option, OptionList } from 'react-native-selectme';
import BackButton from '../../shared/BackButton';
import { formStyles, globals, selectStyles, optionTextStyles, overlayStyles } from '../../styles';
import  Colors  from '../../styles/colors';
import { TrainingCodes, TrainingTime } from '../../fixtures';
const styles = formStyles;
const {
  width: deviceWidth,
  height: deviceHeight
} = Dimensions.get('window');


class TrainingEdit extends Component{
  constructor(){
    super();
    this.toggleModal = this.toggleModal.bind(this);
    this.goBack = this.goBack.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.state =  {
      showModal: false,
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
  console.log("DATE",this.state.date);
  let tdate = new Date(this.props.training.training_date)
  console.log("Props",new Date(tdate.getTime() + tdate.getTimezoneOffset()*60000));
  let titleConfig = { title: 'Training Edit Form', tintColor: 'white' };
  let trainingDate = new Date(tdate.getTime() + tdate.getTimezoneOffset()*60000);
    return (
      <View style={globals.flexContainer}>
    <NavigationBar
      title={titleConfig}
      tintColor={Colors.patrolBlue}
      leftButton={<BackButton handlePress={this.goBack}/>}
    />
    <ScrollView style={styles.container}>

    <Text style={[globals.h4, globals.pa2]}>
          Edit Your Training
          </Text>
          <Text style={styles.h4}>* Training Date</Text>
          <View style={styles.formField}>
           <TouchableOpacity
             style={styles.flexRow}
             onPress={this.toggleModal}
           >
             <Text style={styles.input}>
               {moment(this.props.training.training_date).format('dddd MMM Do YYYY')}
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
        visible={this.state.showModal}
        onRequestClose={this.saveStart}
        >
        <View style={styles.modal}>
           <View style={styles.datepicker}>
          <DatePickerIOS
            date={trainingDate}
            mode="date"
            timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
            onDateChange={this.onDateChange}
          />
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
        <Text style={styles.h4}>* Training Location</Text>
       <View style={styles.formField}>
         <TextInput
           autoCapitalize="none"
           maxLength={20}
           onChangeText={(password) => this.setState({ password })}
           onSubmitEditing={() => this.firstName.focus()}
           value={this.props.training.location}
           valueTextColor={Colors.copyMedium}
           ref={(el) => this.password = el }
           returnKeyType="next"

           style={styles.input}
         />
       </View>
       <Text style={styles.h4}>* Trainer</Text>
       <View style={styles.formField}>
         <TextInput
           maxLength={20}
           onChangeText={(firstName) => this.setState({ firstName })}
           onSubmitEditing={() => this.lastName.focus()}
           value={this.props.training.trainer}
           valueTextColor='#bbb'
           ref={(el) => this.firstName = el }
           returnKeyType="next"
           style={styles.input}
         />
       </View>
       <Text style={styles.h4}>
         Select Training Time
       </Text>
       <Select
         value={this.props.training.training_time}
         height={55}
         onSelect={this.selectTime}
         optionListRef={() => this.timeOptions}
         style={selectStyles}
         styleText={optionTextStyles}
         width={deviceWidth}
       >
         {TrainingTime.map((time, idx) => (
           <Option
             styleText={optionTextStyles}
             key={idx}
           >
             {time.name}
           </Option>
         ))}
       </Select>
       <OptionList

          ref={(el) => this.timeOptions = el }
        />



         <Text style={styles.h4}>  Comments</Text>
         <View style={styles.formField}>
           <TextInput
             maxLength={100}
             onChangeText={(lastName) => this.setState({ lastName })}
             value={this.props.training.comments}
             valueTextColor='#bbb'
             multiline={true}
             ref={(el) => this.lastName = el }
             returnKeyType="next"
             style={styles.input}
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
          <Text style={globals.largeButtonText}>Save</Text>
          </TouchableOpacity>


    </ScrollView>
    </View>
  )
  }
}

export default TrainingEdit;
