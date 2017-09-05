import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import styles from './styles.js'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import keys from 'lodash/keys'

@withGraphQL(gql`
  query getUserCountries {
    me {
      _id
      profile {
        countryFields
      }
    }
  }
`)
export default class Countries extends React.Component {
  static propTypes = {
    me: PropTypes.object,
    navigation: PropTypes.object
  }

  renderCountries() {
    if (!this.props.me.profile) return <View />
    const countryFields = this.props.me.profile.countryFields || {}
    const codes = keys(countryFields)
    return codes.map(code => {
      return (
        <View key={code} style={styles.item}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('EditCountryFields', {code})}>
            <Text style={styles.itemText}>Investor data - {code}</Text>
          </TouchableOpacity>
        </View>
      )
    })
  }

  render() {
    return <View style={styles.container}>{this.renderCountries()}</View>
  }
}
