import React from 'react'
import {ScrollView, Text, View, TouchableOpacity} from 'react-native'
import styles from './styles.js'
import Account from '../Account'
import PropTypes from 'prop-types'
import {logout} from 'meteor-apollo-accounts'
import {withApollo} from 'react-apollo'
import autobind from 'autobind-decorator'
import TableButton from 'App/components/TableButton'

@withApollo
export default class More extends React.Component {
  static propTypes = {
    client: PropTypes.object,
    navigation: PropTypes.object
  }

  static navigationOptions = {
    title: 'Account',
    header: null
  }

  state = {}

  @autobind
  async logout() {
    this.setState({loggingOut: true})
    try {
      await logout(this.props.client)
    } catch (error) {
      console.log('error', error)
    }
    this.setState({loggingOut: false})
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
        <View style={styles.separation} />
        <TableButton title="Logout" onPress={this.logout} loading={this.state.loggingOut} />
      </ScrollView>
    )
  }
}
