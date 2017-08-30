import React from 'react'
import {ScrollView, View, Text} from 'react-native'
import styles from './styles.js'
import Icon from 'App/components/Icon'

export default class Notifications extends React.Component {
  static propTypes = {}

  static navigationOptions = {
    tabBarIcon: ({tintColor}) => <Icon size={30} color={tintColor} name="earth" />
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Notifications</Text>
        </View>
      </ScrollView>
    )
  }
}
