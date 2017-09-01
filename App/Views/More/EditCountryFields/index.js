import React from 'react'
import {View, ScrollView} from 'react-native'
import styles from './styles.js'
import headerStyle from 'App/styles/headerStyle'
import {Form} from 'simple-react-form'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import gql from 'graphql-tag'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import setGraphQLErrors from 'App/helpers/setGraphQLErrors'
import Field from './Field'
import TableButton from 'App/components/TableButton'

const fragment = gql`
  fragment editProfileCountryFields on User {
    _id
    profile {
      countryFields
    }
  }
`

@withGraphQL(gql`
  query getMyProfileCountryFields($code: ID!) {
    me {
      ...editProfileCountryFields
    }
    country(code: $code) {
      _id
      name
      code
      profileFields {
        _id
        name
        label
        type
        options
      }
    }
  }
${fragment}`)
@withMutation(gql`
  mutation updateUserCountryFields($userId: ID!, $fields: JSON!, $code: ID!) {
    updateUserCountryFields(_id: $userId, fields: $fields, country: $code) {
      ...editProfileCountryFields
    }
  }
${fragment}`)
class Profile extends React.Component {
  static propTypes = {
    updateUserCountryFields: PropTypes.func,
    me: PropTypes.object,
    navigation: PropTypes.object,
    country: PropTypes.object
  }

  state = {}

  @autobind
  async save(fields) {
    this.setState({loading: true, errorMessages: null})
    try {
      await this.props.updateUserCountryFields({
        userId: this.props.me._id,
        fields,
        code: this.props.navigation.state.params.code
      })
      this.props.navigation.goBack()
    } catch (error) {
      setGraphQLErrors(this, error)
    }
    this.setState({loading: false})
  }

  renderFields() {
    return this.props.country.profileFields.map(field => {
      return <Field key={field.name} {...field} />
    })
  }

  render() {
    const allFields = this.props.me.profile.countryFields || {}
    const fields = allFields[this.props.navigation.state.params.code] || {}
    return (
      <ScrollView style={styles.container}>
        <Form
          state={fields}
          errorMessages={this.state.errorMessages}
          onSubmit={this.save}
          ref="form">
          <View>
            {this.renderFields()}
            <View style={styles.separation} />
            <TableButton
              loading={this.state.loading}
              onPress={() => this.refs.form.submit()}
              title="Save profile"
            />
          </View>
        </Form>
      </ScrollView>
    )
  }
}

Profile.navigationOptions = ({navigation}) => ({
  title: `Investor data - ${navigation.state.params.code}`,
  headerStyle
})

export default Profile
