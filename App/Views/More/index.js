import React from 'react'
import {StackNavigator} from 'react-navigation'
import Icon from 'App/components/Icon'
import EditProfile from './EditProfile'
import EditCountryFields from './EditCountryFields'
import ChangePassword from './ChangePassword'
import Main from './Main'

const navigator = StackNavigator(
  {
    MoreMain: {screen: Main},
    EditProfile: {screen: EditProfile},
    EditCountryFields: {screen: EditCountryFields},
    ChangePassword: {screen: ChangePassword}
  },
  {
    headerMode: 'screen',
    initialRoute: 'Main'
  }
)

navigator.navigationOptions = {
  tabBarIcon: ({tintColor}) => <Icon size={30} color={tintColor} name="menu" />
}

export default navigator
