import React from 'react'
import {View, Platform} from 'react-native'
import styles from './styles.js'
import {BlurView} from 'expo'

export default class StatusBarBackground extends React.Component {
  static propTypes = {}

  render() {
    if (Platform.OS !== 'ios') return <View />
    return <BlurView intensity={60} style={styles.container} />
  }
}
