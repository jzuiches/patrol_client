import React, { Component } from 'react';
import { TabBarIOS } from 'react-native';
import { TabBarItemIOS } from 'react-native-vector-icons/Ionicons';

import { API, DEV } from '../config/index'
import ProfileView from './profile/ProfileView';
import TrainingNav from './training/TrainingNav';
import TrainingView from './training/TrainingView';

class Dashboard extends Component{
  constructor(){
    super();
    this.logout = this.logout.bind(this);
    this.state = {
      selectedTab: 'TrainingInput'
    };
  }

  logout(){
    console.log("logging out");
    fetch(`${API}/logout`,{
      method:'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json)
    .then(data => this.props.logout())
    .catch(err =>{})
    .done();
  }


  render(){
     console.log("P", this.props.trainings);
    return (
    <TabBarIOS>

        <TabBarItemIOS
          title='Training Input'
          iconName='ios-create-outline'
          selected={this.state.selectedTab === 'TrainingInput'}
          onPress={() => this.setState({ selectedTab: 'TrainingInput'})}
                  >
            <TrainingNav
            {...this.props} />
        </TabBarItemIOS>

        <TabBarItemIOS
          title='Training Activity'
          iconName='ios-pulse'
          selected={this.state.selectedTab === "Training"}
          onPress={() => this.setState({ selectedTab: 'Training'})}

        >
          <TrainingView
          {...this.props}
          navigator={navigator}
           />
        </TabBarItemIOS>

        <TabBarItemIOS
          title='Profile'
          iconName='ios-person'
          selected={this.state.selectedTab === 'Profile'}
          onPress={() => this.setState({ selectedTab: 'Profile'})}
        >
          <ProfileView
            {...this.props}
            navigator={navigator}
            logout={this.logout}
            />
        </TabBarItemIOS>

     </TabBarIOS>
    )
  }
}
export default Dashboard;
