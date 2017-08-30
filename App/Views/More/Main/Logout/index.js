import React from 'react'
import {View, TouchableOpacity, Text} from 'react-native'
import styles from './styles.js'
import autobind from 'autobind-decorator'
import {logout} from 'meteor-apollo-accounts'
import {withApollo} from 'react-apollo'
import PropTypes from 'prop-types'

@withApollo
export default class Logout extends React.Component {
  static propTypes = {
    client: PropTypes.object
  }

  @autobind
  async logout() {
    try {
      await logout(this.props.client)
    } catch (error) {
      console.log('error', error)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.logout}>
          <Text style={styles.text}>Logout</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
