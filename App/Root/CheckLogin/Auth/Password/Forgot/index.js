import React from 'react'
import {View, Text} from 'react-native'
import styles from './styles.js'

export default class Forgot extends React.Component {
  static propTypes = {}

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Forgot password</Text>
      </View>
    )
  }
}
