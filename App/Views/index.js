import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles.js'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'

@withGraphQL(gql`
  query getMe {
    me {
      _id
    }
  }
`)
export default class Views extends React.Component {
  static propTypes = {}

  render() {
    return (
      <View style={styles.container}>
        <Text>Views</Text>
      </View>
    )
  }
}
