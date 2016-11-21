import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from 'react-native-navbar';
import Colors from '../../styles/colors';
// import { patroller } from '../../fixtures';
import { globals, profileStyles } from '../../styles';
const styles = profileStyles;

class ProfileView extends Component{

  render() {
    let titleConfig = { title: 'Profile', tintColor: 'white' };
    let patroller = this.props.user
    console.log("PROPS",this.props.user.name);
    return (
      <View style={[globals.flexContainer, globals.inactive]}>
        <NavigationBar
          title={titleConfig}
          tintColor={Colors.patrolBlue}
          />
          <ScrollView style={globals.flex}>
          <View style={globals.flexCenter}>
             <Text style={globals.h4}>
               {this.props.user.name}
             </Text>
          </View>

          <TouchableOpacity style={styles.formButton}>
            <Text style={globals.h4}>
              Settings
            </Text>
            <Icon name='ios-arrow-forward' size={30} color='#ccc' />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={this.props.logout}
            >
            <Text style={styles.logoutText}>
              Logout
            </Text>
          </TouchableOpacity>

          </ScrollView>
      </View>
    )
  }
}

export default ProfileView;
