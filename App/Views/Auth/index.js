import React from 'react'
import {View, Text, StatusBar} from 'react-native'
import styles from './styles.js'

export default class Auth extends React.Component {
  static propTypes = {}

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <Text hola="asdfasd">Auth</Text>
      </View>
    )
  }
}
