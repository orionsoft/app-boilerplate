import React from 'react'
import {View, Button as RNButton, Text} from 'react-native'
import styles from './styles.js'
import {Form, Field} from 'simple-react-form'
import TextInput from '../TextInput'
import autobind from 'autobind-decorator'
import {loginWithPassword} from 'meteor-apollo-accounts'
import {withApollo} from 'react-apollo'
import PropTypes from 'prop-types'
import Button from 'App/components/Button'

@withApollo
export default class Login extends React.Component {
  static propTypes = {
    client: PropTypes.object
  }

  state = {
    email: 'nicolas@orionsoft.io'
  }

  @autobind
  focusPassword() {
    this.refs.password.refs.input.focus()
  }

  @autobind
  async submit() {
    return
    this.setState({loading: true})
    try {
      const {email, password} = this.state
      await loginWithPassword({email, password}, this.props.client)
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
        <Button onPress={this.submit} title="Sign in" />
        <RNButton onPress={this.submit} title="Create an account" />
      </View>
    )
  }
}
