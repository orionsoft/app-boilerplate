import React from 'react'
import {View, Text} from 'react-native'
import styles from './styles.js'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'

@withGraphQL(gql`
  query getMyInfo {
    me {
      _id
      emails {
        address
      }
      profile {
        name
      }
    }
  }
`)
export default class Account extends React.Component {
  static propTypes = {
    me: PropTypes.object
  }

  renderName() {
    const profile = this.props.me.profile
    const name = profile ? profile.name : 'My Account'
    return <Text style={styles.name}>{name}</Text>
  }

  renderEmail() {
    const email = this.props.me.emails[0].address
    return <Text style={styles.email}>{email}</Text>
  }

  render() {
    if (!this.props.me) return <View />
    return (
      <View style={styles.container}>
        {this.renderName()}
        {this.renderEmail()}
      </View>
    )
  }
}
