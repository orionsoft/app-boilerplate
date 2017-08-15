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

@withApollo
export default class Login extends React.Component {
  static propTypes = {
    client: PropTypes.object,
    open: PropTypes.func
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
    this.setState({loading: true})
    try {
      const {email, password} = this.state
      await loginWithPassword({email, password}, this.props.client)
      this.props.open(null)
    } catch (error) {
      console.log('Error:', error)
    }
    this.setState({loading: false})
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
              returnKeyType="done"
              onSubmitEditing={this.submit}
              type={TextInput}
            />
          </View>
        </Form>
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
