import React from 'react'
import {View, Text, Button} from 'react-native'
import styles from './styles.js'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import Auth from './Auth'
import {logout} from 'meteor-apollo-accounts'
import {withApollo} from 'react-apollo'

@withGraphQL(gql`
  query getMe {
    me {
      _id
    }
  }
`)
@withApollo
export default class Views extends React.Component {
  static propTypes = {
    client: PropTypes.object,
    me: PropTypes.object
  }

  render() {
    if (!this.props.me) return <Auth />
    return (
      <View style={styles.container}>
        <Text>Views</Text>
        <Button onPress={() => logout(this.props.client)} title="Logout" />
      </View>
    )
  }
}
