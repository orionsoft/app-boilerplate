import React from 'react'
import {View, Text} from 'react-native'
import styles from './styles.js'

export default class Login extends React.Component {
  static propTypes = {}

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
      </View>
    )
  }
}
