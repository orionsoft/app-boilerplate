import React from 'react'
import {ScrollView, Text, View} from 'react-native'
import styles from './styles.js'
import Icon from 'App/components/Icon'
import Account from './Account'
import Logout from './Logout'

export default class More extends React.Component {
  static propTypes = {}

  static navigationOptions = {
    tabBarIcon: ({tintColor}) => <Icon size={30} color={tintColor} name="menu" />
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Account</Text>
        </View>
        <Account />
        <Logout />
      </ScrollView>
    )
  }
}
