import React from 'react'
import {View} from 'react-native'
import styles from './styles.js'
import {Form, Field} from 'simple-react-form'
import TextInput from '../TextInput'
import Logo from '../Logo'

export default class Login extends React.Component {
  static propTypes = {}

  render() {
    return (
      <View style={styles.container}>
        <Logo />
        <Form state={this.state} onChange={changes => this.setState(changes)}>
          <View>
            <Field fieldName="email" label="Email" type={TextInput} />
            <Field fieldName="password" label="Password" type={TextInput} />
          </View>
        </Form>
      </View>
    )
  }
}
