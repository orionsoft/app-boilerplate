import React from 'react'
import {View} from 'react-native'
import styles from './styles.js'
import {Form, Field} from 'simple-react-form'
import TextInput from '../TextInput'
import Logo from '../Logo'
import autobind from 'autobind-decorator'
import {loginWithPassword} from 'meteor-apollo-accounts'
import {withApollo} from 'react-apollo'
import PropTypes from 'prop-types'

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
        <Logo />
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
      </View>
    )
  }
}
