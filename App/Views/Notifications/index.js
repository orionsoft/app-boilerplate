import React from 'react'
import {View, Text} from 'react-native'
import styles from './styles.js'
import Icon from 'App/components/Icon'

export default class Notifications extends React.Component {
  static propTypes = {}

  static navigationOptions = {
    tabBarIcon: ({tintColor}) => <Icon size={30} color={tintColor} name="earth" />
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Notifications</Text>
      </View>
    )
  }
}
