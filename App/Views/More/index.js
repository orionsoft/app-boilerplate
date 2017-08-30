import React from 'react'
import {StackNavigator} from 'react-navigation'
import Icon from 'App/components/Icon'
import Profile from './Profile'
import Main from './Main'

const navigator = StackNavigator(
  {
    Main: {screen: Main},
    Profile: {screen: Profile}
  },
  {
    headerMode: 'screen'
  }
)

navigator.navigationOptions = {
  tabBarIcon: ({tintColor}) => <Icon size={30} color={tintColor} name="menu" />
}

export default navigator
