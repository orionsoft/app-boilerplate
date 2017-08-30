import React from 'react'
import {View, Text} from 'react-native'
import styles from './styles.js'
import Icon from 'App/components/Icon'

export default class More extends React.Component {
  static propTypes = {}

  static navigationOptions = {
    tabBarIcon: ({tintColor}) => <Icon size={25} color={tintColor} name="menu" />
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>More</Text>
      </View>
    )
  }
}
