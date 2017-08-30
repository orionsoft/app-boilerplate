import React from 'react'
import {View, Text} from 'react-native'
import styles from './styles.js'
import headerStyle from 'App/styles/headerStyle'

export default class Profile extends React.Component {
  static propTypes = {}

  static navigationOptions = {
    title: 'Edit profile',
    headerStyle
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Profile</Text>
      </View>
    )
  }
}
