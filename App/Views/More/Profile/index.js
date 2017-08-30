import React from 'react'
import {View, Text} from 'react-native'
import styles from './styles.js'

export default class Profile extends React.Component {
  static propTypes = {}

  static navigationOptions = {
    title: 'Edit profile'
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Profile</Text>
      </View>
    )
  }
}
