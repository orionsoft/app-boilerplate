import React from 'react'
import {View, Text} from 'react-native'
import styles from './styles.js'
import {Form, Field} from 'simple-react-form'
import TextInput from '../../TextInput'
import autobind from 'autobind-decorator'
import {loginWithPassword} from 'meteor-apollo-accounts'
import {withApollo} from 'react-apollo'
import PropTypes from 'prop-types'
import Button from 'App/components/Button'
import LightButton from 'App/components/LightButton'
import twoFactorDecorator from './twoFactorDecorator'

@twoFactorDecorator
@withApollo
export default class Login extends React.Component {
  static propTypes = {
    client: PropTypes.object,
    open: PropTypes.func,
    loginWithTwoFactor: React.PropTypes.func
  }

  state = {}

  @autobind
  focusPassword() {
    this.refs.password.refs.input.focus()
  }

  isFormReady() {
    return this.state.email && this.state.password
  }

  @autobind
  async submit() {
    this.setState({loading: true, errorMessage: null})
    try {
      const {email, password, code} = this.state
      if (code) {
        await this.props.loginWithTwoFactor({email, password, code})
      } else {
        await loginWithPassword({email, password}, this.props.client)
      }
    } catch (error) {
      if (error.message.includes('[need-two-factor]')) {
        this.setState({hasTwoFactor: true})
      } else {
        const errorMessage = error.message.replace('GraphQL error: ', '')
        this.setState({errorMessage})
        console.log('Error:', error)
      }
    }
    this.setState({loading: false})
  }

  renderTwoFactor() {
    if (!this.state.hasTwoFactor) return
    return (
      <Field
        enablesReturnKeyAutomatically
        returnKeyType="next"
        keyboardType="number-pad"
        fieldName="code"
        label="Two factor code"
        onSubmitEditing={this.submit}
        type={TextInput}
      />
    )
  }

  renderErrorMessage() {
    if (!this.state.errorMessage) return
    return (
      <Text style={styles.errorMessage}>
        {this.state.errorMessage}
      </Text>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
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
              returnKeyType={this.state.hasTwoFactor ? 'next' : 'done'}
              onSubmitEditing={this.state.hasTwoFactor ? null : this.submit}
              type={TextInput}
            />
            {this.renderTwoFactor()}
          </View>
        </Form>
        {this.renderErrorMessage()}
        <Button
          disabled={!this.isFormReady()}
          loading={this.state.loading}
          onPress={this.submit}
          title="Sign in"
        />
        <LightButton onPress={() => this.props.open(2)} title="Create an account" />
        <LightButton onPress={() => this.props.open(0)} title="Forgot password" />
      </View>
    )
  }
}
