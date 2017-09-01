import React from 'react'
import {View, ScrollView} from 'react-native'
import styles from './styles.js'
import headerStyle from 'App/styles/headerStyle'
import {Form, Field} from 'simple-react-form'
import TableTextInput from 'App/components/fields/TableTextInput'
import TableDateInput from 'App/components/fields/TableDateInput'
import TableSelect from 'App/components/fields/TableSelect'
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
      gender
      mobilePhone
      birthday
      investmentRange
      type
    }
  }
`

@withGraphQL(gql`query getMyProfile {
  me {
    ...editProfile
  }
  investmentRanges: fieldOptions (data: "investmentRange") {
    label
    value
  }
  genders: fieldOptions (data: "gender") {
    label
    value
  }
  userTypes: fieldOptions (data: "userType") {
    label
    value
  }
} ${fragment}`)
@withMutation(gql`mutation setUserProfile ($userId: ID!, $profile: UpdateUserProfileInput!) {
  updateUserProfile (_id: $userId, profile: $profile) {
    ...editProfile
  }
} ${fragment}`)
class Profile extends React.Component {
  static propTypes = {
    setUserProfile: PropTypes.func,
    me: PropTypes.object,
    navigation: PropTypes.object,
    investmentRanges: PropTypes.array,
    genders: PropTypes.array,
    userTypes: PropTypes.array
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
            <Field bottom fieldName="name" label="Name" type={TableTextInput} />
            <Field
              fieldName="birthday"
              label="Birthday"
              maximumDate={new Date()}
              type={TableDateInput}
            />
            <Field
              bottom
              fieldName="gender"
              label="Gender"
              type={TableSelect}
              options={this.props.genders}
            />
            <View style={styles.separation} />
            <Field bottom fieldName="mobilePhone" label="Mobile phone" type={TableTextInput} />
            <View style={styles.separation} />
            <Field
              fieldName="investmentRange"
              label="Investment ranges"
              type={TableSelect}
              options={this.props.investmentRanges}
            />
            <Field
              bottom
              fieldName="type"
              label="User type"
              type={TableSelect}
              options={this.props.userTypes}
            />
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

Profile.navigationOptions = {
  title: 'Edit profile',
  headerStyle
}

export default Profile
