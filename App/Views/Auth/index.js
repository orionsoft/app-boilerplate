import React from 'react'
import {View, StatusBar, ScrollView} from 'react-native'
import styles from './styles.js'
import Main from './Main'

export default class Auth extends React.Component {
  static propTypes = {}

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#0069ff" barStyle="dark-content" />
        <ScrollView style={styles.scrollView}>
          <Main />
        </ScrollView>
      </View>
    )
  }
}
