import React from 'react'
import {View, Text} from 'react-native'
import styles from './styles.js'
import {Form, Field} from 'simple-react-form'
import TextInput from '../../TextInput'
import autobind from 'autobind-decorator'
import {createUser} from 'meteor-apollo-accounts'
import {withApollo} from 'react-apollo'
import PropTypes from 'prop-types'
import Button from 'App/components/Button'

@withApollo
export default class Register extends React.Component {
  static propTypes = {
    client: PropTypes.object,
    open: PropTypes.func
  }

  state = {}

  @autobind
  focusPassword() {
    this.refs.password.refs.input.focus()
  }

  @autobind
  focusConfirm() {
    this.refs.confirm.refs.input.focus()
  }

  isFormReady() {
    return this.state.email && this.state.password && this.state.confirm
  }

  @autobind
  async submit() {
    this.setState({loading: true, errorMessage: null})
    try {
      const {email, password, confirm} = this.state
      if (password !== confirm) {
        throw new Error("Passwords doesn't match")
      }
      await createUser({email, password}, this.props.client)
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
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <Form state={this.state} onChange={changes => this.setState(changes)}>
          <View>
            <Field
              enablesReturnKeyAutomatically
              returnKeyType="next"
              keyboardType="email-address"
              fieldName="email"
              label="Email"
              onSubmitEditing={this.focusPassword}
              type={TextInput}
            />
            <Field
              enablesReturnKeyAutomatically
              ref="password"
              secureTextEntry
              fieldName="password"
              label="Password"
              returnKeyType="next"
              onSubmitEditing={this.focusConfirm}
              type={TextInput}
            />
            <Field
              enablesReturnKeyAutomatically
              ref="confirm"
              secureTextEntry
              fieldName="confirm"
              label="Confirm password"
              returnKeyType="done"
              onSubmitEditing={this.submit}
              type={TextInput}
            />
          </View>
        </Form>
        {this.renderErrorMessage()}
        <Button
          disabled={!this.isFormReady()}
          loading={this.state.loading}
          onPress={this.submit}
          title="Create account"
        />
      </View>
    )
  }
}
