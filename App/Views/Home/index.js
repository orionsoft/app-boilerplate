import React from 'react'
import {View, Text} from 'react-native'
import styles from './styles.js'
import Icon from 'App/components/Icon'

export default class Home extends React.Component {
  static propTypes = {}

  static navigationOptions = {
    tabBarIcon: ({tintColor}) => <Icon size={30} color={tintColor} name="home" />
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Home</Text>
      </View>
    )
  }
}
