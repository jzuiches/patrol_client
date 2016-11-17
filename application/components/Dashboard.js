import React, { Component } from 'react';
import { TabBarIOS } from 'react-native';
import { TabBarItemIOS } from 'react-native-vector-icons/Ionicons';


import ProfileView from './profile/ProfileView';
import TrainingNav from './training/TrainingNav';
import TrainingView from './training/TrainingView';

class Dashboard extends Component{
  constructor(){
    super();
    this.state = {
      selectedTab: 'TrainingInput'
    };
  }

  render(){
     console.log("P", this.props);
    return (
    <TabBarIOS>

        <TabBarItemIOS
          title='Training Input'
          iconName='ios-create-outline'
          selected={this.state.selectedTab === 'TrainingInput'}
          onPress={() => this.setState({ selectedTab: 'TrainingInput'})}
                  >
            <TrainingNav />
        </TabBarItemIOS>

        <TabBarItemIOS
          title='Training Activity'
          iconName='ios-pulse'
          selected={this.state.selectedTab === "Training"}
          onPress={() => this.setState({ selectedTab: 'Training'})}
        >
          <TrainingView />
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
            />
        </TabBarItemIOS>

     </TabBarIOS>
    )
  }
}
export default Dashboard;
