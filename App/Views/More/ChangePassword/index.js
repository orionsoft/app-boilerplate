import React from 'react'
import {ScrollView, View, Text} from 'react-native'
import styles from './styles.js'
import {Form, Field} from 'simple-react-form'
import TableTextInput from 'App/components/fields/TableTextInput'
import headerStyle from 'App/styles/headerStyle'
import TableButton from 'App/components/TableButton'
import autobind from 'autobind-decorator'
import {withApollo} from 'react-apollo'
import PropTypes from 'prop-types'
import {changePassword} from 'meteor-apollo-accounts'

@withApollo
export default class ChangePassword extends React.Component {
  static propTypes = {
    client: PropTypes.object
  }

  static navigationOptions = {
    title: 'Change password',
    headerStyle
  }

  state = {}

  @autobind
  async change() {
    this.setState({loading: true, errorMessage: null})
    try {
      const {oldPassword, newPassword, confirm} = this.state
      if (newPassword !== confirm) {
        throw new Error("Passwords doesn't match")
      }
      await changePassword({oldPassword, newPassword}, this.props.client)
    } catch (error) {
      const errorMessage = error.message.replace('GraphQL error: ', '')
      this.setState({errorMessage})
      console.log('Error:', error)
    }
    this.setState({loading: false})
  }

  renderErrorMessage() {
    if (!this.state.errorMessage) return
    return <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Form state={this.state} onChange={changes => this.setState(changes)}>
          <View>
            <Field
              fieldName="oldPassword"
              label="Old password"
              secureTextEntry
              bottom
              type={TableTextInput}
            />
            <View style={styles.separation} />
            <Field
              fieldName="newPassword"
              secureTextEntry
              label="New password"
              type={TableTextInput}
            />
            <Field
              fieldName="confirm"
              secureTextEntry
              label="Confirm password"
              bottom
              type={TableTextInput}
            />
            <View style={styles.separation} />
            {this.renderErrorMessage()}
            <TableButton
              loading={this.state.loading}
              onPress={this.change}
              title="Change password"
            />
          </View>
        </Form>
      </ScrollView>
    )
  }
}
