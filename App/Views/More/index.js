import React from 'react'
import {StackNavigator} from 'react-navigation'
import Icon from 'App/components/Icon'
import EditProfile from './EditProfile'
import ChangePassword from './ChangePassword'
import Main from './Main'

const navigator = StackNavigator(
  {
    Main: {screen: Main},
    EditProfile: {screen: EditProfile},
    ChangePassword: {screen: ChangePassword}
  },
  {
    headerMode: 'screen'
  }
)

navigator.navigationOptions = {
  tabBarIcon: ({tintColor}) => <Icon size={30} color={tintColor} name="menu" />
}

export default navigator
