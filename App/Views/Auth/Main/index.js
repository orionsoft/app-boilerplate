import React from 'react'
import {View, Text} from 'react-native'
import styles from './styles.js'
import Logo from '../Logo'

export default class Main extends React.Component {
  static propTypes = {}

  render() {
    return (
      <View style={styles.container}>
        <Logo />
        <Text>Main</Text>
      </View>
    )
  }
}
