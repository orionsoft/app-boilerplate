import React from 'react'
import {View, ScrollView} from 'react-native'
import styles from './styles.js'
import headerStyle from 'App/styles/headerStyle'
import {Form, Field} from 'simple-react-form'
import TableTextInput from 'App/components/fields/TableTextInput'
import TableButton from 'App/components/TableButton'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import gql from 'graphql-tag'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import setGraphQLErrors from 'App/helpers/setGraphQLErrors'

const fragment = gql`
  fragment editProfile on User {
    _id
    profile {
      name
    }
  }
`

@withGraphQL(gql`query getMyProfile {
  me {
    ...editProfile
  }
} ${fragment}`)
@withMutation(gql`mutation setUserProfile ($userId: ID!, $profile: UpdateUserProfileInput!) {
  updateUserProfile (_id: $userId, profile: $profile) {
    ...editProfile
  }
} ${fragment}`)
export default class Profile extends React.Component {
  static propTypes = {
    setUserProfile: PropTypes.func,
    me: PropTypes.object,
    navigation: PropTypes.object
  }

  static navigationOptions = {
    title: 'Edit profile',
    headerStyle
  }

  state = {}

  @autobind
  async save(profile) {
    this.setState({loading: true, errorMessages: null})
    try {
      await this.props.setUserProfile({
        userId: this.props.me._id,
        profile
      })
      this.props.navigation.goBack()
    } catch (error) {
      setGraphQLErrors(this, error)
    }
    this.setState({loading: false})
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Form
          state={this.props.me.profile}
          errorMessages={this.state.errorMessages}
          onSubmit={this.save}
          ref="form">
          <View>
            <Field fieldName="name" label="Name" type={TableTextInput} />
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
