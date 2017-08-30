import React from 'react'
import {ScrollView, Text, View, TouchableOpacity} from 'react-native'
import styles from './styles.js'
import Account from '../Account'
import Logout from './Logout'
import PropTypes from 'prop-types'

export default class More extends React.Component {
  static propTypes = {
    navigation: PropTypes.object
  }

  static navigationOptions = {
    title: 'Account',
    header: null
  }

  renderOptions() {
    return (
      <View style={styles.options}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('EditProfile')}
          style={[styles.option, styles.optionNonLast]}>
          <Text style={styles.optionText}>Edit profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('ChangePassword')}
          style={styles.option}>
          <Text style={styles.optionText}>Change password</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Account</Text>
        </View>
        <Account />
        {this.renderOptions()}
        <Logout />
      </ScrollView>
    )
  }
}
