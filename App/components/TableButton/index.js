import React from 'react'
import {View} from 'react-native'
import styles from './styles.js'
import LightButton from '../LightButton'

export default class TableButton extends React.Component {
  static propTypes = {}

  render() {
    return (
      <View style={styles.container}>
        <LightButton height={20} fontSize={16} padding={10} loadingColor="#111" {...this.props} />
      </View>
    )
  }
}
