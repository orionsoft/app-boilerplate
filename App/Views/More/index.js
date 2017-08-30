import React from 'react'
import {ScrollView, Text} from 'react-native'
import styles from './styles.js'
import Icon from 'App/components/Icon'

export default class More extends React.Component {
  static propTypes = {}

  static navigationOptions = {
    tabBarIcon: ({tintColor}) => <Icon size={30} color={tintColor} name="menu" />
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>More</Text>
      </ScrollView>
    )
  }
}
