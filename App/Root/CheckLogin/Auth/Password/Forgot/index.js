import React from 'react'
import {View, Text} from 'react-native'
import styles from './styles.js'
import {Form, Field} from 'simple-react-form'
import TextInput from '../../TextInput'
import Button from 'App/components/Button'
import {forgotPassword} from 'meteor-apollo-accounts'
import {withApollo} from 'react-apollo'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'

@withApollo
export default class Forgot extends React.Component {
  static propTypes = {
    client: PropTypes.object
  }

  state = {}

  isFormReady() {
    return !!this.state.email
  }

  @autobind
  async submit() {
    this.setState({loading: true, errorMessage: null})
    try {
      const {email} = this.state
      await forgotPassword({email}, this.props.client)
      this.setState({success: true})
    } catch (error) {
      const errorMessage = error.message.replace('GraphQL error: ', '')
      this.setState({errorMessage})
      console.log(error)
    }
    this.setState({loading: false})
  }

  renderErrorMessage() {
    if (!this.state.errorMessage) return
    return (
      <Text style={styles.errorMessage}>
        {this.state.errorMessage}
      </Text>
    )
  }

  renderMessage() {
    if (!this.state.success) return
    return <Text style={styles.successMessage}>Check your email to continue</Text>
  }

  renderButton() {
    if (this.state.success) return
    return (
      <Button
        disabled={!this.isFormReady()}
        loading={this.state.loading}
        onPress={this.submit}
        title="Reset password"
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Forgot password</Text>
        <Form state={this.state} onChange={changes => this.setState(changes)}>
          <View>
            <Field
              enablesReturnKeyAutomatically
              returnKeyType="next"
              keyboardType="email-address"
              fieldName="email"
              label="Email"
              onSubmitEditing={this.submit}
              type={TextInput}
            />
          </View>
        </Form>
        {this.renderErrorMessage()}
        {this.renderButton()}
        {this.renderMessage()}
      </View>
    )
  }
}
