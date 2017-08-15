import React from 'react'
import {View, Text, Button} from 'react-native'
import styles from './styles.js'
import PropTypes from 'prop-types'
import {logout} from 'meteor-apollo-accounts'
import {withApollo} from 'react-apollo'

@withApollo
export default class Views extends React.Component {
  static propTypes = {
    client: PropTypes.object,
    me: PropTypes.object
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Views</Text>
        <Button onPress={() => logout(this.props.client)} title="Logout" />
      </View>
    )
  }
}
